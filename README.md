# Veyron website

Static English-language corporate website for Veyron Infrastructure Engineering Pte. Ltd, implemented from the supplied brand and website guideline.

## Local preview

Run the bundled preview server from this folder:

```powershell
node preview-server.cjs
```

Then open `http://127.0.0.1:8000/`.

## Site structure

- Home, About, Services, Approach, Sectors, Insights, Careers, FAQ, How we work and Contact
- Five service-detail pages
- Three published insight articles
- Privacy Policy, Terms of Use and Cookie Notice
- `robots.txt`, `sitemap.xml` and a custom `404.html`

## Launch dependencies

- The contact form currently opens the visitor's email application with a pre-filled message. Connect it to an approved server-side form endpoint before public launch if direct submission is required.
- Add the confirmed GA4 measurement ID and Search Console verification only after those accounts exist. The site already pushes the requested `cta_click`, `form_submit`, `scroll_depth` and `outbound_click` events to `dataLayer`.
- Confirm hosting redirects, HTTPS/HSTS, CDN/WAF, backups and DNS records in the deployment environment.
- Legal pages should receive final Singapore PDPA review before go-live.
- Team profiles, project references, client names, phone numbers and live vacancies have not been invented. Add them only when verified.
- Google Fonts are loaded from the Google Fonts CDN; self-host them if the final privacy or performance policy requires it.

## Assets

- Brand colors: Steel `#1B3A5B`, Amber `#E08A2C`, Charcoal `#2B2B2B`, Cloud `#E7ECF1`, Light `#F5F7FA`
- Typography: Saira for headings and buttons; IBM Plex Sans for body copy
- Hero images use optimized WebP versions. Original PNGs remain in `assets/` for source retention.
