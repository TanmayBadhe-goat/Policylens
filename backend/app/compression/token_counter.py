"""
Token counting using tiktoken.

Why count tokens? Two reasons:
1. To measure compression (how much did we reduce?)
2. To estimate costs for LLM API calls

We use tiktoken because it matches how OpenAI models count tokens,
which is what we're targeting for summarization.

Author: Vipin Kumar
"""

import tiktoken

def count_tokens(text: str, model: str = "gpt-3.5-turbo") -> int:
    """
    Counts tokens using tiktoken.
    
    Different models use different tokenizers. GPT-3.5 and GPT-4 use
    the cl100k_base encoding, which is what we default to.
    
    Args:
        text: Text to count tokens for
        model: Model name to get the right tokenizer
        
    Returns:
        Number of tokens in the text
    """
    try:
        # Try to get the specific encoding for this model
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        # If model not found, fall back to cl100k_base
        # This works for most modern OpenAI models
        encoding = tiktoken.get_encoding("cl100k_base")
        
    return len(encoding.encode(text))
