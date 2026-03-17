"""Local summarization utilities.

These functions provide a deterministic, document-specific fallback when the
external LLM is unavailable (quota/rate limits/no access).

We intentionally keep this lightweight: no external model downloads and no
network calls.
"""

from __future__ import annotations

import re
from typing import List

from app.compression.tfidf_ranker import rank_sentences


def _split_sentences(text: str) -> List[str]:
    # Conservative sentence split; legal PDFs can be messy.
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    sentences = [p.strip() for p in parts if len(p.strip()) > 0]
    return sentences


def local_extractive_summary(text: str, max_chars: int = 1400) -> str:
    """Extractive summary using existing TF-IDF ranker.

    Returns a citizen-friendly formatted summary with bullets.
    """

    if not text:
        return "SUMMARY: (No text extracted from document.)"

    # Use existing compression primitive to pick salient sentences.
    # Start with a moderate cut, then shrink until it fits.
    fraction = 0.22
    for _ in range(6):
        compressed = rank_sentences(text, top_n=fraction)
        if len(compressed) <= max_chars:
            break
        fraction = max(0.06, fraction * 0.75)

    sentences = _split_sentences(compressed)
    if not sentences:
        sentences = _split_sentences(text)

    # Convert to bullet-style summary.
    bullets = []
    for s in sentences[:8]:
        cleaned = re.sub(r"\s+", " ", s).strip()
        if len(cleaned) < 30:
            continue
        bullets.append(cleaned)

    if not bullets:
        trimmed = re.sub(r"\s+", " ", text).strip()
        return f"SUMMARY: {trimmed[:max_chars]}"

    out = "SUMMARY: Key provisions (local fallback)\n" + "\n".join(
        f"- {b}" for b in bullets
    )

    return out[: max_chars + 50]
