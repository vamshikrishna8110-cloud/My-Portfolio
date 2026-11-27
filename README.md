# Venkat Akula · Portfolio

A static portfolio for Venkat Laxmi Narsimha Krishna Vamshi Akula, Senior AI Engineer. Built with React, Vite, Tailwind CSS, and Lucide. Fonts are served locally, and the hero animation is built with CSS.

## Local development

Use Node.js 24 and npm. From this checkout, run:

```sh
npm ci
npm run dev
```

Open http://localhost:5173/My-Portfolio/ on the computer running Vite. For a Cloud workspace, configure HTTP preview port 5173 and run `npm run dev -- --host 0.0.0.0 --port 5173 --strictPort`. Add `/My-Portfolio/` to the preview origin.

## Validate and preview the production build

```sh
npm run lint
npm run build
npm run preview
```

Open http://localhost:4173/My-Portfolio/. The build output is in `dist/`. Review content in `src/content.js` and section copy in `src/App.jsx`. The AI Lab uses synthetic data and runs entirely in the browser. Add a GitHub profile URL as `person.github` once confirmed.

## Publish to GitHub Pages

1. Review the portfolio and merge the website changes into `main`.
2. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. This requires repository settings access. Enable Actions if the repository has it disabled.
3. Open **Actions → Portfolio CI and Pages → Run workflow**, select **main**, and run it. An authorized maintainer must approve the `github-pages` deployment if the environment requires approval.
4. Once the deploy job succeeds, visit https://vamshikrishna8110-cloud.github.io/My-Portfolio/ and verify the homepage, navigation, and imagery.

The workflow builds pull requests and deploys only on manual runs from `main`. The base path in `vite.config.js` matches the case-sensitive repository name. If the repository is renamed or moved, update that path and the canonical and Open Graph URLs in `index.html`.


## Recruiter submissions

The form uses the supplied Formspree endpoint `https://formspree.io/f/mbgoejnw`. Verify the recipient inbox in your Formspree account. Configure email notifications, recruiter email as Reply-To where supported, spam protection, and origin restrictions if available. Review the provider's retention policy, document your own retention period in the form notice, and configure it with the provider as applicable.

To switch forms, add the replacement public endpoint (`https://formspree.io/f/<form-id>`) as the repository Actions variable `VITE_OPPORTUNITY_ENDPOINT` under **Settings → Secrets and variables → Actions → Variables**. For local development, put it in `.env.local` and restart Vite. An invalid override disables submission. The downloaded offline preview also disables submission. Never put API keys in Vite variables.

After publishing, submit a clearly labeled test from the Pages URL and verify the notification arrives in the recipient inbox. Confirm that Reply-To is correct and that rejected submissions preserve entered values. The confirmation on the site reports provider acceptance. Verify email delivery separately.
