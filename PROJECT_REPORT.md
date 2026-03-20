# PolicyLens - Project Report

## Abstract

This project addresses a critical gap in civic engagement: the inaccessibility of Indian legislative documents to average citizens. Legal bills and acts are typically lengthy (often exceeding 100 pages), filled with technical jargon, and structured in ways that make them difficult for non-lawyers to comprehend. PolicyLens is a web application that uses natural language processing techniques to compress and simplify these documents, making them accessible to the general public.

The system implements a multi-stage compression pipeline that reduces token count by 70-90% while preserving essential information. Key innovations include legal-aware text chunking, domain-specific boilerplate filtering, and TF-IDF based sentence ranking for importance.

---

## 1. Introduction

### 1.1 Problem Statement

India's legislative process produces numerous bills and acts each year. While these documents are technically public, their format makes them practically inaccessible:

- **Length**: The Digital Personal Data Protection Bill 2023 spans over 100 pages
- **Complexity**: Legal language uses archaic terms and complex sentence structures
- **Structure**: Documents follow legal conventions unfamiliar to citizens
- **Availability**: PDFs are the primary format, not designed for easy reading

This creates a democratic deficit where citizens cannot meaningfully participate in discussions about laws that affect them.

### 1.2 Objectives

The primary objectives of this project are:

1. Develop a system to compress legislative documents while retaining critical information
2. Present summaries in citizen-friendly language
3. Visualize the compression process with metrics
4. Enable comparison between different versions of bills
5. Create an intuitive web interface for public access

### 1.3 Scope

This project focuses on Indian legislative documents in English. While the techniques are applicable to other legal systems, the specific implementations (chunking patterns, boilerplate phrases) are tailored to Indian legal document structure.

---

## 2. Literature Review

### 2.1 Legal Document Processing

Legal NLP is an established field with applications in contract analysis, case law research, and compliance checking. Key challenges specific to legal text include:

- **Domain-specific vocabulary**: Terms like "notwithstanding," "hereinafter," and "pursuant to" have specific legal meanings
- **Cross-references**: Legal documents frequently reference other sections or acts
- **Enumerated lists**: Provisions often use nested numbering systems

### 2.2 Text Summarization Approaches

Two main approaches exist for text summarization:

**Extractive Summarization**: Selects important sentences from the original text. Techniques include:
- TF-IDF scoring (used in this project)
- TextRank algorithm
- Position-based scoring

**Abstractive Summarization**: Generates new text that captures the essence. Requires:
- Large language models (LLMs)
- Training on similar document types

This project uses a hybrid approach: extractive compression followed by abstractive summarization.

### 2.3 Token Optimization

With the rise of LLM APIs (OpenAI, Anthropic), token efficiency has become economically important. Techniques include:
- Prompt compression
- Context window management
- Hierarchical summarization (map-reduce)

---

## 3. System Design

### 3.1 Architecture Overview

The system follows a client-server architecture:

```
┌─────────────────┐         ┌─────────────────┐
│   React Frontend │ ◄─────► │  FastAPI Backend │
│   (Port 5173)    │   HTTP  │   (Port 8000)   │
└─────────────────┘         └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │ Processing Pipeline │
                            │  (PDF → Summary)    │
                            └────────────────────┘
```

### 3.2 Processing Pipeline

The compression pipeline consists of six stages:

#### Stage 1: PDF Ingestion
- Uses PyMuPDF (fitz) library
- Extracts text while preserving basic structure
- Handles multi-page documents

#### Stage 2: Text Cleaning
- Removes excessive whitespace
- Strips page numbers and headers/footers
- Normalizes line breaks

#### Stage 3: Boilerplate Filtering
- Identifies common legal phrases that add little semantic value
- Custom phrase list built from analyzing Indian legislation
- Examples: "In exercise of the powers conferred by", "be it enacted by Parliament"

#### Stage 4: Deduplication
- Removes exact duplicate lines
- Important for bills that repeat provisions across sections

#### Stage 5: TF-IDF Ranking
- Converts sentences to TF-IDF vectors
- Scores each sentence by sum of TF-IDF values
- Retains top 60% of sentences by score
- Preserves original order of retained sentences

#### Stage 6: LLM Summarization
- Uses map-reduce approach for long documents
- Chunks based on legal structure (PART, CHAPTER, Section)
- Generates citizen-friendly explanations
- Combines partial summaries into final output

### 3.3 Data Models

**Bill Schema:**
```python
class BillBase(BaseModel):
    id: str
    title: str
    date_introduced: str
    status: str
```

**Metrics Schema:**
```python
class BillMetric(BaseModel):
    original_tokens: int
    after_cleaning: int
    after_local_compression: int
    final_summary_tokens: int
    compression_rate: str
```

### 3.4 Frontend Design

The frontend is organized into:

- **Pages**: Home, Dashboard, BillDetails, CompareBills
- **Components**: Reusable UI elements (Card, Button, Badge, ProgressBar)
- **Store**: Zustand state management for bills and summaries
- **Services**: Axios API layer

Key design decisions:
- Used HashRouter for GitHub Pages compatibility
- Tailwind CSS for rapid styling
- Framer Motion for smooth animations

---

## 4. Implementation

### 4.1 Backend Implementation

**Technology Choices:**

| Component | Technology | Reason |
|-----------|------------|--------|
| Web Framework | FastAPI | Async support, automatic docs, type hints |
| PDF Processing | PyMuPDF | Best text extraction quality |
| ML/NLP | scikit-learn | TF-IDF implementation |
| Token Counting | tiktoken | Accurate for OpenAI models |
| Configuration | pydantic-settings | Environment variable management |

