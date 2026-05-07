# MaintenX Client

Frontend for the MaintenX predictive maintenance dashboard, built with Next.js, React, MUI, and Framer Motion.

## Features

- Responsive landing and dashboard experience
- Prediction form connected to the backend API
- Assistant and explainability sections
- Production metadata, sitemap, robots, and social preview images

## Local Development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `client/.env` from `client/.env.example` and set the backend URL:

```bash
NEXT_PUBLIC_API_URL=https://maintenx-s395.onrender.com
```

The client also supports `NEXT_PUBLIC_API_BASE_URL`, but `NEXT_PUBLIC_API_URL` is the primary env name used in this project.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Production Notes

- `app/layout.tsx` defines SEO and social metadata
- `app/manifest.ts` provides the web app manifest
- `app/robots.ts` and `app/sitemap.ts` provide crawl metadata
- `app/opengraph-image.tsx` and `app/twitter-image.tsx` generate social preview images
