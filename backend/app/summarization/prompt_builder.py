"""
Prompt templates for LLM summarization.

Writing good prompts took a lot of iteration. The key insight was that
legal documents need to be translated into what they mean for CITIZENS,
not just summarized. So instead of "summarize this", the prompt asks
for rights, obligations, penalties, etc.

Author: Tanmay Badhe
"""

def build_summarization_prompt(chunk_content: str, detail_level: str = "medium") -> str:
    """
    Builds a prompt for summarizing a legal chunk.
    
    The prompt is specifically designed to extract citizen-relevant info.
    We don't want a generic summary - we want to know:
    - What rights do I get?
    - What do I have to do?
    - What happens if something goes wrong?
    
    Args:
        chunk_content: The text to summarize
        detail_level: How detailed the summary should be
        
    Returns:
        Complete prompt string for the LLM
    """
    return f"""
    You are a legal expert specializing in Indian laws. 
    Summarize the following legal text for a common citizen.
    Focus on:
    - What this means for the citizen
    - Any rights or obligations created
    - Penalties or benefits
    
    Detail level: {detail_level}
    
    Legal text:
    {chunk_content}
    
    Simplified Summary:
    """

def build_final_combine_prompt(partial_summaries: str) -> str:
    """
    Builds a prompt to combine partial summaries into a final document.
    
    When a bill is really long, we summarize it in chunks and then
    combine those summaries. This prompt ensures the final output
    is coherent and well-organized.
    
    Args:
        partial_summaries: All the chunk summaries combined
        
    Returns:
        Prompt for the final combination step
    """
    return f"""
    The following are summaries of different sections of a new Indian law/bill.
    Combine them into a coherent, high-density "Citizen's Guide".
    Use bullet points and clear headings.
    
    Partial Summaries:
    {partial_summaries}
    
    Final Citizen's Dashboard Summary:
    """
