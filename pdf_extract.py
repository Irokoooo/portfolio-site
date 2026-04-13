import warnings
warnings.filterwarnings('ignore')

import pdfplumber
from pathlib import Path
import json

pdf_dir = r"E:\portfolio-site\个人资料\作品（待分类）"
pdf_files = list(Path(pdf_dir).glob("*.pdf"))

results = []
for pdf_path in sorted(pdf_files):
    try:
        with pdfplumber.open(pdf_path) as pdf:
            num_pages = len(pdf.pages)
            file_size = pdf_path.stat().st_size / 1024
            first_page_text = ""
            if num_pages > 0:
                text = pdf.pages[0].extract_text()
                if text:
                    first_page_text = text.strip()[:120].replace("\n", " ")
            
            results.append({
                "filename": pdf_path.name,
                "pages": num_pages,
                "size_kb": round(file_size, 2),
                "summary": first_page_text if first_page_text else "[No text]"
            })
    except Exception as e:
        results.append({
            "filename": pdf_path.name,
            "pages": -1,
            "size_kb": round(pdf_path.stat().st_size / 1024, 2),
            "summary": f"Error: {str(e)[:30]}"
        })

# Print table
print("PDF Info Summary".center(130))
print("-" * 130)
print(f"{'Filename':<55} {'Pages':<8} {'Size(KB)':<10} {'First Page Content':<57}")
print("-" * 130)
for r in results:
    summary = r['summary'][:55] + ".." if len(r['summary']) > 55 else r['summary']
    print(f"{r['filename']:<55} {str(r['pages']):<8} {str(r['size_kb']):<10} {summary:<57}")
print("-" * 130)
print(f"Total PDF files: {len(results)}")
