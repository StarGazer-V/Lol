# MedAstra AI

MedAstra AI is a mobile-first, PWA-enabled quiz and question-bank workspace for NEET PG and INI-CET preparation. It focuses on active practice: custom MBBS modules, adaptive clinical MCQs, instant explanations, review tools, analytics mockups, AI-generation workflow documentation, a PostgreSQL schema, secure Super Admin seeding guidance, Docker assets, and GitHub Pages deployment automation.

## See it live on GitHub Pages

After this branch is pushed to GitHub, the site can be published with GitHub Pages:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab and run the **Deploy static site to GitHub Pages** workflow, or push to `work` / `main` to trigger it automatically.
5. When the workflow finishes, open the URL shown in the workflow summary. For a project repository, it normally looks like:

```text
https://<github-username>.github.io/<repository-name>/
```

The deployment workflow builds a static `dist/` directory containing the app shell, PWA files, documentation, and database schema before uploading it to GitHub Pages.

## Run locally

```bash
npm run check
npm run build
npm start
```

Then open `http://localhost:4173`.

## What is included

- Static PWA prototype: `index.html`, `styles.css`, `script.js`, `manifest.webmanifest`, and `service-worker.js`.
- Architecture documentation: `docs/architecture.md`.
- API contract documentation: `docs/api.md`.
- PostgreSQL schema: `database/schema.sql`.
- Secure Super Admin seeder scaffold: `backend/src/auth/seed-super-admin.ts`.
- AI question-generation scaffold: `backend/src/ai/question-generator.service.ts`.
- Docker and GitHub Actions deployment support.
