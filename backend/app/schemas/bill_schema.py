from pydantic import BaseModel
from typing import List, Optional, Dict

class BillMetric(BaseModel):
    original_tokens: int
    after_cleaning: int
    after_local_compression: int
    final_summary_tokens: int
    compression_rate: str

class BillBase(BaseModel):
    id: str
    title: str
    date_introduced: str
    status: str

class BillSummaryResponse(BaseModel):
    summary: str
    metrics: BillMetric
    raw_sections: Optional[List[str]] = None

class ComparisonRequest(BaseModel):
    bill_ids: List[str]

class ComparisonResponse(BaseModel):
    comparison_summary: str
    key_differences: List[str]
