from pathlib import Path
from pdf2image import convert_from_path
from PIL import Image

# Define paths
slides_dir = Path(r"E:\portfolio-site\public\works\slides")

# Define PDF files to process
pdf_files = {
    "本科创意组-新文科-巧愿学者芸窗：以文化书吧实体IP赋能文娱社交app的运营创业实践(1).pdf": 
    "本科创意组-新文科-巧愿学者芸窗：以文化书吧实体IP赋能文娱社交app的运营创业实践(1)_thumb.jpg",
    
    "烽智安新全场景具身智能消防机器人系统.pdf": 
    "烽智安新全场景具身智能消防机器人系统_thumb.jpg"
}

print("Starting thumbnail generation...")

for pdf_name, thumb_name in pdf_files.items():
    pdf_path = slides_dir / pdf_name
    thumb_path = slides_dir / thumb_name
    
    print(f"\n Processing: {pdf_name}")
    
    if not pdf_path.exists():
        print(f"  PDF file not found: {pdf_path}")
        continue
    
    try:
        # Convert first page to image
        print(f"  Converting PDF first page to image...")
        images = convert_from_path(str(pdf_path), first_page=1, last_page=1, dpi=150)
        
        if images:
            img = images[0]
            print(f"  Original size: {img.size}")
            
            # Resize to 500x360px
            img_resized = img.resize((500, 360), Image.Resampling.LANCZOS)
            print(f"  Resized to: {img_resized.size}")
            
            # Save as JPEG with 85% quality
            img_resized.save(str(thumb_path), 'JPEG', quality=85)
            file_size = thumb_path.stat().st_size
            print(f"  Thumbnail saved: {thumb_name}")
            print(f"  File size: {file_size} bytes")
        else:
            print(f"  Failed to convert PDF")
            
    except Exception as e:
        print(f"  Error: {str(e)}")

print("\n All done!")
