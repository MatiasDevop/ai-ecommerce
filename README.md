This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Chat Configuration (OpenRouter)

The shopping chat agent uses OpenRouter.

Create a `.env.local` file in the project root with:

```bash
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free
```

Notes:

- `OPENROUTER_API_KEY` is required.
- `OPENROUTER_MODEL` is optional. If omitted, the default is `meta-llama/llama-3.3-70b-instruct:free`.
- You can switch to any OpenRouter model by changing `OPENROUTER_MODEL`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GitHub Workflows (by purpose)

- `ci.yml`: code quality and build checks (`lint` + `build`) on PRs and pushes to `master`.
- `snyk.yml`: security scanning (Snyk Open Source + Snyk Code), plus scheduled monitoring.
- `deploy-vercel.yml`: manual production deployment to Vercel (`workflow_dispatch`).

### Vercel deploy workflow setup

Add these repository secrets in **Settings → Secrets and variables → Actions**:

1. `VERCEL_TOKEN`
2. `VERCEL_ORG_ID`
3. `VERCEL_PROJECT_ID`

Then run deployment from:

- GitHub Actions → **Deploy Vercel** → **Run workflow**

## Security Scanning (Snyk)

This repository includes a GitHub Actions workflow at `.github/workflows/snyk.yml` that runs on pull requests, pushes to `master`, and nightly on a schedule.

[![Snyk Security](https://github.com/MatiasDevop/ai-ecommerce/actions/workflows/snyk.yml/badge.svg)](https://github.com/MatiasDevop/ai-ecommerce/actions/workflows/snyk.yml)

### GitHub setup

1. In your repository, add a secret named `SNYK_TOKEN` under **Settings → Secrets and variables → Actions**.
2. In GitHub branch protection for `master`, require the Snyk checks to pass before merge.

### Automation behavior

- PRs and `master` pushes run dependency and code scans.
- A nightly scheduled run also scans and refreshes Snyk snapshots.
- `snyk monitor` is run automatically on `master` push and nightly schedule.
- You can manually trigger the workflow from GitHub Actions (`workflow_dispatch`) when needed: https://github.com/MatiasDevop/ai-ecommerce/actions/workflows/snyk.yml

### Local usage

Install and authenticate the Snyk CLI:

```bash
npm i -g snyk
snyk auth
```

Run scans locally:

```bash
snyk test --all-projects --severity-threshold=high
snyk code test --severity-threshold=high
snyk monitor --all-projects
```

Or via project scripts:

```bash
pnpm snyk:test
pnpm snyk:code
pnpm snyk:local
pnpm snyk:monitor
```
