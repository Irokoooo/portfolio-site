import pdfplumber
import os
from pathlib import Path

pdf_dir = r"E:\portfolio-site\个人资料\作品（待分类）"
pdf_files = list(Path(pdf_dir).glob("*.pdf"))

results = []
for pdf_path in sorted(pdf_files):
    try:
        with pdfplumber.open(pdf_path) as pdf:
            filename = pdf_path.name
            num_pages = len(pdf.pages)
            file_size = pdf_path.stat().st_size / 1024  # Size in KB
            
            # Extract text from first page
            first_page_text = ""
            if num_pages > 0:
                first_page = pdf.pages[0]
                first_page_text = first_page.extract_text()
                if first_page_text:
                    # Get first 150 characters as summary
                    first_page_text = first_page_text.strip()[:150].replace("\n", " ")
            
            results.append({
                "filename": filename,
                "pages": num_pages,
                "size_kb": round(file_size, 2),
                "first_page_summary": first_page_text if first_page_text else "[Unable to extract]"
            })
    except Exception as e:
        results.append({
            "filename": pdf_path.name,
            "pages": "[Error]",
            "size_kb": round(pdf_path.stat().st_size / 1024, 2),
            "first_page_summary": f"[Error: {str(e)[:40]}]"
        })

# Output
print("\n" + "="*140)
print(f"{'Filename':<50} {'Pages':<8} {'Size(KB)':<12} {'First Page Summary':<70}")
print("="*140)

for result in results:
    summary = result['first_page_summary'][:65] + "..." if len(result['first_page_summary']) > 65 else result['first_page_summary']
    print(f"{result['filename']:<50} {str(result['pages']):<8} {str(result['size_kb']):<12} {summary:<70}")

print("="*140)
print(f"Total: {len(results)} PDF files\n")

# JSON output
import json
print("\nJSON Format:")
print(json.dumps(results, ensure_ascii=False, indent=2))
