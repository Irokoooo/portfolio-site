from pathlib import Path

from PIL import Image
from PyPDF2 import PdfReader
from pdf2image import convert_from_path

SLIDES_DIR = Path(r"E:\portfolio-site\public\works\slides")
MAX_PREVIEW_PAGES = 6
OUTPUT_WIDTH = 500
OUTPUT_HEIGHT = 360


def fit_to_canvas(img: Image.Image, width: int, height: int) -> Image.Image:
    # Keep aspect ratio to avoid ugly stretching, place on white canvas.
    canvas = Image.new("RGB", (width, height), "white")
    img = img.convert("RGB")
    img.thumbnail((width, height), Image.Resampling.LANCZOS)
    x = (width - img.width) // 2
    y = (height - img.height) // 2
    canvas.paste(img, (x, y))
    return canvas


def process_pdf(pdf_path: Path) -> tuple[bool, str]:
    try:
        reader = PdfReader(str(pdf_path))
        page_count = len(reader.pages)
        preview_count = min(MAX_PREVIEW_PAGES, page_count)

        images = convert_from_path(
            str(pdf_path),
            first_page=1,
            last_page=preview_count,
            dpi=120,
        )

        stem = pdf_path.stem

        for idx, img in enumerate(images, start=1):
            out = fit_to_canvas(img, OUTPUT_WIDTH, OUTPUT_HEIGHT)
            preview_name = f"{stem}_p{idx}.jpg"
            out.save(SLIDES_DIR / preview_name, "JPEG", quality=85, optimize=True)

            # Keep backward-compatible first-page thumb for card default view.
            if idx == 1:
                thumb_name = f"{stem}_thumb.jpg"
                out.save(SLIDES_DIR / thumb_name, "JPEG", quality=85, optimize=True)

        return True, f"{pdf_path.name}: pages={page_count}, generated={preview_count}"
    except Exception as exc:
        return False, f"{pdf_path.name}: ERROR {exc}"


def main() -> None:
    pdf_files = sorted(SLIDES_DIR.glob("*.pdf"))
    if not pdf_files:
        print("No PDFs found.")
        return

    print(f"Found {len(pdf_files)} PDF files")
    success = 0

    for pdf in pdf_files:
        ok, message = process_pdf(pdf)
        print(message)
        if ok:
            success += 1

    print(f"Done: {success}/{len(pdf_files)} PDFs processed")


if __name__ == "__main__":
    main()
