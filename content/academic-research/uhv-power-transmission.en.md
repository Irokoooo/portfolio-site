## Genesis

1. As AI dominates the era, "computing power is the new electricity" has become consensus — through what energy infrastructure has China broken through on the power supply side?
2. Existing literature largely focuses on UHV's impact on manufacturing performance: does a similar significant effect exist for the service sector?
3. Against the backdrop of the "East Data, West Computing" initiative, why is it still necessary to massively push "West-to-East Power Transmission" (UHV)?

Under my supervisor's guidance, the research scope narrowed from the service sector broadly to producer services with high power sensitivity — including AI, finance, and e-commerce.

## Role

Lead researcher. I handled the entire pipeline: topic conception, construction of a staggered Difference-in-Differences model, cleaning of nearly 190,000 asset records, full English paper writing, and data visualization.

## Methodology

This study treats the successive commissioning of China's UHV transmission projects as a quasi-natural experiment. To avoid the "average-effect dilution" that comes with sampling traditional service firms, I strictly filtered for A-share listed producer-service enterprises from 2008 to 2023. The identification strategy uses a staggered DID model:

$$
Y_{it}=\alpha+\beta\cdot UHV_{it}+\gamma\cdot X_{it}+\mu_i+\lambda_t+\epsilon_{it}
$$

To precisely capture each firm's degree of digital dependence, I combined Python with a large language model to text-mine the MD&A sections of annual reports. To guard against "pseudo-digitalization" self-reporting, I built an automated web-scraping workflow — manually verified — and extracted 189,822 intangible asset line items (such as ERP systems and software copyrights) as objective corroboration. Parallel trends tests, dynamic effects, and placebo tests were completed in Stata.

## Key Findings

The infrastructure dividend from UHV does not manifest as a universal "scale expansion" across all industries. Instead, it shows a distinctly structural "precision irrigation" pattern:

1. It significantly improves the operational performance of modern producer-service firms in eastern receiving regions.
2. A firm's degree of digital dependence acts as the core amplifier in this process.
3. More highly digitalized firms face greater Value of Lost Load (VoLL) risk, and therefore derive more significant business continuity guarantees and performance gains from the "clean, stable power" that UHV delivers.

This enabling mechanism is fundamentally rooted in power "quality resilience" rather than mere "quantity of supply." At the empirical level, it validates that West-to-East Power Transmission provides the critical underlying energy synergy for high-frequency, hot-data processing in the eastern nodes of the "East Data, West Computing" initiative.

## Problem & Solution

| Challenge | Response |
|---|---|
| Academic intimidation and cognitive overload starting from scratch. Early on, faced with a complex empirical pipeline, it was hard to know where to begin. | Task decomposition and targeted help-seeking: first searched social media for senior researchers' lessons learned to build a global view, then brought specific sticking points to my supervisor, converting anxiety into actionable problems. |
| Tool-chain gaps and coding blind spots. Parallel demands for data processing, econometric coding, and spatial visualization made progress difficult. | Learn-by-doing to get the workflow running: self-taught Stata for staggered DID estimation, self-taught ArcGIS for spatial mapping, used Origin for chart polishing, and built a personal publication workflow. |
| Cross-language output and prolonged review cycles. Needed to faithfully translate econometric logic into academic English and endure six months of repeated revisions. | Grinding through input and emotional desensitization: two months of intensive academic English training, accepting the academic reality of "tearing it down and starting over," and iterating continuously until reaching the review stage. |

## Personal Reflection

Research is not an insurmountable mountain. Stata code that once looked like a foreign language, complex panel data, and academic English expression — all of these can be converted into reusable tools through the "decompose–execute–review" cycle. The biggest takeaway: don't be defeated by assumed difficulty. Research is a process of disenchantment, and also a grounded, profound act of self-reconstruction.
