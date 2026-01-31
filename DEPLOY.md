# Deployment Guide

## Backend (Already Deployed on Render)
✅ Backend URL: https://embroidery-ecommerce.onrender.com
✅ API URL: https://embroidery-ecommerce.onrender.com/api

## Frontend Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Update for production deployment with Render backend"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B: Vercel Dashboard**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./`
4. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://embroidery-ecommerce.onrender.com/api`
5. Click **Deploy**

### 3. Update Render Backend CORS

After deploying to Vercel, you'll get a URL like: `https://your-app.vercel.app`

Update the `FRONTEND_URL` environment variable in Render:
1. Go to Render Dashboard
2. Select your backend service
3. Go to Environment → Add Environment Variable
4. Name: `FRONTEND_URL`
5. Value: `https://your-app.vercel.app`
6. Save and redeploy

### 4. Test Production

1. Visit your Vercel URL
2. Login with: `admin@gjilper-magjike.com` / `admin123`
3. Test creating/editing products
4. Test all admin features

---

## Environment Variables

### Backend (Render)
```
DATABASE_URL=mongodb+srv://your-atlas-connection
JWT_SECRET=your-secret-key-min-32-chars
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://embroidery-ecommerce.onrender.com/api
```

---

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` is set in Render
- Check that the URL matches exactly (with/without trailing slash)

### API Connection Failed
- Check Render backend is running
- Visit https://embroidery-ecommerce.onrender.com/api/health
- Should return: `{"status":"ok","database":"connected"}`

### Build Failed on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Run `npm run build` locally first to test

---

## Quick Commands

```bash
# Check backend health
curl https://embroidery-ecommerce.onrender.com/api/health

# Test login
curl -X POST https://embroidery-ecommerce.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gjilper-magjike.com","password":"admin123"}'

# Get products
curl https://embroidery-ecommerce.onrender.com/api/products
```

---

## Success Checklist

- [ ] Frontend builds locally: `npm run build`
- [ ] Backend health check works
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] CORS updated in Render
- [ ] Can login to admin panel
- [ ] Can view products from database
- [ ] Can create/edit products
- [ ] Images upload correctly

🎉 **Your app is live!**
