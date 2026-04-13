from PyPDF2 import PdfReader
from pathlib import Path

dir_path = r'E:\portfolio-site\public\works\slides'

# Get all PDF files and sort them
pdf_files = sorted(Path(dir_path).glob('*.pdf'))

for pdf_path in pdf_files:
    try:
        reader = PdfReader(str(pdf_path))
        page_count = len(reader.pages)
        print(f"{pdf_path.name}: {page_count} pages")
    except Exception as e:
        print(f"{pdf_path.name}: Error - {str(e)}")
