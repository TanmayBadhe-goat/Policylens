"""
PolicyLens FastAPI Application

This is the main entry point for the backend API. It sets up:
- CORS middleware (so the frontend can call the API)
- Route includes for bills, summary, metrics, and compare
- The uvicorn server

I kept the main file pretty minimal - all the actual logic is in
the routes and services modules.

Author: Vipin Kumar
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import bills, summary, metrics
import uvicorn

# Create the FastAPI app
app = FastAPI(
    title="PolicyLens API",
    description="Token-compression-first legal intelligence engine for Indian legislation",
    version="1.0.0"
)

# Configure CORS
# In development, we allow all origins. For production, this should be restricted.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all the route modules
# Each module handles a specific part of the API
app.include_router(bills.router, prefix="/api/bills", tags=["bills"])
app.include_router(summary.router, prefix="/api/summary", tags=["summary"])
app.include_router(metrics.router, prefix="/api/metrics", tags=["metrics"])


@app.get("/")
async def root():
    """
    Root endpoint - just a welcome message.
    Good for checking if the API is running.
    """
    return {"message": "Welcome to PolicyLens API", "docs": "/docs"}


if __name__ == "__main__":
    # Run the server when executed directly
    # The port comes from environment variable or defaults to 8000
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
