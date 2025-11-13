# Deployment Guide

This guide will help you deploy both the Next.js frontend to Vercel and the Node.js backend to Render.com.

## Prerequisites

1. GitHub account
2. Vercel account (free tier available)
3. Render.com account (free tier available)
4. Both projects pushed to GitHub

---

## Part 1: Deploy Backend to Render.com

### Step 1: Push Backend to GitHub

1. Navigate to the backend directory:
   ```bash
   cd kambaz-node-server-app
   ```

2. Initialize git (if not already done):
   ```bash
   git init
   ```

3. Create/update `.gitignore`:
   ```
   node_modules
   .env
   .env.local
   .DS_Store
   *.log
   ```

4. Add and commit files:
   ```bash
   git add .
   git commit -m "Initial commit for backend"
   ```

5. Create a new repository on GitHub (e.g., `kambaz-node-server-app`)

6. Add remote and push:
   ```bash
   git remote add origin https://github.com/kty2906/kambaz-node-server-app.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Render.com

1. Go to [Render.com](https://render.com) and sign up/login

2. Click **"New +"** → **"Web Service"**

3. Connect your GitHub repository (`kambaz-node-server-app`)

4. Configure the service:
   - **Name**: `kambaz-node-server-app` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select **Free**

5. Add Environment Variables (click "Add Environment Variable"):
   ```
   SERVER_ENV=production
   CLIENT_URL=https://your-vercel-app.vercel.app
   SERVER_URL=your-app-name.onrender.com
   SESSION_SECRET=your-super-secret-session-phrase-here
   PORT=10000
   ```
   
   **Important Notes:**
   - `CLIENT_URL`: Will be your Vercel app URL (update after deploying frontend)
   - `SERVER_URL`: Your Render app domain (without https://)
   - `SESSION_SECRET`: Use a long random string
   - `PORT`: Render sets this automatically, but you can use 10000 as default

6. Click **"Create Web Service"**

7. Wait for deployment (takes 2-5 minutes)

8. Once deployed, note your server URL (e.g., `https://kambaz-node-server-app.onrender.com`)

9. **Update Environment Variables**:
   - Go to your service → **Environment**
   - Update `SERVER_URL` to match your actual Render domain
   - Update `CLIENT_URL` after you deploy to Vercel

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Push Frontend to GitHub

1. Navigate to the frontend directory:
   ```bash
   cd /Users/krishathakkar/2025/fall/wd/kambaz-next-js
   ```

2. Make sure `.gitignore` includes:
   ```
   .env.local
   .env
   node_modules
   ```

3. Add and commit (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   ```

4. Push to GitHub:
   ```bash
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign up/login

2. Click **"Add New..."** → **"Project"**

3. Import your GitHub repository (`kambaz-next-js`)

4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables (click "Environment Variables"):
   ```
   NEXT_PUBLIC_HTTP_SERVER=https://your-render-app.onrender.com
   ```
   
   **Important:**
   - Replace `your-render-app.onrender.com` with your actual Render server URL
   - Use `https://` prefix
   - This should be the URL from Step 1.8 above

6. Click **"Deploy"**

7. Wait for deployment (takes 2-3 minutes)

8. Once deployed, note your Vercel URL (e.g., `https://kambaz-next-js.vercel.app`)

### Step 3: Update Backend CORS

1. Go back to Render.com dashboard

2. Navigate to your backend service → **Environment**

3. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-vercel-app.vercel.app
   ```

4. Click **"Save Changes"** - Render will automatically redeploy

---

## Part 3: Verify Deployment

### Test Backend

1. Open your browser and go to: `https://your-render-app.onrender.com/lab5/welcome`
2. You should see: "Welcome to Lab 5"

### Test Frontend

1. Open your browser and go to: `https://your-vercel-app.vercel.app`
2. Navigate to `/Labs/Lab5`
3. Click "Welcome" link - it should work!

### Test Integration

1. In your Vercel app, go to Lab 5
2. Try the "Fetch Welcome" button
3. It should fetch data from your Render server

---

## Troubleshooting

### CORS Errors

- Make sure `CLIENT_URL` in Render matches your exact Vercel URL
- Check that CORS is configured in `index.js`
- Verify environment variables are set correctly

### 404 Errors

- Check that all routes are properly exported in your server
- Verify the server is running (check Render logs)

### Environment Variable Issues

- Make sure `NEXT_PUBLIC_HTTP_SERVER` is set in Vercel
- Verify the URL includes `https://`
- Check that the server URL is correct

### Session Issues

- Make sure `SESSION_SECRET` is set in Render
- Verify `SERVER_ENV=production` is set
- Check cookie settings in `index.js`

---

## Quick Reference

### Backend (Render.com)
- **URL**: `https://your-app.onrender.com`
- **Environment Variables**:
  - `SERVER_ENV=production`
  - `CLIENT_URL=https://your-vercel-app.vercel.app`
  - `SERVER_URL=your-app.onrender.com`
  - `SESSION_SECRET=your-secret`
  - `PORT=10000`

### Frontend (Vercel)
- **URL**: `https://your-app.vercel.app`
- **Environment Variables**:
  - `NEXT_PUBLIC_HTTP_SERVER=https://your-app.onrender.com`

---

## Next Steps

1. Both apps are now live!
2. Any code changes pushed to GitHub will auto-deploy
3. Monitor logs in both Vercel and Render dashboards
4. Update environment variables as needed

