"""
Map-reduce summarization for long documents.

When a bill is really long (100+ pages), we can't just send it all to
the LLM at once. The map-reduce approach:
1. Split into chunks
2. Summarize each chunk separately (map)
3. Combine all summaries into one (reduce)

This is a pretty standard technique for handling long documents with
LLMs. The challenge is making sure the final output is coherent and
doesn't lose important details from individual sections.

Author: Vipin Kumar
"""

from typing import List
from app.summarization.llm_client import call_llm
from app.summarization.prompt_builder import build_summarization_prompt, build_final_combine_prompt
from app.summarization.local_summarizer import local_extractive_summary

async def map_reduce_summarize(chunks: List[str]) -> str:
    """
    Hierarchical map-reduce summarization logic.
    
    The 'map' phase summarizes each chunk independently.
    The 'reduce' phase combines those summaries into one.
    
    If the combined summaries are still too long (>2000 chars),
    we do another round of summarization.
    
    Args:
        chunks: List of text chunks to summarize
        
    Returns:
        Final combined summary
    """
    # Map stage: Summarize each chunk
    partial_summaries = []
    for chunk in chunks:
        prompt = build_summarization_prompt(chunk)
        summary = await call_llm(prompt)
        if summary.startswith("__POLICYLENS_LLM_ERROR__"):
            return local_extractive_summary("\n\n".join(chunks))
        partial_summaries.append(summary)
    
    # Reduce stage: Combine partial summaries
    combined_text = "\n\n".join(partial_summaries)
    
    # If still too long, do another reduction pass
    if len(combined_text) > 2000:
        final_prompt = build_final_combine_prompt(combined_text)
        final_summary = await call_llm(final_prompt)
        if final_summary.startswith("__POLICYLENS_LLM_ERROR__"):
            return local_extractive_summary("\n\n".join(chunks))
        return final_summary
    
    return combined_text
