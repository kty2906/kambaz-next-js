# Quick Deployment Guide

## 🎯 Goal
Deploy frontend to Vercel and backend to Render.com

---

## 📦 Backend Deployment (Render.com)

### Current Status
✅ Backend code is ready
✅ Git repository initialized
❓ Need to check if pushed to GitHub

### Steps:

1. **Check if backend is on GitHub**:
   ```bash
   cd kambaz-node-server-app
   git remote -v
   ```

2. **If not on GitHub, push it**:
   ```bash
   # Create a new repo on GitHub first, then:
   git remote add origin https://github.com/kty2906/kambaz-node-server-app.git
   git push -u origin main
   ```

3. **Deploy to Render.com**:
   - Visit: https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name**: `kambaz-node-server-app`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free
   
4. **Add Environment Variables** (in Render dashboard):
   ```
   SERVER_ENV=production
   CLIENT_URL=https://your-vercel-app.vercel.app
   SERVER_URL=kambaz-node-server-app.onrender.com
   SESSION_SECRET=your-super-secret-random-string-min-32-chars
   PORT=10000
   ```
   
   **Note**: Update `CLIENT_URL` after deploying frontend!

5. **Wait for deployment** (2-5 minutes)

6. **Copy your Render URL**: `https://kambaz-node-server-app.onrender.com` (or whatever Render assigns)

---

## 🎨 Frontend Deployment (Vercel)

### Current Status
✅ Frontend code is ready
✅ On branch `a4`
❓ Need to commit Lab 5 changes

### Steps:

1. **Commit Lab 5 changes**:
   ```bash
   cd /Users/krishathakkar/2025/fall/wd/kambaz-next-js
   git add .
   git commit -m "Add Lab 5 - RESTful Web APIs"
   git push origin a4
   ```

2. **Deploy to Vercel**:
   - Visit: https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select branch: `a4` (or `main` if you prefer)
   - Configure:
     - **Framework**: Next.js (auto-detected)
     - **Root Directory**: `./`
     - **Build Command**: `npm run build` (default)
   
3. **Add Environment Variable**:
   - Key: `NEXT_PUBLIC_HTTP_SERVER`
   - Value: `https://your-render-app.onrender.com` (use your actual Render URL from step 6 above)
   
4. **Click "Deploy"**

5. **Wait for deployment** (2-3 minutes)

6. **Copy your Vercel URL**: `https://your-app.vercel.app`

---

## 🔄 Final Step: Update Backend CORS

1. Go back to Render.com
2. Navigate to your service → **Environment**
3. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-vercel-app.vercel.app
   ```
4. Click **Save** (auto-redeploys)

---

## ✅ Test Everything

### Test Backend:
Visit: `https://your-render-app.onrender.com/lab5/welcome`
Expected: "Welcome to Lab 5"

### Test Frontend:
Visit: `https://your-vercel-app.vercel.app/Labs/Lab5`
Expected: Lab 5 page loads

### Test Integration:
1. Go to Lab 5 in your Vercel app
2. Click "Fetch Welcome" button
3. Should display: "Welcome to Lab 5" (fetched from Render)

---

## 🐛 Common Issues

### CORS Error
- **Fix**: Make sure `CLIENT_URL` in Render exactly matches your Vercel URL (including `https://`)

### 404 on Routes
- **Fix**: Check Render logs, verify server is running

### Environment Variable Not Working
- **Fix**: 
  - Vercel: Must use `NEXT_PUBLIC_` prefix
  - Render: Check all variables are saved
  - Redeploy after changing env vars

---

## 📋 Quick Reference

### Backend URL
`https://your-app.onrender.com`

### Frontend URL  
`https://your-app.vercel.app`

### Environment Variables Needed

**Render (Backend)**:
- `SERVER_ENV=production`
- `CLIENT_URL=https://your-vercel-app.vercel.app`
- `SERVER_URL=your-app.onrender.com`
- `SESSION_SECRET=your-secret`
- `PORT=10000`

**Vercel (Frontend)**:
- `NEXT_PUBLIC_HTTP_SERVER=https://your-render-app.onrender.com`

---

## 🎉 You're Done!

Both apps are now live and connected. Any code changes you push to GitHub will automatically deploy!

