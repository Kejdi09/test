# 🚀 Quick Deployment Steps

## ✅ Step 1: Backend (Render) - Already Done!
Your backend is already deployed at:
- **URL**: https://embroidery-ecommerce.onrender.com
- **API**: https://embroidery-ecommerce.onrender.com/api

Test it:
```bash
curl https://embroidery-ecommerce.onrender.com/api/health
```

## ✅ Step 2: Code Pushed to GitHub
Repository: https://github.com/Kejdi09/test.git
Branch: main

## 🎯 Step 3: Deploy Frontend to Vercel

### Option A: Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com/new

2. **Import Repository**:
   - Click "Import Project"
   - Select "Import Git Repository"
   - Paste: `https://github.com/Kejdi09/test`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

4. **Environment Variables**:
   Click "Add" and enter:
   ```
   Name: VITE_API_URL
   Value: https://embroidery-ecommerce.onrender.com/api
   ```

5. **Deploy**: Click "Deploy"

6. **Wait**: 2-3 minutes for build to complete

7. **Get URL**: You'll get something like `https://test-xyz123.vercel.app`

---

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# When prompted:
# - Set up and deploy? Yes
# - Which scope? Choose your account
# - Link to existing project? No
# - Project name? gjilper-magjike (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? No
```

After deployment, add environment variable:
```bash
vercel env add VITE_API_URL
# When prompted, enter: https://embroidery-ecommerce.onrender.com/api
# Select: Production
```

Then redeploy:
```bash
vercel --prod
```

---

## 🔧 Step 4: Update Render CORS (Important!)

After deploying to Vercel, you'll have a URL like: `https://test-xyz123.vercel.app`

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Select your **embroidery-ecommerce** service
3. Go to **Environment**
4. Click **Add Environment Variable**:
   ```
   Name: FRONTEND_URL
   Value: https://your-vercel-url.vercel.app
   ```
5. Click **Save Changes**
6. Render will automatically redeploy

---

## ✅ Step 5: Test Your Live App

1. **Visit your Vercel URL**: `https://your-app.vercel.app`

2. **Test Homepage**:
   - Should load featured products from database
   - Products should have images

3. **Test Shop Page**:
   - Should show all products from database
   - Filters should work

4. **Test Admin Login**:
   - Go to: `https://your-app.vercel.app/admin`
   - Login:
     - Email: `admin@gjilper-magjike.com`
     - Password: `admin123`

5. **Test Admin Features**:
   - View dashboard statistics
   - Create/edit products
   - Upload images
   - View messages

---

## 🐛 Troubleshooting

### CORS Error
**Problem**: "Access blocked by CORS policy"

**Solution**:
1. Make sure you added `FRONTEND_URL` in Render
2. URL should match exactly (no trailing slash)
3. Wait for Render to redeploy (1-2 minutes)

### API Connection Failed
**Problem**: "Failed to fetch" or "Network error"

**Solution**:
1. Check Render backend is running:
   ```bash
   curl https://embroidery-ecommerce.onrender.com/api/health
   ```
2. Should return: `{"status":"ok","database":"connected"}`
3. If backend is sleeping, visit the health URL to wake it up

### Build Failed on Vercel
**Problem**: Build fails during deployment

**Solution**:
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Make sure all dependencies are installed

### Images Not Showing
**Problem**: Product images return 404

**Note**: The free tier of Render uses ephemeral storage, so uploaded images will be lost when the server restarts.

**Solutions**:
1. **Temporary**: Re-upload images after each restart
2. **Recommended**: Use Cloudinary or AWS S3 for image storage in production

---

## 📊 Monitoring

### Backend Health
Check anytime:
```bash
curl https://embroidery-ecommerce.onrender.com/api/health
```

### Vercel Logs
- Go to Vercel Dashboard → Your Project → Logs
- Real-time logs of frontend requests

### Render Logs
- Go to Render Dashboard → Your Service → Logs
- Real-time logs of backend requests

---

## 🎉 Success Checklist

- [ ] Backend health check returns `{"status":"ok"}`
- [ ] Vercel deployment succeeded
- [ ] Frontend loads at Vercel URL
- [ ] Homepage shows products from database
- [ ] Shop page displays all products
- [ ] Can login to admin panel
- [ ] Admin dashboard shows real statistics
- [ ] Can create new products
- [ ] Images upload correctly
- [ ] CORS errors resolved

---

## 🔐 Admin Credentials

**Login URL**: `https://your-app.vercel.app/admin`

**Credentials**:
- Email: `admin@gjilper-magjike.com`
- Password: `admin123`

⚠️ **Change password after first login for security!**

---

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for error messages
2. Check Vercel deployment logs
3. Check Render backend logs
4. Verify environment variables are set correctly

---

## 🌐 Your URLs

- **Frontend (Vercel)**: `https://your-app.vercel.app` ← Deploy to get this
- **Backend (Render)**: `https://embroidery-ecommerce.onrender.com`
- **API Endpoint**: `https://embroidery-ecommerce.onrender.com/api`
- **GitHub Repo**: `https://github.com/Kejdi09/test`

---

**Your app is ready to deploy! 🚀**
Follow the steps above to get it live on Vercel.
