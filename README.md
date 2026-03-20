# PolicyLens

> Making Indian legislation accessible to every citizen through intelligent text compression and simplification.

## What is PolicyLens?

PolicyLens is a web application I built to solve a problem I noticed while trying to understand Indian legislation - legal documents are extremely long, filled with jargon, and difficult for average citizens to comprehend. This project uses a multi-stage compression pipeline to reduce lengthy bills into digestible summaries while preserving the core information that affects citizens.

The idea came from observing how the Digital Personal Data Protection Bill 2023 was over 100 pages long, making it nearly impossible for regular people to understand their rights. I wanted to build something that could bridge this gap.

## How It Works

The application follows a compression-first approach:

1. **PDF Ingestion** - Extracts raw text from uploaded PDF bills using PyMuPDF
2. **Text Cleaning** - Removes page numbers, excessive whitespace, and formatting artifacts
3. **Local Compression** - Uses TF-IDF ranking to identify and keep only the most important sentences
4. **Boilerplate Filtering** - Removes common legal phrases that don't add meaning
5. **Deduplication** - Eliminates repeated content
6. **LLM Summarization** - Generates citizen-friendly explanations using map-reduce approach

The result is typically a 70-90% reduction in token count while maintaining all critical information.

## Tech Stack

I chose these technologies based on what I learned during my coursework and what seemed practical for this use case:

**Backend:**
- FastAPI - Fast, async support, automatic API docs
- Python 3.11 - Latest features, good string handling
- PyMuPDF (fitz) - Best PDF extraction I found
- scikit-learn - TF-IDF implementation for sentence ranking
- tiktoken - Accurate token counting for OpenAI models

**Frontend:**
- React 18 with Vite - Fast development, good DX
- Tailwind CSS - Rapid UI development
- Zustand - Simple state management without boilerplate
- Framer Motion - Smooth animations
- Axios - API calls with interceptors

## Project Structure

```
PolicyLens/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry
│   │   ├── core/                # Config and logging
│   │   ├── routes/              # API endpoints
│   │   ├── services/            # Business logic
│   │   ├── schemas/             # Pydantic models
│   │   ├── ingestion/           # PDF parsing, cleaning
│   │   ├── chunking/            # Legal text chunking
│   │   ├── compression/         # TF-IDF, dedup, boilerplate
│   │   └── summarization/       # LLM integration
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI
│   │   ├── pages/               # Route pages
│   │   ├── services/            # API layer
│   │   ├── store/               # Zustand state
│   │   └── routes/              # React Router setup
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11 or higher
- Node.js 18+ and npm
- Git

### Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python -m app.main
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bills | List all bills |
| POST | /api/summary | Upload PDF and get summary |
| GET | /api/metrics/{bill_id} | Get compression metrics |
| POST | /api/compare | Compare two bills |

## Key Features

### 1. Smart Legal Chunking
The chunker recognizes Indian legal document structure - PART, CHAPTER, and Section headers. This ensures related provisions stay together during processing.

### 2. Multi-Stage Compression
Instead of sending entire documents to LLMs (expensive!), we compress locally first:
- Boilerplate removal cuts ~15% of text
- TF-IDF ranking keeps top 60% of sentences by importance
- Deduplication removes repeated clauses

### 3. Citizen-Friendly Output
The summarization prompt is specifically designed to extract:
- Rights and obligations for citizens
- Penalties and consequences
- Who is affected by the legislation
- Government powers and exemptions

### 4. Comparison Engine
Compare two versions of a bill to see what changed - useful for tracking amendments.

### 5. Token Metrics Dashboard
Visualize exactly how much compression happened at each stage.

## Challenges Faced

1. **PDF Extraction Quality** - Indian legal PDFs have complex formatting. PyMuPDF worked best but still required significant text cleaning.

2. **Balancing Compression vs Information** - Too aggressive compression loses important details. Settled on 60% sentence retention after testing.

3. **Legal Terminology** - Had to build a custom boilerplate phrase list specific to Indian legislation.

4. **Frontend-Backend Integration** - CORS issues, file upload handling, and state management took time to get right.

## Future Improvements

- [ ] Add support for multiple languages (Hindi translations)
- [ ] Implement caching for processed bills
- [ ] Add user authentication and saved bills
- [ ] Export summaries as PDF
- [ ] Integration with official government bill sources

## Author

**Tanmay Badhe**

This project was created as part of my academic work to explore how NLP and web technologies can make governance more transparent and accessible.

## License

MIT License - feel free to use this for your own projects.
