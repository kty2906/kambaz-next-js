# Deployment Steps for kty2906

## 📋 Your GitHub Info
- **Username**: `kty2906`
- **Frontend Repo**: `https://github.com/kty2906/kambaz-next-js`
- **Backend Repo**: `https://github.com/kty2906/kambaz-node-server-app` (may need to update remote)

---

## 🚀 Step 1: Deploy Backend to Render.com

### Check Backend Remote
Your backend currently points to `kty2003`. If you need to update it:

```bash
cd kambaz-node-server-app
git remote set-url origin https://github.com/kty2906/kambaz-node-server-app.git
git push -u origin main
```

### Deploy to Render

1. **Go to Render.com**: https://render.com
2. **Sign in** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect GitHub** and select `kambaz-node-server-app`
5. **Configure**:
   - **Name**: `kambaz-node-server-app`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
6. **Add Environment Variables**:
   ```
   SERVER_ENV=production
   CLIENT_URL=https://your-vercel-app.vercel.app
   SERVER_URL=kambaz-node-server-app.onrender.com
   SESSION_SECRET=your-super-secret-random-string-min-32-characters-long
   PORT=10000
   ```
   ⚠️ **Note**: Update `CLIENT_URL` after deploying frontend!
7. **Click "Create Web Service"**
8. **Wait 2-5 minutes** for deployment
9. **Copy your Render URL**: `https://kambaz-node-server-app.onrender.com` (or whatever Render assigns)

---

## 🎨 Step 2: Deploy Frontend to Vercel

### Commit Lab 5 Changes

```bash
cd /Users/krishathakkar/2025/fall/wd/kambaz-next-js
git add .
git commit -m "Add Lab 5 - RESTful Web APIs with Express.js"
git push origin a4
```

### Deploy to Vercel

1. **Go to Vercel.com**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New..."** → **"Project"**
4. **Import** your GitHub repository `kambaz-next-js`
5. **Configure**:
   - **Framework Preset**: `Next.js` (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Branch**: `a4` (or `main` if you prefer)
6. **Add Environment Variable**:
   - **Key**: `NEXT_PUBLIC_HTTP_SERVER`
   - **Value**: `https://kambaz-node-server-app.onrender.com` (use your actual Render URL from Step 1)
7. **Click "Deploy"**
8. **Wait 2-3 minutes** for deployment
9. **Copy your Vercel URL**: `https://kambaz-next-js.vercel.app` (or whatever Vercel assigns)

---

## 🔗 Step 3: Connect Frontend and Backend

1. **Go back to Render.com**
2. **Navigate to** your service → **Environment**
3. **Update** `CLIENT_URL`:
   ```
   CLIENT_URL=https://your-vercel-app.vercel.app
   ```
   (Use your actual Vercel URL from Step 2)
4. **Click "Save Changes"** (auto-redeploys)

---

## ✅ Step 4: Test Everything

### Test Backend
Visit: `https://your-render-app.onrender.com/lab5/welcome`
**Expected**: "Welcome to Lab 5"

### Test Frontend
Visit: `https://your-vercel-app.vercel.app/Labs/Lab5`
**Expected**: Lab 5 page loads with all components

### Test Integration
1. Go to Lab 5 in your Vercel app
2. Click **"Fetch Welcome"** button
3. **Expected**: Displays "Welcome to Lab 5" (fetched from Render)

---

## 📝 Quick Reference

### Your URLs (after deployment)
- **Backend**: `https://kambaz-node-server-app.onrender.com`
- **Frontend**: `https://kambaz-next-js.vercel.app`

### Environment Variables

**Render (Backend)**:
```
SERVER_ENV=production
CLIENT_URL=https://kambaz-next-js.vercel.app
SERVER_URL=kambaz-node-server-app.onrender.com
SESSION_SECRET=your-super-secret-random-string
PORT=10000
```

**Vercel (Frontend)**:
```
NEXT_PUBLIC_HTTP_SERVER=https://kambaz-node-server-app.onrender.com
```

---

## 🐛 Troubleshooting

### Backend Remote Issue
If backend is pointing to wrong GitHub:
```bash
cd kambaz-node-server-app
git remote set-url origin https://github.com/kty2906/kambaz-node-server-app.git
git push -u origin main
```

### CORS Error
- Make sure `CLIENT_URL` in Render **exactly** matches your Vercel URL
- Include `https://` prefix
- No trailing slash

### 404 on Routes
- Check Render logs for errors
- Verify server is running
- Test backend URL directly in browser

### Environment Variables Not Working
- **Vercel**: Must use `NEXT_PUBLIC_` prefix
- **Render**: Check all variables are saved
- **Both**: Redeploy after changing env vars

---

## 🎉 Done!

Both apps are now live and connected. Any code changes pushed to GitHub will automatically deploy!

