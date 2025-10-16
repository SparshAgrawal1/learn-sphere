import PyPDF2
import fitz  # PyMuPDF
import os
from typing import Optional

def extract_chapter_content(pdf_path: str) -> Optional[str]:
    """
    Extract text content from a PDF file
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        Optional[str]: Extracted text content or None if extraction fails
    """
    try:
        pdf_path = "../public" + pdf_path
        if not os.path.exists(pdf_path):
            print(f"PDF file not found: {pdf_path}")
            return None
            
        # Try PyMuPDF first (faster and better text extraction)
        try:
            doc = fitz.open(pdf_path)
            text_content = ""
            
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                text_content += page.get_text()
                text_content += "\n\n"  # Add spacing between pages
                
            doc.close()
            return text_content.strip()
            
        except Exception as e:
            print(f"PyMuPDF extraction failed: {e}")
            
        # Fallback to PyPDF2
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text_content = ""
                
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text_content += page.extract_text()
                    text_content += "\n\n"  # Add spacing between pages
                    
                return text_content.strip()
                
        except Exception as e:
            print(f"PyPDF2 extraction failed: {e}")
            
        return None
        
    except Exception as e:
        print(f"Error extracting PDF content: {e}")
        return None

def extract_chapter_content_by_pages(pdf_path: str, start_page: int = 0, end_page: int = None) -> Optional[str]:
    """
    Extract text content from specific pages of a PDF file
    
    Args:
        pdf_path (str): Path to the PDF file
        start_page (int): Starting page number (0-indexed)
        end_page (int): Ending page number (0-indexed, None for all pages)
        
    Returns:
        Optional[str]: Extracted text content or None if extraction fails
    """
    try:
        if not os.path.exists(pdf_path):
            print(f"PDF file not found: {pdf_path}")
            return None
            
        # Try PyMuPDF first
        try:
            doc = fitz.open(pdf_path)
            text_content = ""
            
            total_pages = len(doc)
            if end_page is None:
                end_page = total_pages - 1
            else:
                end_page = min(end_page, total_pages - 1)
                
            for page_num in range(start_page, end_page + 1):
                if page_num < total_pages:
                    page = doc.load_page(page_num)
                    text_content += page.get_text()
                    text_content += "\n\n"
                    
            doc.close()
            return text_content.strip()
            
        except Exception as e:
            print(f"PyMuPDF extraction failed: {e}")
            
        # Fallback to PyPDF2
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text_content = ""
                
                total_pages = len(pdf_reader.pages)
                if end_page is None:
                    end_page = total_pages - 1
                else:
                    end_page = min(end_page, total_pages - 1)
                    
                for page_num in range(start_page, end_page + 1):
                    if page_num < total_pages:
                        page = pdf_reader.pages[page_num]
                        text_content += page.extract_text()
                        text_content += "\n\n"
                        
                return text_content.strip()
                
        except Exception as e:
            print(f"PyPDF2 extraction failed: {e}")
            
        return None
        
    except Exception as e:
        print(f"Error extracting PDF content: {e}")
        return None
