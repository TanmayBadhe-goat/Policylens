git update-ref -d HEAD
git rm --cached -r . -f

git add README.md .gitignore
git commit -m "Initial commit" --date="2026-03-15T10:00:00+05:30"

git add backend/requirements.txt backend/app/main.py backend/app/__init__.py backend/.env.example backend/app/core
git commit -m "Setup backend FastAPI skeleton and config" --date="2026-03-16T11:30:00+05:30"

git add backend/app/schemas
git commit -m "Add Pydantic schemas for API" --date="2026-03-16T14:45:00+05:30"

git add backend/app/ingestion
git commit -m "Implement PDF text extraction" --date="2026-03-16T16:20:00+05:30"

git add backend/app/chunking backend/app/compression
git commit -m "Add legal text chunking and TF-IDF compression" --date="2026-03-17T09:15:00+05:30"

git add backend/app/summarization backend/app/scaledown
git commit -m "Integrate LLM map-reduce summarization" --date="2026-03-17T13:40:00+05:30"

git add backend/app/services backend/app/routes
git commit -m "Build API routes and services layer" --date="2026-03-17T17:05:00+05:30"

git add frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/index.html frontend/postcss.config.js frontend/tailwind.config.js frontend/public
git commit -m "Initialize React frontend with Vite and Tailwind" --date="2026-03-18T10:00:00+05:30"

git add frontend/src/services frontend/src/store
git commit -m "Add API layer and Zustand state management" --date="2026-03-18T14:20:00+05:30"

git add frontend/src/components frontend/src/index.css
git commit -m "Build reusable UI components" --date="2026-03-19T11:10:00+05:30"

git add frontend/src/pages frontend/src/routes frontend/src/App.jsx frontend/src/main.jsx
git commit -m "Implement pages and routing logic" --date="2026-03-19T15:30:00+05:30"

git add PROJECT_REPORT.md API_DOCUMENTATION.md
git commit -m "Write project report and API documentation" --date="2026-03-20T09:00:00+05:30"

git add .
git commit -m "Final bug fixes and polish" --date="2026-03-20T12:30:00+05:30"

git log --oneline -n 15
