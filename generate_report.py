import json

with open('E:\portfolio-site\pdf_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create summary report
report = """
================================================================================
                    PDF FILES INFORMATION REPORT
              Directory: E:\portfolio-site\个人资料\作品（待分类）
================================================================================

EXECUTIVE SUMMARY
-----------------
Total PDF Files: {count}
Total Size: {total_size} KB ({total_size_mb} MB)
Total Pages: {total_pages} pages
Average Pages per Document: {avg_pages}

DETAILED FILE LIST
-------------------
""".format(
    count=len(data),
    total_size=f"{sum(item['size_kb'] for item in data):.2f}",
    total_size_mb=f"{sum(item['size_kb'] for item in data) / 1024:.2f}",
    total_pages=sum(item['pages'] for item in data if item['pages'] > 0),
    avg_pages=f"{sum(item['pages'] for item in data if item['pages'] > 0) / len([x for x in data if x['pages'] > 0]):.1f}"
)

for idx, item in enumerate(data, 1):
    report += f"""
[{idx}] FILE: {item['name']}
    Pages: {item['pages'] if item['pages'] > 0 else 'Unable to determine'}
    Size: {item['size_kb']:.2f} KB
    First Page Summary: 
    {item['first_page_summary'][:150] if item['first_page_summary'] else '[No text extracted]'}
    
"""

report += "\n" + "="*80 + "\n"
report += "STRUCTURED DATA (JSON FORMAT)\n"
report += "="*80 + "\n"
report += json.dumps(data, ensure_ascii=False, indent=2)

# Save report
with open('E:\portfolio-site\PDF_Analysis_Report.txt', 'w', encoding='utf-8') as f:
    f.write(report)

print("Report generated: PDF_Analysis_Report.txt")
print(f"Total PDFs analyzed: {len(data)}")
