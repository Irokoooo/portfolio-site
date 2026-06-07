---
title: "Supply Chain Risk Analysis for Multinational Firms"
description: "Used panel data and a Stata multivariate regression model to quantify the impact of geopolitical risk on supply chain resilience."
date: "2025-03"
tags: ["Stata", "Panel Data", "Regression Analysis", "International Trade"]
type: "Data Analysis"
---

# Supply Chain Risk Analysis for Multinational Firms

## Project Background (Context)

Since 2022, global supply chains have faced unprecedented geopolitical shocks. This study focuses on quantifying the economic impact of those shocks to provide data-driven support for corporate strategic decision-making.

**Core research question:** For every 1-unit increase in the Geopolitical Risk Index (GPR), how much does a firm's supply chain resilience indicator decline?

## Data & Methods

### Data Sources

- Sample: A-share listed manufacturing companies on the Shanghai and Shenzhen exchanges, 2015–2022 (1,247 firms in total)
- GPR Index: Monthly Geopolitical Risk Index from Caldara & Iacoviello (2022)
- Corporate financial data: CSMAR database

### Methodology

A **Two-Way Fixed Effects (TWFE) panel model** was used, controlling for firm-level individual effects and time trends:

```
Y_it = β · GPR_t + γ · X_it + α_i + λ_t + ε_it
```

Where:
- `Y_it` is the composite supply chain resilience indicator (inventory turnover rate + accounts payable cycle)
- `X_it` are firm-level control variables (size, leverage ratio, ROA)
- `α_i` is the firm fixed effect; `λ_t` is the time fixed effect

## Key Findings (Outcome)

| Variable | Coefficient | Std. Error | Significance |
|------|------|--------|--------|
| GPR Index | -0.342 | 0.089 | *** |
| Firm size (ln) | 0.156 | 0.043 | *** |
| Leverage ratio | -0.231 | 0.067 | ** |

**Main conclusions:**

1. A 1 standard deviation increase in GPR is associated with approximately a **14.2%** decline in the supply chain resilience indicator
2. Large firms (top 25% by asset size) show significantly stronger hedging capacity (interaction term β = +0.18, p<0.01)
3. Highly leveraged firms are especially vulnerable to geopolitical shocks

## Policy Implications

For firms expanding overseas, recommendations include:
- Establish a **dual-supplier strategy** to reduce dependence on any single region
- Optimize inventory structure, raising safety stock to at least **45 days** of average sales
- Monitor monthly GPR trends and activate contingency plans when the index breaks above **180**
