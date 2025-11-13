# Deployment Checklist

## ✅ Pre-Deployment Checklist

### Frontend (Next.js)
- [ ] All Lab 5 components created
- [ ] Environment variable helper (`env.ts`) created
- [ ] Axios installed
- [ ] Code committed to GitHub
- [ ] `.env.local` file created locally (not committed)

### Backend (Node.js)
- [ ] Server code complete
- [ ] All routes implemented
- [ ] CORS configured
- [ ] Session configured
- [ ] Code committed to GitHub (separate repo or separate branch)
- [ ] `.env` file created locally (not committed)

---

## 🚀 Deployment Steps

### Step 1: Deploy Backend First

1. **Create GitHub repo for backend** (if not already done):
   ```bash
   cd kambaz-node-server-app
   git init
   git add .
   git commit -m "Backend ready for deployment"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/kambaz-node-server-app.git
   git push -u origin main
   ```

2. **Deploy to Render.com**:
   - Go to https://render.com
   - New → Web Service
   - Connect GitHub repo
   - Configure:
     - Name: `kambaz-node-server-app`
     - Build: `npm install`
     - Start: `npm start`
   - Add environment variables (see below)
   - Deploy

3. **Note your Render URL**: `https://your-app.onrender.com`

### Step 2: Deploy Frontend

1. **Commit and push frontend**:
   ```bash
   git add .
   git commit -m "Lab 5 complete - ready for deployment"
   git push origin a4  # or main, depending on your branch
   ```

2. **Deploy to Vercel**:
   - Go to https://vercel.com
   - New Project
   - Import GitHub repo
   - Configure:
     - Framework: Next.js (auto)
     - Root: `./`
   - Add environment variable:
     - `NEXT_PUBLIC_HTTP_SERVER=https://your-render-app.onrender.com`
   - Deploy

3. **Note your Vercel URL**: `https://your-app.vercel.app`

### Step 3: Update Backend CORS

1. Go back to Render.com
2. Update environment variable:
   - `CLIENT_URL=https://your-vercel-app.vercel.app`
3. Save (auto-redeploys)

---

## 📝 Environment Variables Reference

### Backend (Render.com)
```
SERVER_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app
SERVER_URL=your-app-name.onrender.com
SESSION_SECRET=your-super-secret-random-string-here
PORT=10000
```

### Frontend (Vercel)
```
NEXT_PUBLIC_HTTP_SERVER=https://your-render-app.onrender.com
```

---

## 🧪 Testing After Deployment

1. **Test Backend**: 
   - Visit: `https://your-app.onrender.com/lab5/welcome`
   - Should see: "Welcome to Lab 5"

2. **Test Frontend**:
   - Visit: `https://your-app.vercel.app/Labs/Lab5`
   - Click "Welcome" link
   - Should navigate to backend

3. **Test Integration**:
   - In Lab 5, click "Fetch Welcome" button
   - Should fetch data from backend without CORS errors

---

## 🔧 Troubleshooting

### CORS Error
- Check `CLIENT_URL` in Render matches Vercel URL exactly
- Verify CORS is configured in `index.js`

### 404 on Routes
- Check Render logs for errors
- Verify all routes are exported correctly

### Environment Variables Not Working
- In Vercel: Must use `NEXT_PUBLIC_` prefix
- In Render: Check all variables are set correctly
- Redeploy after changing env vars

---

## 📚 Resources

- [Render.com Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

