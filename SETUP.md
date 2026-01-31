# Gjilpera Magjike - Local Development & Deployment Guide

## Running Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Start Development

**Terminal 1 - Frontend (Vite):**
```bash
npm run dev
# Opens http://localhost:5173
```

**Terminal 2 - Backend (Express):**
```bash
node server.js
# API runs on http://localhost:3001/api
```

## Database Setup (Render)

### 1. Create Render PostgreSQL Database
1. Go to [render.com](https://render.com)
2. Click "New +" → "PostgreSQL"
3. Create database with a name (e.g., `gjilper_magjike`)
4. Copy the Internal Database URL

### 2. Configure Environment Variables

Create `.env` file in the project root:
```env
DATABASE_URL=postgresql://user:password@your-db-host:5432/gjilper_magjike
NODE_ENV=development
PORT=3001
```

For production (Render):
```env
DATABASE_URL=postgresql://user:password@your-render-db-host:5432/gjilper_magjike
NODE_ENV=production
PORT=3001
```

### 3. Install Database Driver
```bash
npm install pg
```

## API Endpoints

The backend provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create product
- `POST /api/cart` - Save cart
- `POST /api/orders` - Create order

## Deployment to Vercel

### Frontend (Vercel)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend (Render)
1. Push code to GitHub
2. Connect GitHub to Render
3. Create "Web Service"
4. Set environment variables
5. Deploy

## Project Structure

```
gjilper-magjike/
├── src/                    # Frontend React code
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.tsx
│   └── main.tsx
├── server.js              # Backend Express server
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.local             # Local environment (git ignored)
```

## Next Steps

1. ✅ Frontend running locally (Vite)
2. ⏳ Backend API setup (Express)
3. ⏳ Database connection (PostgreSQL on Render)
4. ⏳ Deploy to Vercel & Render

For database queries in the backend, update `server.js` with actual DB calls using the `pg` library.
