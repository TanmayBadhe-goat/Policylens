"""
Legal document chunker for Indian legislation.

Indian bills have a pretty standard structure - they're divided into
PARTs, CHAPTERs, and Sections. This chunker uses that structure to
split the document into manageable pieces.

Why does this matter? Because when we summarize, we want each chunk
to be topically coherent. A "CHAPTER III - Data Principal Rights"
should be summarized as one unit, not mixed with penalties from
another chapter.

Author: Tanmay Badhe
"""

import re
from typing import List, Dict

def split_into_legal_chunks(text: str) -> List[Dict[str, str]]:
    """
    Splits legal text into chunks based on "Section", "CHAPTER", or "PART".
    
    The regex looks for headers like:
    - "PART I"
    - "CHAPTER 3"  
    - "Section 15"
    
    Args:
        text: Full legal document text
        
    Returns:
        List of dicts with 'title' and 'content' for each chunk
    """
    # Pattern to match PART, CHAPTER, or Section headers
    # The regex captures the header line itself
    pattern = r'(\n(?:PART|CHAPTER|Section)\s+[IVX0-9]+.*?\n)'
    
    parts = re.split(pattern, text)
    
    chunks = []
    current_title = "Preamble"
    
    # The first part might be preamble before any header
    # (title of the bill, enactment clause, etc.)
    if parts:
        first_content = parts[0].strip()
        if first_content:
            chunks.append({"title": current_title, "content": first_content})
            
    # Process the rest - alternating between headers and content
    for i in range(1, len(parts), 2):
        current_title = parts[i].strip()
        content = parts[i+1].strip() if i+1 < len(parts) else ""
        chunks.append({"title": current_title, "content": content})
        
    return chunks
