# F1 2026 Grid

A premium, full-stack Formula 1 information website for the 2026 season. Built with **Vite + React + TypeScript + Tailwind CSS**, powered by **Supabase**, and deployed on **Vercel**.

## Features

- **Homepage**: Hero section, live countdown to next race, championship standings, latest race results, and 2026 regulation highlights
- **Drivers**: Full 2026 grid with 22 drivers, search, team filtering, and detailed driver profiles with stats
- **Teams**: All 11 constructors with power units, bases, principals, championships, and driver lineups
- **Schedule**: Complete 2026 calendar with race results for completed rounds
- **2026 Regulations**: Explainer for new rules including active aero, power units, car dimensions, and sustainable fuels
- **Compare Tool**: Compare two drivers side-by-side
- **Favorite Driver**: Save your favorite driver with localStorage

## Tech Stack

- **Frontend**: Vite, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Project Structure

```
/
├── api/                    # Vercel serverless API routes
│   ├── db-client.js        # Supabase client (pre-configured)
│   ├── teams.js
│   ├── drivers.js
│   ├── races.js
│   ├── results.js
│   └── standings.js
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route pages
│   ├── lib/                # API helpers, utilities, fallback data
│   ├── types/              # TypeScript interfaces
│   └── App.tsx
├── public/                 # Static assets (images, favicon)
├── index.html
├── package.json
└── vercel.json
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root with these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_AUTH_PROXY=your_google_auth_proxy
FULLSTACK_PROJECT_REF=your_project_ref
FULLSTACK_RESTORE_API_URL=your_restore_api_url
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
```

## Database Schema

### teams
- `id`, `name`, `full_name`, `color`, `secondary_color`, `power_unit`, `base`, `team_principal`
- `points`, `position`, `wins`, `podiums`, `first_entry`, `championships`

### drivers
- `id`, `first_name`, `last_name`, `code`, `number`, `nationality`, `team_id`, `points`, `position`

### races
- `id`, `round`, `name`, `circuit`, `country`, `country_code`, `date_start`, `date_end`, `winner_id`, `status`

### results
- `id`, `race_id`, `driver_id`, `position`, `points`

## Deployment

This project is configured to deploy to Vercel. Run:

```bash
npm run build
```

Then deploy using the Vercel deployment tool.

## Data Sources

- Formula1.com official 2026 standings, driver list, and calendar
- FIA 2026 entry list and technical regulations

## Notes

- The app includes fallback data so it still displays information even if the API is temporarily unavailable.
- All API routes perform manual data joins to avoid dependency on Supabase foreign-key relationship inference.

