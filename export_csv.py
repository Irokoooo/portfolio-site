import json
import csv

with open('E:\portfolio-site\pdf_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Export to CSV
csv_file = 'E:\portfolio-site\pdf_files_summary.csv'
with open(csv_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['Index', 'Filename', 'Number of Pages', 'Size (KB)', 'First Page Content Summary'])
    for idx, item in enumerate(data, 1):
        writer.writerow([
            idx,
            item['name'],
            item['pages'] if item['pages'] > 0 else 'Error',
            f"{item['size_kb']:.2f}",
            item['first_page_summary'][:100] if item['first_page_summary'] else '[No text extracted]'
        ])

print(f'CSV file created: pdf_files_summary.csv')
print(f'Total records: {len(data)}')
