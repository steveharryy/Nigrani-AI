import os
import sys

# Add the backend directory to the sys.path so we can import from it
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app import app as handler

# Vercel serverless function expects a variable named 'app' or 'handler'
app = handler
