"""
ScaleDown compression API client.

ScaleDown is a hypothetical advanced compression service. Since it doesn't
actually exist yet (or I don't have access to it), this module simulates
what it might do - basically another 20% compression on top of what we've
already done.

In a real implementation, this would call an external API that does
query-aware or semantic compression.

Author: Vipin Kumar
"""

from typing import Dict, Any, Tuple, Optional
import requests
from app.core.config import settings

async def simulate_scaledown_compression(text: str) -> str:
    """
    Placeholder for ScaleDown compression API.
    
    The real ScaleDown API would do intelligent compression based on
    the query type and content. For now, we just simulate it by
    taking the first 80% of words.
    
    This is a simplification - real semantic compression would be
    much smarter about what to keep.
    
    Args:
        text: Text to compress further
        
    Returns:
        "Compressed" text (simulated)
    """
    # In a real scenario, this would call the ScaleDown API
    # For now, simulate by taking first 80% of words
    words = text.split()
    compressed_text = " ".join(words[:int(len(words) * 0.8)])
    return compressed_text


async def scaledown_compress_with_mode(
    text: str, prompt: Optional[str] = None
) -> Tuple[str, str, Dict[str, Any]]:
    """Compress using ScaleDown API when configured.

    Returns:
        (compressed_text, mode, stats) where mode is 'sdk', 'api', or 'simulated'
    """

    if not text:
        return text, "simulated", {}

    if settings.SCALEDOWN_API_KEY and settings.SCALEDOWN_API_KEY != "sd-placeholder":
        try:
            import scaledown as sd  # type: ignore

            sd.set_api_key(settings.SCALEDOWN_API_KEY)
            compressor = sd.ScaleDownCompressor(target_model="gpt-4o", rate="auto")
            result = compressor.compress(context=text, prompt=(prompt or "Compress the context for summarization."))
            content = getattr(result, "content", None)
            if isinstance(content, str) and content.strip():
                stats: Dict[str, Any] = {}
                tokens = getattr(result, "tokens", None)
                if isinstance(tokens, (list, tuple)) and len(tokens) >= 2:
                    stats["scaledown_original_tokens"] = tokens[0]
                    stats["scaledown_compressed_tokens"] = tokens[1]
                savings_percent = getattr(result, "savings_percent", None)
                if savings_percent is not None:
                    try:
                        stats["scaledown_savings_percent"] = float(savings_percent)
                    except Exception:
                        pass
                return content, "sdk", stats
        except Exception:
            pass

    if not settings.SCALEDOWN_API_URL or not settings.SCALEDOWN_API_KEY or settings.SCALEDOWN_API_KEY == "sd-placeholder":
        return await simulate_scaledown_compression(text), "simulated", {}

    try:
        resp = requests.post(
            settings.SCALEDOWN_API_URL,
            headers={
                "Authorization": f"Bearer {settings.SCALEDOWN_API_KEY}",
                "Content-Type": "application/json",
                "Accept": "application/json, text/plain, */*",
            },
            json={"text": text, "raw": text},
            timeout=60,
        )
        if resp.status_code >= 400:
            return await simulate_scaledown_compression(text), "simulated", {}

        content_type = (resp.headers.get("content-type") or "").lower()
        if "application/json" in content_type:
            data = resp.json()
            compressed = (
                data.get("compressed_text")
                or data.get("compressed")
                or data.get("output")
                or data.get("text")
                or data.get("raw")
            )
            return (compressed if compressed else text), "api", {}

        returned = (resp.text or "").strip()
        return (returned if returned else text), "api", {}
    except Exception:
        return await simulate_scaledown_compression(text), "simulated", {}


async def scaledown_compress(text: str) -> str:
    """Compress using ScaleDown API when configured, otherwise simulate locally."""

    compressed, _mode, _stats = await scaledown_compress_with_mode(text)
    return compressed
