"""
Metrics API routes.

Returns compression metrics for a specific bill - how many tokens
at each stage, compression rate, etc.

Author: Vipin Kumar
"""

from fastapi import APIRouter
from app.schemas.bill_schema import BillMetric

router = APIRouter()

@router.get("/{bill_id}", response_model=BillMetric)
async def get_metrics(bill_id: str):
    """
    Get compression metrics for a specific bill.
    
    Shows the token count at each stage of the pipeline:
    - Original document
    - After cleaning
    - After local compression
    - After ScaleDown
    - Final summary
    
    This helps visualize how much compression happened.
    
    Args:
        bill_id: The ID of the bill to get metrics for
        
    Returns:
        Token counts and compression rate
    """
    # Mock metrics for now
    # In production, this would retrieve stored metrics from the database
    return BillMetric(
        original_tokens=120500,
        after_cleaning=115000,
        after_local_compression=45000,
        after_scaledown=36000,
        final_summary_tokens=850,
        compression_rate="70.12%",
        scaledown_mode="simulated",
        scaledown_original_tokens=None,
        scaledown_compressed_tokens=None,
        scaledown_savings_percent=None,
    )
