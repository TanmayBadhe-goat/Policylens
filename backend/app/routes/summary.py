"""
Summary API routes.

This is the main endpoint - uploads a PDF and returns the compressed summary.
The heavy lifting is done by the pipeline_service module.

Author: Tanmay Badhe
"""

from fastapi import APIRouter, UploadFile, File
from app.services.pipeline_service import run_compression_pipeline
from app.schemas.bill_schema import BillSummaryResponse

router = APIRouter()

@router.post("", response_model=BillSummaryResponse)
async def summarize_bill(file: UploadFile = File(...)):
    """
    Summarize a bill from an uploaded PDF.
    
    This endpoint:
    1. Receives the PDF file
    2. Runs it through the compression pipeline
    3. Returns the summary + metrics
    
    The pipeline does all the work - PDF extraction, cleaning,
    compression, and LLM summarization.
    
    Args:
        file: Uploaded PDF file
        
    Returns:
        Summary and compression metrics
    """
    # Read the file content as bytes
    content = await file.read()
    
    # Run through the compression pipeline
    results = await run_compression_pipeline(content)
    
    return results
