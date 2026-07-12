# Ambimed Web (Next.js)

Next.js port of [ambimed-healthcare](https://www.ambimed.in) — marketing site plus Supabase-backed client booking app.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your Supabase credentials (same values as `VITE_SUPABASE_*` / `EXPO_PUBLIC_SUPABASE_*` in the mobile app):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Copy static assets from the original site into `public/assets/` (logo, hero images, service cards, certificates, etc.). The repo references paths like `/assets/ambimed-logo.png` — these are not committed in the Vite repo either.

4. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing homepage |
| `/app/booking` | Service dashboard |
| `/app/book/[serviceId]` | Multi-step booking |
| `/app/login` | Phone OTP sign-in |
| `/app/book/review` | Review & confirm (auth required) |
| `/app/history` | Booking history (auth required) |
| `/app/doctor` | Referral hub (doctor/corporate) |
| `/terms` | Terms & conditions |
| `/caregiverapp` | Caregiver app landing |

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Supabase** — auth (phone OTP) + database
- **Framer Motion** — animations
- **Plain CSS** — same styling as the Vite original (no Tailwind)

## Build

```bash
npm run build
npm start
```
