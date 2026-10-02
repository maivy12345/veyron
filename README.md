# VEYRON website

Static English-language website built with HTML, CSS and a small JavaScript menu. The home page is `index.html`; each subpage lives in its own directory with an `index.html`. Upload the site contents to a static host that serves directory index files so URLs such as `/services/` resolve correctly.

## Local preview

From this folder, run `node preview-server.cjs` and open <http://127.0.0.1:8000/>. Keep the terminal running while viewing the site. To use a different port, set the `PORT` environment variable before starting the server.

## Pages

- Home — `index.html`
- Services — `services/`
- Applications — `applications/`
- Our Approach — `approach/`
- About — `about/`
- Contact — `contact/`

## Details to confirm before public launch

- The brief showed `support@têndomain`; the website uses **support@veyronsg.com** based on the supplied domain.
- The logo is the supplied SVG. The hero photographs are illustrative AI-generated imagery, not VEYRON project images.
- No project history, testimonials, certifications, named engineers, or statutory accreditation have been invented. The services page distinguishes ordinary independent review from statutory checking or certification.
- The site can be deployed to a private preview. Using `veyronsg.com` as its public address requires domain/DNS setup.

## Research references

The information structure was informed by public service pages from [R.J. Crocker Consultants](https://rj-crocker.com.sg/expertises/engineering/), [ECAS Consultants](https://www.ecas.com.sg/services/design-review/), [Aman Engineering Consultancy](https://www.amanengineering.com.sg/temporary-works-design-erss/) and [Temporary Works Consulting & Design](https://www.temporaryworksconsulting.com/). Website copy and layout are original.

## Generated images

Created with the built-in ImageGen tool as illustrative website assets. All prompts specified a wide, photorealistic editorial image, dark space on the left for white hero text, blue-hour lighting, a navy and steel-blue palette with restrained amber accents, and no logos, readable text, watermark or identifiable project signage.

| Asset | Final prompt subject |
| --- | --- |
| `assets/infrastructure-hero.png` | Civil infrastructure construction with temporary steel bracing and a bridge or viaduct under construction. |
| `assets/services-hero.png` | Close view of temporary steel bracing, bolted connections and concrete civil works. |
| `assets/applications-hero.png` | Urban rail viaduct, excavation, utility corridor and staged civil works. |
| `assets/approach-hero.png` | Engineer reviewing structural drawings and a scale bridge-support model beside an infrastructure site. |
| `assets/about-hero.png` | Completed concrete transport viaduct and its structural rhythm in an urban setting. |
| `assets/contact-hero.png` | Engineering office worktable and drawings overlooking an infrastructure skyline at dusk. |


