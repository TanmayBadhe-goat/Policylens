# PolicyLens API Documentation

Base URL: `http://localhost:8000/api`

All endpoints return JSON responses.

---

## Endpoints

### GET /bills

Get a list of all available bills.

**Response:**
```json
[
  {
    "id": "1",
    "title": "The Digital Personal Data Protection Bill, 2023",
    "date_introduced": "2023-08-03",
    "status": "Passed"
  }
]
```

---

### POST /summary

Upload a PDF bill and get its compressed summary.

**Request:**
- Content-Type: `multipart/form-data`
- Body: PDF file

**Example using curl:**
```bash
curl -X POST "http://localhost:8000/api/summary" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@bill.pdf"
```

**Response:**
```json
{
  "summary": "This bill establishes data protection rights for citizens...",
  "metrics": {
    "original_tokens": 118430,
    "after_cleaning": 72100,
    "after_local_compression": 34800,
    "final_summary_tokens": 480,
    "compression_rate": "70.62%"
  }
}
```

---

### GET /metrics/{bill_id}

Get compression metrics for a specific bill.

**Parameters:**
- `bill_id` (path): The ID of the bill

**Response:**
```json
{
  "original_tokens": 120500,
  "after_cleaning": 115000,
  "after_local_compression": 45000,
  "final_summary_tokens": 850,
  "compression_rate": "62.66%"
}
```

---

### POST /compare

Compare two bills and get their differences.

**Request Body:**
```json
{
  "bill_ids": ["1", "2"]
}
```

**Response:**
```json
{
  "comparison_summary": "Comparing the selected bills reveals a shift towards stricter data compliance...",
  "key_differences": [
    "Penalty increase from 50Cr to 250Cr",
    "Broadening of definitions for personal data",
    "New requirement for local data storage"
  ]
}
```

---

## Error Responses

All endpoints may return the following error structure:

```json
{
  "detail": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `400` - Bad Request (invalid input)
- `404` - Not Found (bill doesn't exist)
- `500` - Internal Server Error

---

## CORS

The API is configured to accept requests from any origin during development.
For production, update the CORS settings in `backend/app/main.py`.
