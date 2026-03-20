"""
Main compression pipeline for legislative documents.

This module orchestrates the entire processing flow from raw PDF bytes
to a citizen-friendly summary. I structured it this way so each stage
can be tested independently.

Author: Tanmay Badhe
"""

from typing import List, Dict
from app.ingestion.pdf_parser import extract_text_from_bytes
from app.ingestion.text_cleaner import clean_text
from app.chunking.legal_chunker import split_into_legal_chunks
from app.compression.boilerplate_filter import filter_boilerplate
from app.compression.tfidf_ranker import rank_sentences
from app.compression.deduplicator import deduplicate_lines
from app.compression.token_counter import count_tokens
from app.summarization.map_reduce import map_reduce_summarize
from app.summarization.local_summarizer import local_extractive_summary

async def run_compression_pipeline(pdf_bytes: bytes) -> Dict:
    """
    Executes the full compression-first legal processing pipeline.
    
    The idea here is to do as much compression as possible BEFORE sending
    to the LLM. This saves tokens and money, and actually produces better
    results since the LLM focuses on what matters.
    
    Args:
        pdf_bytes: Raw PDF file bytes from upload
        
    Returns:
        Dict with 'summary' and 'metrics' keys
    """
    
    # Step 1: Extract raw text from PDF
    # PyMuPDF works well but we lose some formatting
    raw_text = extract_text_from_bytes(pdf_bytes)
    original_tokens = count_tokens(raw_text)
    
    # Step 2: Clean up the text
    # Removes page numbers, weird spacing, etc.
    cleaned_text = clean_text(raw_text)
    after_cleaning_tokens = count_tokens(cleaned_text)
    
    # Step 3: Local Compression
    # This is where we save most tokens without losing meaning
    no_boilerplate = filter_boilerplate(cleaned_text)
    deduplicated = deduplicate_lines(no_boilerplate)
    
    # Keep top 60% of sentences by TF-IDF score
    # I tested 40%, 50%, 60% and 60% seemed like the sweet spot
    locally_compressed = rank_sentences(deduplicated, top_n=0.6)
    after_local_tokens = count_tokens(locally_compressed)
    
    # Step 5: Chunk and Summarize
    # Split by legal structure (PART, CHAPTER, Section)
    # Then use map-reduce to handle long documents
    chunks = split_into_legal_chunks(locally_compressed)
    chunk_contents = [c['content'] for c in chunks if c.get('content')]

    if not chunk_contents:
        chunk_contents = [locally_compressed]
    
    final_summary = await map_reduce_summarize(chunk_contents)
    if not (final_summary or "").strip():
        final_summary = local_extractive_summary(locally_compressed)
    final_summary_tokens = count_tokens(final_summary)
    
    # Calculate how much we saved
    compression_rate = (1 - (after_local_tokens / max(original_tokens, 1))) * 100
    
    return {
        "summary": final_summary,
        "raw_sections": chunk_contents[:12],
        "metrics": {
            "original_tokens": original_tokens,
            "after_cleaning": after_cleaning_tokens,
            "after_local_compression": after_local_tokens,
            "final_summary_tokens": final_summary_tokens,
            "compression_rate": f"{compression_rate:.2f}%"
        }
    }
