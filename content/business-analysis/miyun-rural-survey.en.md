---
title: "Beijing Miyun Rural Supply-Chain Survey"
description: "Conducted deep fieldwork in rural Beijing, used Python for supply-chain flow visualization, and authored a 5,000-word digital promotion strategy report."
date: "2025-08"
tags: ["Python Visualization", "Fieldwork", "Strategy Report", "Rural Revitalization"]
type: "Research Report"
---

# Beijing Miyun Rural Supply-Chain Survey

## Project Background (Context)

Miyun District, one of Beijing's key agricultural ecological zones, has been actively piloting new models for connecting agricultural production with sales channels. This survey was commissioned by the District Bureau of Agriculture and Rural Affairs. We conducted in-depth fieldwork across 12 administrative villages to systematically map the gaps and bottlenecks in the supply chain.

**Survey Period:** June 2025 — August 2025 (10 weeks)

**Methods:** Semi-structured interviews + questionnaires + participatory observation

## Research Design

### Sample Framework

| Respondents | Count | Method |
|----------|------|------|
| Farm households | 86 | In-home interviews + questionnaires |
| Buyers / brokers | 23 | In-depth interviews |
| E-commerce operators | 8 | Semi-structured interviews |
| District government departments | 4 | Policy document analysis |

### Core Findings

After data cleaning and visualization in Python, three major supply-chain breakpoints were identified:

1. **Information asymmetry**: Farm households received market price updates with an average delay of **3.2 days**, forcing them into passive pricing
2. **Cold-chain gap**: District-wide cold-chain coverage stood at only **34%**, with summer spoilage rates as high as 18%
3. **Brand vacuum**: 89% of surveyed farm households had no proprietary brand, leaving products with extremely weak pricing power

## Python Visualization Outputs

Using `pandas` + `matplotlib` + `folium`, three types of charts were built:

- **Supply-chain flow map**: Visualized the journey of agricultural products from field to market, annotating the markup rate at each stage
- **Price volatility heatmap**: Showed seasonal price swings for key categories (chestnuts, honey, fresh fish) from 2020–2025
- **Supplier network graph**: Used `networkx` to map the cooperative relationships among buyers

## Strategy Report (5,000 words, primary author)

The report proposed a three-phase digital promotion strategy:

### Phase 1: Information Infrastructure (0–6 months)
- Deploy real-time price display boards in all 12 village committees
- Connect to the Beijing Agricultural Big Data Platform's live price API

### Phase 2: Brand Incubation (6–18 months)
- Select 5–8 signature products to build the "Miyun Origin" regional brand
- Sign live-streaming framework agreements with Douyin and Pinduoduo

### Phase 3: Cold-Chain Network Integration (18–36 months)
- Leverage PPP financing to attract private capital and fill cold-chain node gaps
- Target: raise cold-chain coverage to **70%** and reduce spoilage to below **8%**

## Project Outcome

The report was submitted to the District Bureau of Agriculture and Rural Affairs and was presented as a featured case study at the 2025 Miyun District Rural Revitalization Work Conference.
