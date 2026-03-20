"""
TF-IDF based sentence ranking for compression.

This is a pretty standard approach - we score each sentence by how
important its words are to the document. Higher scoring sentences
are kept, lower ones are discarded.

I chose TF-IDF over something like TextRank because it's faster
and works well for legal documents where certain terms (like
"penalty", "compliance", "data") are actually important.

Author: Tanmay Badhe
"""

from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

def rank_sentences(text: str, top_n: float = 0.5) -> str:
    """
    Ranks sentences using TF-IDF and keeps the top N percentage.
    
    The tricky part was figuring out the right percentage to keep.
    Too much and we don't save enough tokens. Too little and we
    lose important provisions.
    
    Args:
        text: Input text to compress
        top_n: Fraction of sentences to keep (0.5 = 50%)
        
    Returns:
        Compressed text with only top sentences
    """
    # Split into sentences - using period as delimiter
    # Filter out really short sentences (probably headers or fragments)
    sentences = [s.strip() for s in text.split('.') if len(s.strip()) > 20]
    
    # Edge case: if text is too short, just return it
    if not sentences or len(sentences) < 3:
        return text
        
    vectorizer = TfidfVectorizer(stop_words='english')
    
    try:
        tfidf_matrix = vectorizer.fit_transform(sentences)
    except:
        # If TF-IDF fails (rare, but can happen with weird input)
        return text
        
    # Sum TF-IDF scores for each sentence
    scores = np.asarray(tfidf_matrix.sum(axis=1)).flatten()
    
    # Calculate how many sentences to keep
    num_to_keep = max(1, int(len(sentences) * top_n))
    
    # Get indices of top sentences
    top_indices = np.argsort(scores)[-num_to_keep:]
    
    # Sort indices to maintain original order
    # (we don't want sentences appearing out of order)
    top_indices.sort()
    
    # Reconstruct text with selected sentences
    ranked_sentences = [sentences[i] for i in top_indices]
    return '. '.join(ranked_sentences) + '.'
