"""
Bills API routes.

This module handles the /api/bills endpoints for listing available bills.
Right now it uses mock data, but in a real app this would query a database.

Author: Vipin Kumar
"""

from fastapi import APIRouter
from app.schemas.bill_schema import BillBase
from typing import List

router = APIRouter()

# Mock data disabled.
# Summaries are generated from uploads; until you persist uploads to a DB,
# listing should be empty to avoid showing bills with no summary/metrics.
MOCK_BILLS = []

@router.get("/", response_model=List[BillBase])
async def get_bills():
    """
    Get all available bills.
    
    Returns a list of bills that can be viewed or compared.
    For now, this just returns mock data.
    """
    return MOCK_BILLS
