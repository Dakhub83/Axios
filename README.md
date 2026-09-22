# Axios Website — Independent, Self-Hosted Storefront

A fully working e-commerce site you own outright: no Shopify, no monthly
platform fee, no external account required. Runs entirely on this machine
for now; can be deployed to any standard Node hosting later when you're
ready to go live.

## Stack

- **Next.js 16** (React) — pages, admin panel, server logic
- **better-sqlite3** — a local file database (`data/axios.db`), no external
  database server or account needed
- **Local file storage** — uploaded product photos are saved to
  `public/uploads/`
- No payment processor is wired up yet — checkout records a **test order**
  in the database so you can verify the whole flow without charging anyone.

## Running it

```
npm install
npm run dev
```

Then open http://localhost:3000. The dev server is already running in this
session at that address.

One example product (Pro-Flex Compression Leggings) is pre-loaded via
`npm run seed` — re-run that command any time to reset it (it won't
duplicate existing data checks, so only run it once per fresh database).

## What's actually built and working

- **Public storefront**: Home, Shop (all products), individual product
  pages (spec bullets, fit & size table, wear-tested badge, image gallery),
  About Us, Size Guide (auto-built from each product's fit table), Team
  Orders landing page with a working inquiry form.
- **Cart & checkout**: a real cart (persisted in the browser), a checkout
  form that records a **test order** — no payment is charged, this is for
  verifying the flow end-to-end.
- **Admin panel** at `/admin`:
  - **Products** — add/edit/delete products, **upload real photos**,
    multiple images per product, technical specs, and a fit/size table, all
    from a plain form (no coding needed to add a product).
  - **Orders** — every test order placed through checkout shows up here.
  - **Team Inquiries** — every Team Orders form submission shows up here.
  - **Wear Tests** — a working version of the family wear-testing tracker:
    log a tester, item, wash count, comfort rating, and pass/fail, right
    from the browser.

This has been tested end-to-end (product creation with a real image upload,
shop listing, add to cart, checkout, and both inquiry forms all confirmed
working).

## Adding your first real product

1. Go to http://localhost:3000/admin/products/new
2. Fill in title, category, price, description
3. Upload one or more real photos
4. Add spec bullets, one per line: `Fabric: 78% Nylon / 22% Spandex, 235 gsm`
5. Add size rows, one per line: `XS, 24-25, 34-35, 27, Compression fit - true to size`
6. Save — it immediately appears on `/shop` and gets its own page at
   `/products/<slug>`

## Where your data lives

- Products, orders, inquiries, wear-test log: `data/axios.db` (a single
  SQLite file — back this up if you want to keep your data)
- Uploaded photos: `public/uploads/`

Both are excluded from git via `.gitignore` so you don't accidentally
publish real customer data if you push this to a repo later.

## What's intentionally not built yet

- **Real payments.** Checkout is a test order only. When you're ready to
  actually sell, the natural next step is adding Stripe Checkout to the
  `placeOrderAction` in `src/app/checkout/actions.ts`.
- **Authentication on `/admin`.** Anyone with the URL can currently reach
  the admin panel. Fine for local testing; before deploying anywhere
  public, add a login check.
- **Email notifications.** Team order inquiries and orders are saved to the
  database but don't currently send an email — add that when you're ready
  to operate live.

## Project structure

```
src/
  app/            Pages and routes (Next.js App Router)
    admin/        Admin panel (products, orders, inquiries, wear tests)
    products/     Public product detail pages
    shop/         Product listing
    cart/         Cart page
    checkout/     Checkout + test order logic
    team-orders/  B2B landing page + inquiry form
  components/     Shared UI (cart context, forms, product card, gallery)
  lib/            Database layer (db.ts + one file per entity), image upload
scripts/seed.ts   Optional: seeds one example product
data/axios.db     Local SQLite database (created automatically)
public/uploads/   Uploaded product photos
```
