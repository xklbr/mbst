# MBST App

Smartphone catalog challenge built with Next.js 16, React 19, TypeScript, and Styled Components.

## Setup

1. Install dependencies:
```bash
pnpm install
```
2. Create env file from template:
```bash
cp .env.example .env.local
```
3. Set required env values in `.env.local`:
- `API_BASE_URL`
- `API_KEY`
  - API docs: `https://prueba-tecnica-api-tienda-moviles.onrender.com/docs/`

4. Run development server:
```bash
pnpm dev
```

## Scripts

- `pnpm dev` - start development server
- `pnpm build` - production build
- `pnpm start` - run production server
- `pnpm lint` - lint checks
- `pnpm test` - run unit test suite
- `pnpm test:watch` - run tests in watch mode

## Architecture

This project follows a screaming architecture (feature-first):

- `src/features/catalog` - list/search flow
- `src/features/phone-detail` - detail/variants/similar products flow
- `src/features/cart` - cart state, persistence, and cart UI

Shared layers:

- `src/components/*` - shared UI/layout components
- `src/lib/*` - shared infra/utilities (API client, env, formatters)
- `src/styles/*` - global styles and styled-components SSR registry
- `src/app/*` - route adapters only

## Import Boundaries

- Use feature public APIs (`src/features/<feature>/index.ts`) for cross-feature imports.
- Keep route files in `src/app/*` thin and delegate logic to features.
- Keep reusable, non-domain-specific UI in `src/components/*`.

## Data Layer Notes

- API requests go through `src/lib/api/client.ts`.
- Every request includes `x-api-key` from env.
- Locked endpoints from current API docs:
  - `GET /products` with `search`, `limit`, `offset`
  - `GET /products/{id}`
- Catalog/detail services map backend DTOs to feature domain models.
- If API env is missing or the API fails, the UI renders explicit error states.

## State Management

- Cart state is managed with React Context + reducer in `src/features/cart/store`.
- Cart persists to `localStorage` with hydration guard to avoid wiping saved cart on initial mount.

## Current Scope

Implemented:

- Catalog page with search query in URL and result count.
- Phone detail page with storage/color selectors, dynamic price, add-to-cart enablement.
- Similar products list powered by API `similarProducts`.
- Cart page with persisted items, remove action, total on pay CTA, continue shopping.

Pending/iterative:

- Full visual parity refinements against final Figma measurements/states.
- Expand tests with more integration coverage and optional E2E.
