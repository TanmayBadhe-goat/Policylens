"""
Boilerplate phrase filter for Indian legal documents.

If you've ever read an Indian bill, you'll notice a lot of repetitive
phrases that don't really add meaning - things like "In exercise of
the powers conferred by" or "be it enacted by Parliament". These are
important for legal precision but not for understanding what the bill
actually does.

I built this list by going through several bills and noting down
phrases that appeared frequently but didn't seem to carry unique
information. It's not exhaustive but it helps.

Author: Tanmay Badhe
"""

import re

# Common phrases that appear in almost every Indian bill
# These don't really tell us what the bill DOES, just how it's structured
BOILERPLATE_PHRASES = [
    r"In exercise of the powers conferred by",
    r"hereinafter referred to as",
    r"with effect from",
    r"notwithstanding anything contained in",
    r"pursuant to the provisions of",
    r"be it enacted by Parliament",
    r"short title and commencement",
    r"shall come into force on such date",
    r"subject to the provisions of this Act"
]

def filter_boilerplate(text: str) -> str:
    """
    Removes common legal boilerplate sentences/phrases.
    
    This isn't perfect - sometimes these phrases are actually relevant.
    But in most cases, removing them helps focus on the actual content.
    
    Args:
        text: Input text to filter
        
    Returns:
        Text with boilerplate lines removed
    """
    lines = text.split('\n')
    filtered_lines = []
    
    for line in lines:
        is_boilerplate = False
        for phrase in BOILERPLATE_PHRASES:
            if re.search(phrase, line, re.IGNORECASE):
                is_boilerplate = True
                break
        if not is_boilerplate:
            filtered_lines.append(line)
            
    return '\n'.join(filtered_lines)
