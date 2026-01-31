# IMPORTANT: Vercel Environment Variables

The website on Vercel needs the production API URL to be configured in the Vercel Dashboard.

## How to fix products not showing on Vercel:

1. Go to: https://vercel.com/dashboard
2. Select your project: `gjilper-magjike`
3. Click **Settings** → **Environment Variables**
4. Add this variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://test-ikgy.onrender.com/api`
   - **Environments**: Select "Production"
5. Click **Save**
6. Go to **Deployments** and click **Redeploy** on the latest deployment to apply the new env var

## Why this is needed:

- `.env.production` file is in `.gitignore` for security reasons
- Vercel builds the site without access to local `.env` files
- Environment variables must be set in the Vercel Dashboard UI

## What it fixes:

Once set, the website will:
- ✅ Fetch featured products from Render API
- ✅ Display products on homepage
- ✅ Show products on shop page
- ✅ Load product details correctly
