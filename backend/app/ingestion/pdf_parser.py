"""
PDF text extraction using PyMuPDF.

I tried a few different PDF libraries (pdfplumber, PyPDF2) but PyMuPDF
gave the best results for Indian government PDFs. The text comes out
cleaner and it handles multi-column layouts better.

Author: Tanmay Badhe
"""

import fitz  # PyMuPDF - the import name is different from package name


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract raw text from a PDF file.
    
    Used for testing with local files. The main app uses extract_text_from_bytes
    since we're getting the PDF through an HTTP upload.
    
    Args:
        pdf_path: Path to the PDF file on disk
        
    Returns:
        Extracted text, or error message if extraction fails
    """
    text = ""
    try:
        with fitz.open(pdf_path) as doc:
            for page in doc:
                text += page.get_text()
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"
    return text


def extract_text_from_bytes(pdf_bytes: bytes) -> str:
    """
    Extract raw text from PDF bytes.
    
    This is what we use in the API - the frontend uploads the PDF as
    raw bytes, and we process it without saving to disk.
    
    Args:
        pdf_bytes: Raw PDF file bytes
        
    Returns:
        Extracted text from all pages combined
    """
    text = ""
    try:
        # fitz can open from bytes directly using stream parameter
        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
            for page in doc:
                text += page.get_text()
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"
    return text