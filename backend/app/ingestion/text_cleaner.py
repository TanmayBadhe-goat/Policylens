"""
Text cleaning utilities for extracted PDF content.

PDF extraction often leaves behind artifacts like:
- Multiple consecutive newlines
- Page numbers mixed in with text
- Weird spacing from layout issues

This module cleans that up before we start processing.

Author: Tanmay Badhe
"""

import re

def clean_text(text: str) -> str:
    """
    Cleans extracted legal text.
    
    The main issues I found with PDF extraction:
    1. Multiple blank lines between paragraphs
    2. Page numbers appearing mid-text
    3. Inconsistent spacing
    
    We handle these with regex replacements.
    
    Args:
        text: Raw extracted text
        
    Returns:
        Cleaned text ready for processing
    """
    # Remove multiple newlines - replace with single newline
    text = re.sub(r'\n+', '\n', text)
    
    # Remove whitespace at start/end of each line
    text = '\n'.join([line.strip() for line in text.split('\n')])
    
    # Remove large gaps of spaces within lines
    text = re.sub(r' +', ' ', text)
    
    return text.strip()
