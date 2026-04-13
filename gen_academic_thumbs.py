from pdf2image import convert_from_path
from pathlib import Path

pdf_data = {
    'E:\\portfolio-site\\个人资料\\作品（待分类）\\学术与科研\\科研\\Energy-Computing Synergy How UHV Projects and Digital.pdf': ('uhv-power', '特高压输电与数字赋能'),
    'E:\\portfolio-site\\个人资料\\作品（待分类）\\学术与科研\\调研项目\\从交易中介到多层级供应链服务商：中国钢铁贸易产业转型升级研究(2).pdf': ('steel-supply', '钢铁供应链转型研究'),
    'E:\\portfolio-site\\个人资料\\作品（待分类）\\学术与科研\\调研项目\\北京密云区农产品产销合作调研报告.pdf': ('agriculture', '农产品产销调研'),
    'E:\\portfolio-site\\个人资料\\作品（待分类）\\学术与科研\\自学笔记\\CDA_1级知识点汇总.pdf': ('cda-data', 'CDA数据分析学习'),
}

out_dir = Path('public/works/academic-research')
out_dir.mkdir(parents=True, exist_ok=True)

for pdf_path, (slug, title) in pdf_data.items():
    try:
        print(f'📄 {title}')
        images = convert_from_path(pdf_path, first_page=1, last_page=1, dpi=150)
        if images:
            thumb_path = out_dir / f'{slug}-thumb.jpg'
            images[0].save(thumb_path, 'JPEG', quality=85)
            print(f'   ✅ {slug}-thumb.jpg')
    except Exception as e:
        print(f'   ❌ Error: {e}')

print('✨ Done!')
