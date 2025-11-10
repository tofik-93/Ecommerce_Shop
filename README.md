## eCommerce Shop

Next.js + TypeScript + Tailwind + Redux Toolkit + shadcn-style UI, powered by DummyJSON APIs.

### Tech
- Next.js App Router (`/src/app`)
- TypeScript, Tailwind CSS
- Redux Toolkit for state (favorites, UI theme, mock auth)
- Axios for HTTP
- Minimal shadcn-style UI primitives (Button, Card, Input, Skeleton)
- Sonner toasts

### Features
- Product listing with infinite scroll (`/`)
- Search (client → DummyJSON search endpoint)
- Product details (`/product/[id]`)
- Favorites (Redux) (`/favorites`)
- Create product (`/create`)
- Edit product (`/edit/[id]`)
- Delete product with confirmation
- Dark mode toggle, basic mock login

### Getting Started
1. Install
```bash
npm install
```
2. Run dev
```bash
npm run dev
```
3. Open `http://localhost:3000`

### Notes
- Images are remote-allowed via `next.config.mjs`.
- API base: `https://dummyjson.com`
- See `src/lib/products.ts` for endpoints.

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