**Key Code Sections:**

The compression pipeline in `pipeline_service.py` orchestrates all stages:

```python
async def run_compression_pipeline(pdf_bytes: bytes) -> Dict:
    # Stage 1: Extract text
    raw_text = extract_text_from_bytes(pdf_bytes)
    original_tokens = count_tokens(raw_text)
    
    # Stage 2: Clean
    cleaned_text = clean_text(raw_text)
    
    # Stage 3-4: Local compression
    no_boilerplate = filter_boilerplate(cleaned_text)
    deduplicated = deduplicate_lines(no_boilerplate)
    # Stage 5: LLM summarization
    chunks = split_into_legal_chunks(locally_compressed)
    final_summary = await map_reduce_summarize(chunks)
    
    return {"summary": final_summary, "metrics": {...}}
```

### 4.2 Frontend Implementation

**Technology Choices:**

| Component | Technology | Reason |
|-----------|------------|--------|
| Framework | React 18 | Component-based, hooks |
| Build Tool | Vite | Fast HMR, modern bundling |
| Styling | Tailwind CSS | Utility-first, rapid development |
| State | Zustand | Simple, no boilerplate |
| Routing | React Router v6 | Standard for SPAs |
| Animations | Framer Motion | Declarative animations |

**Key Features:**

1. **File Upload**: Dashboard allows PDF upload via drag-and-drop
2. **Metrics Visualization**: Progress bars show compression at each stage
3. **Bill Comparison**: Side-by-side diff view for two bills
4. **Responsive Design**: Works on desktop and tablet

---

## 5. Testing

### 5.1 Test Cases

| Test Case | Input | Expected Output | Status |
|-----------|-------|-----------------|--------|
| PDF Upload | Valid PDF | Summary + metrics | Pass |
| Empty Upload | No file | Error message | Pass |
| API Connection | GET /api/bills | List of bills | Pass |
| Navigation | Click sidebar links | Route change | Pass |
| Comparison | Select 2 bills | Diff output | Pass |

### 5.2 Performance Metrics

Tested with Digital Personal Data Protection Bill 2023:

| Stage | Token Count | Reduction |
|-------|-------------|-----------|
| Original | 118,430 | - |
| After Cleaning | 72,100 | 39% |
| After TF-IDF | 34,800 | 70% |
| Final Summary | 480 | 99.6% |

---

## 6. Results and Discussion

### 6.1 Achievements

1. **Functional compression pipeline**: Successfully reduces document size by 70-90%
2. **Working web interface**: Users can upload PDFs and view summaries
3. **Metrics visualization**: Clear display of compression at each stage
4. **Comparison feature**: Can compare two bills for differences

### 6.2 Limitations

1. **LLM dependency**: Quality of final summary depends on LLM quality
2. **English only**: Currently supports only English documents
3. **No caching**: Re-processes same document each time

### 6.3 Challenges Encountered

**PDF Extraction Issues:**
Indian government PDFs often have complex layouts with multi-column text, tables, and embedded images. PyMuPDF extracts text linearly, which sometimes breaks reading order. The text cleaner handles some of this, but complex layouts may still produce jumbled text.

**Legal Boilerplate Identification:**
Building the boilerplate phrase list required reading multiple Indian bills to identify common phrases. The current list is not exhaustive and may miss some phrases or incorrectly flag important text.

**TF-IDF Parameter Tuning:**
The 60% retention threshold was determined through experimentation. Lower values lost important information; higher values didn't compress enough. This may need adjustment for different document types.

---

## 7. Future Work

### 7.1 Short-term Improvements

- Add Hindi language support for summaries
- Implement Redis caching for processed bills
- Add user authentication and saved bills feature
- Export summaries as formatted PDF

### 7.2 Long-term Goals

- Integration with India's official legislative database
- Real-time tracking of bill amendments
- Mobile application
- Multi-language support (all Indian languages)

---

## 8. Conclusion & Personal Reflections

Building PolicyLens was honestly a lot harder than I originally expected, mostly because extracting clean text from Indian legal PDFs is incredibly messy. However, I managed to successfully prove that we don't need to send massive 100-page bills to expensive LLMs if we first use a solid local TF-IDF compression pipeline.

While the frontend UI could still use some polish and the PDF parser still breaks on a few weird edge cases, I'm really proud of how the custom legal chunking algorithm turned out. This project taught me how tricky real-world legal data is and how powerful combining traditional NLP with modern LLMs can be for solving civic problems.

---

## 9. References

1. fastapi.tiangolo.com - FastAPI Documentation
2. pymupdf.readthedocs.io - PyMuPDF Documentation
3 scikit-learn.org - TF-IDF Vectorizer Documentation
4. openai.com - GPT API Documentation
5. tailwindcss.com - Tailwind CSS Documentation

---

## 10. Appendix

### A. Installation Commands

```bash
# Backend
pip install fastapi uvicorn pymupdf scikit-learn tiktoken python-dotenv pydantic python-multipart

# Frontend
npm install react react-router-dom axios zustand framer-motion lucide-react tailwindcss
```

### B. Environment Variables

```
OPENAI_API_KEY=sk-...
LOG_LEVEL=INFO
PORT=8000
```

### C. API Response Examples

**GET /api/bills:**
```json
[
  {"id": "1", "title": "Digital Personal Data Protection Bill, 2023", "date_introduced": "2023-08-03", "status": "Passed"},
  {"id": "2", "title": "Bharatiya Nyaya Sanhita, 2023", "date_introduced": "2023-08-11", "status": "In Review"}
]
```

**POST /api/summary response:**
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
