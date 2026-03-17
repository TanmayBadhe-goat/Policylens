"""
LLM API client for summarization.

Right now this is set up to work in "mock mode" when there's no API key.
This lets people try out the app without needing an OpenAI account.

In production, you'd uncomment the actual API call code and add your key.

Author: Vipin Kumar
"""

import asyncio
import hashlib
import requests
from app.core.config import settings

_LLM_ERROR_SENTINEL_PREFIX = "__POLICYLENS_LLM_ERROR__"


async def call_llm(prompt: str, model: str = "gpt-4o-mini") -> str:
    """
    Placeholder for LLM API call.
    
    If the API key is the placeholder value, we return a mock response.
    This makes it easy to test the app without setting up API keys.
    
    Args:
        prompt: The prompt to send to the LLM
        model: Which model to use (default gpt-3.5-turbo)
        
    Returns:
        The LLM's response text
    """
    prompt_fingerprint = hashlib.sha256(prompt.encode("utf-8", errors="ignore")).hexdigest()[:8]
    prompt_len = len(prompt)

    # Check if we're in demo mode (no real API key)
    if not settings.OPENAI_API_KEY or settings.OPENAI_API_KEY == "sk-placeholder":
        return (
            "SUMMARY: Citizen-friendly synopsis generated in demo mode. "
            f"Input chars={prompt_len}, ref={prompt_fingerprint}. "
            "Key themes detected: compliance, rights, enforcement. (Mocked LLM Response)"
        )
    
    # Real OpenAI API call
    # Note: OpenAI frequently returns 429 for quota/rate-limit/model access.
    # We retry a few times for transient throttling, and if it still fails we
    # return a sentinel so higher layers can fall back to local summarization.
    max_attempts = 4
    for attempt in range(1, max_attempts + 1):
        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": model,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.3,
                },
                timeout=60,
            )

            if response.status_code < 400:
                data = response.json()
                return data["choices"][0]["message"]["content"]

            # Retry on rate-limit or transient server errors
            if response.status_code in (429, 500, 502, 503, 504) and attempt < max_attempts:
                await asyncio.sleep(0.8 * (2 ** (attempt - 1)))
                continue

            return (
                f"{_LLM_ERROR_SENTINEL_PREFIX}: "
                f"HTTP {response.status_code}, ref={prompt_fingerprint}"
            )
        except Exception:
            if attempt < max_attempts:
                await asyncio.sleep(0.8 * (2 ** (attempt - 1)))
                continue

            return f"{_LLM_ERROR_SENTINEL_PREFIX}: exception, ref={prompt_fingerprint}"
