# Backend Deployment Guide - Render.com (Free Tier)

This guide will help you deploy your backend to Render.com for free.

## Prerequisites
- GitHub account (if not already created)
- Your code pushed to a GitHub repository

## Step 1: Push Your Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit - backend ready for deployment"
   ```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `bubt-backend`)
   - **DO NOT** initialize with README, .gitignore, or license

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/bubt-backend.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy on Render.com

1. **Sign up/Login to Render**:
   - Go to https://render.com
   - Sign up with your GitHub account (it's free!)

2. **Create a New Web Service**:
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub account if not already connected
   - Select your `bubt-backend` repository
   - Click "Connect"

3. **Configure Your Service**:
   - **Name**: `bubt-career-board-backend` (or any name you like)
   - **Region**: Choose closest to you (e.g., Singapore, Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend` (if your backend folder is in root of repo) OR leave empty if backend files are in root
   - **Runtime**: `Node`
   - **Build Command**: `npm install` or `yarn install`
   - **Start Command**: `npm start` or `yarn start`
   - **Plan**: Select "Free" (spins down after 15 mins of inactivity, but it's free!)

4. **Set Environment Variables**:
   Click "Advanced" and add these environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```

   **Important Notes**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (you already have this)
   - `PORT`: Render will set this automatically, but you can keep 10000 as default
   - `FRONTEND_URL`: Replace with your actual Netlify site URL (e.g., `https://bubt-career-board.netlify.app`)

5. **Deploy**:
   - Click "Create Web Service"
   - Render will start building and deploying your backend
   - This takes about 2-5 minutes
   - Wait for the status to show "Live"

## Step 3: Get Your Backend URL

After deployment, Render will give you a URL like:
```
https://bubt-career-board-backend.onrender.com
```

**Important**: Your backend URL will be `https://your-service-name.onrender.com/api`

## Step 4: Update Your Frontend (Netlify)

1. **Update Netlify Environment Variables**:
   - Go to your Netlify dashboard
   - Select your site
   - Go to "Site settings" > "Environment variables"
   - Add/Update: `NEXT_PUBLIC_API_URL` = `https://your-service-name.onrender.com/api`

2. **Redeploy**:
   - Netlify will automatically redeploy when you update environment variables
   - Or trigger a manual redeploy from the "Deploys" tab

## Step 5: Update MongoDB Atlas Network Access

1. **Allow Render IP**:
   - Go to MongoDB Atlas
   - Navigate to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add `0.0.0.0/0`)

## Step 6: Test Your Deployment

1. **Test Backend Health**:
   Visit: `https://your-service-name.onrender.com/api/health`
   Should return: `{"status":"OK","message":"Backend server is running",...}`

2. **Test Frontend**:
   Visit your Netlify site and try logging in/signing up

## Important Notes:

1. **Free Tier Limitations**:
   - Service spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds (cold start)
   - Perfect for demos and small projects!

2. **Keeping Service Alive** (Optional):
   - You can use services like UptimeRobot (free) to ping your backend every 5 minutes
   - Or create a simple cron job

3. **If Deployment Fails**:
   - Check build logs in Render dashboard
   - Make sure all dependencies are in `package.json`
   - Verify environment variables are set correctly

## Alternative Free Hosting Options:

1. **Railway.app** - Similar to Render, free tier available
2. **Fly.io** - Free tier with some limitations
3. **Cyclic.sh** - Free tier for Node.js apps
4. **Vercel** - Can host Express.js apps (but designed more for Next.js)

## Troubleshooting:

- **502 Bad Gateway**: Service might be spinning up, wait 30 seconds
- **Connection Timeout**: Check MongoDB Atlas Network Access settings
- **CORS Errors**: Make sure `FRONTEND_URL` in backend matches your Netlify URL exactly

