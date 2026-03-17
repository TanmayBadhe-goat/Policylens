"""
Line deduplication for legal documents.

Legal documents often repeat the same clauses multiple times - for example,
a definition might appear in multiple sections. This module removes
exact duplicate lines to reduce redundancy.

Author: Vipin Kumar
"""

def deduplicate_lines(text: str) -> str:
    """
    Removes exact duplicate lines from text.
    
    We only remove EXACT duplicates - lines that are identical character
    for character. Similar but not identical lines are kept, since they
    might have important differences.
    
    This preserves the order of first occurrence of each line.
    
    Args:
        text: Input text with potential duplicates
        
    Returns:
        Text with duplicate lines removed
    """
    lines = text.split('\n')
    seen = set()  # Track lines we've already seen
    unique_lines = []
    
    for line in lines:
        clean_line = line.strip()
        # Only add if we haven't seen this exact line before
        if clean_line and clean_line not in seen:
            unique_lines.append(line)
            seen.add(clean_line)
            
    return '\n'.join(unique_lines)
