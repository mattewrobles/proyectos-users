# Airpals — SEO Reporting System (Monthly)

> Cargar cuando: se prepara el reporte mensual de SEO de Airpals.

---

## Reglas generales

- Reporte cubre el **mes completo anterior** (ej: en abril, reportar marzo)
- Se prepara durante los primeros días del mes actual
- Data de: **Google Search Console** + **Google Analytics 4** + **Bing Webmaster Tools** (si disponible)
- Solo datos de mes completo — no parciales
- Objetivo: explicar cambios de performance claramente, qué los causa, y qué acciones tomar

---

## Formato del reporte (Slack-ready, en inglés)

```
Hello Team,

I'm excited to share with you the SEO performance highlights from [MONTH]. Let's dive in!

Overall metrics:
Google Search Console: [X]k clicks ([±X%] MoM), [X]% average CTR, and average position by page type: [X] (Blogs) vs [X] (Landing Pages)
Bing Webmaster Tools: [X] clicks ([±X%] MoM), [X]% average CTR, and [X] Avg. Position

General Website (GSC):
Organic Clicks: [X] ([±X%] YoY)
[Improved/Declined] our average organic position from [X] to [X]
Top Performing Page (Impressions) [landing page, not blog]: [URL] ([X] impressions) — [brief note]
Top Performing Page (Clicks) [landing page, not blog]: [URL] ([X] clicks)
Top CTR: [URL] ([X]% — [X] impressions, [X] clicks)

Blog (GSC):
Top Blog Post (Impressions): [URL] ([X] impressions)
Top Blog Post (Clicks): [URL] ([X] clicks)
Top CTR: [URL] ([X]%, [X] impressions, [X] clicks) — [brief note]

Metric: Google AI Overview Answers.
[Nota sobre cómo ChatGPT / Gemini / Google AI Overviews representan la marca este mes. Screenshots adjuntos si relevante.]

Revenue and conversions:
[Month] had [X] sessions ([±X%] YoY)
Conversions [increased/decreased] from [X] in [same month/last year] to [X] in [current month/actual year]
Conversion rate from organic search last month was [X]%
Revenue from Organic: $[X] ([±X%] YoY)

------Insights:
[Generados automáticamente por Claude basado en los datos de GSC y GA. Comparar MoM, YoY, posiciones, CTR, páginas top, revenue, conversions, y lo que sea relevante.]

------Next Steps:
- Blog metadata optimization (ongoing): keep refining titles and meta descriptions for high-impression blogs.
[+ Pasos adicionales generados por Claude basados en lo que los datos sugieran, más cualquier acción específica que Mau agregue antes de cerrar el reporte.]
```

---

## Instrucciones para Claude al generar el reporte

### Insights (auto-generados)
Comparar y analizar:
- MoM (mes actual vs mes anterior)
- YoY (mes actual vs mismo mes del año pasado)
- Posiciones: mejoras o caídas notables
- CTR: páginas con alto impressions pero bajo CTR (oportunidades de mejora de título/meta)
- Páginas top: qué las impulsa, cambios relevantes
- Revenue y conversions: tendencias, anomalías
- Cualquier otro insight relevante de los datos

### Next Steps (auto-generados)
- Siempre incluir: "Blog metadata optimization (ongoing)"
- Generar pasos adicionales basados en lo que los datos sugieren
- Incorporar acciones específicas que Mau agregue antes de cerrar el reporte

---

## Notas operacionales

- Mau provee los datos de GSC y GA4 al solicitar el reporte
- Claude analiza, interpreta y redacta — no inventa datos
- Si Bing data no está disponible, omitir esa línea del reporte
- Screenshots de AI Overviews los adjunta Mau manualmente
