# Career 实习内容维护规则（MD 驱动）

本文档用于约束 `Career Journey` 中实习经历的新增与维护方式。

## 1. 文件位置

- 实习内容目录：`content/career/internships/`
- 每条实习 1 个 `.md` 文件
- 推荐命名：`company-or-project-slug.md`

## 2. Frontmatter 必填字段

```md
---
id: unique-id
type: internship
order: 1
org: 公司中文名
orgEn: Company English Name
role: 岗位名称 · 方向
period: 2025.01 — 2025.03
periodShort: 2025 春
logoSrc: /assets/icons/company.svg
metrics:
  - label: 指标名
    value: "30"
    suffix: "+"
    unit: 项
skills:
  - Skill A
  - Skill B
---
```

说明：
- `id` 必须唯一
- `order` 决定实习在左侧列表中的排序（升序）
- `metrics` 和 `skills` 可按需增减

## 3. Markdown 正文结构建议

推荐分三段：
- `## 工作重点（Highlights）`
- `## 方法与过程（Method）`
- `## 复盘沉淀（Reflection）`

可根据实际情况调整小节名称。

## 4. 成果图片自动滚动栏（可选）

如需展示实习成果图，在 frontmatter 增加 `galleryImages`：

```md
galleryImages:
  - /works/internships/tal/tal-01.jpg
  - /works/internships/tal/tal-02.jpg
  - /works/internships/tal/tal-03.jpg
```

规则：
- 不配置 `galleryImages` 则不显示滚动栏
- 图片必须放在 `public/` 下并使用站内绝对路径
- 建议用 ASCII 文件名（如 `tal-01.jpg`）避免线上路径兼容问题

## 5. 资源路径规范

- 推荐目录：`public/works/internships/<slug>/`
- 推荐命名：`<slug>-01.jpg`、`<slug>-02.jpg`...

## 6. 新增实习的工作流

1. 复制模板：`content/career/internships/_template.md`
2. 填写 frontmatter 与正文
3. 如需成果滚动图：先放图到 `public/works/internships/<slug>/`，再配置 `galleryImages`
4. 页面验证：`Career Journey` 左侧可见新条目，右侧详情正常渲染

## 7. 当前交互约定

- 实习详情页已去除顶部公司名称占位卡
- 教育经历保留顶部信息卡
- 成果滚动栏为放大版卡片、慢速滚动
