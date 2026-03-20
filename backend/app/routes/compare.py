"""
Compare API routes.

Compares two bills and returns the key differences.
Useful for seeing what changed between versions of a bill.

Author: Tanmay Badhe
"""

from fastapi import APIRouter
from app.schemas.bill_schema import ComparisonRequest, ComparisonResponse

router = APIRouter()

@router.post("/", response_model=ComparisonResponse)
async def compare_bills(request: ComparisonRequest):
    """
    Compare two bills and get their differences.
    
    Takes two bill IDs and returns:
    - A summary of what changed
    - Key differences as a list
    
    This is useful for tracking amendments or comparing
    different versions of similar legislation.
    
    Args:
        request: Contains bill_ids - array of two bill IDs to compare
        
    Returns:
        Comparison summary and list of key differences
    """
    # Mock comparison result
    # In production, this would actually analyze the bills
    return {
        "comparison_summary": "Comparing the selected bills reveals a shift towards stricter data compliance and increased penalties for non-compliance in the newer versions.",
        "key_differences": [
            "Penalty increase from 50Cr to 250Cr",
            "Broadening of definitions for personal data",
            "New requirement for local data storage"
        ]
    }
