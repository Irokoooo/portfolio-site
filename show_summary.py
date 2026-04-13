import json

with open('E:\portfolio-site\pdf_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("\n" + "="*155)
print("PDF FILE INFORMATION SUMMARY - PORTFOLIO SITE")
print("="*155)
print(f"{'#':<4} {'Filename':<60} {'Pages':<7} {'Size(KB)':<12} {'First Page Content Summary':<70}")
print("-"*155)

for idx, item in enumerate(data, 1):
    name = item['name'][:57] + ".." if len(item['name']) > 57 else item['name']
    pages = item['pages'] if item['pages'] > 0 else "Error"
    size = f"{item['size_kb']:.1f}"
    summary = item['first_page_summary'][:67] + ".." if item['first_page_summary'] and len(item['first_page_summary']) > 67 else item['first_page_summary']
    if not summary:
        summary = "[No text extracted]"
    
    print(f"{idx:<4} {name:<60} {str(pages):<7} {size:<12} {summary:<70}")

print("-"*155)
total_size = sum(item['size_kb'] for item in data)
total_pages = sum(item['pages'] for item in data if item['pages'] > 0)
avg_pages = total_pages / len([x for x in data if x['pages'] > 0])
print(f"TOTAL: {len(data)} PDF files | Total size: {total_size:.1f} KB | Average pages: {avg_pages:.1f}")
print("="*155)
