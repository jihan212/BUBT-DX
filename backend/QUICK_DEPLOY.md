# Quick Deployment Checklist

## For Render.com Free Deployment

### ✅ Pre-Deployment Checklist:
- [ ] Code is pushed to GitHub
- [ ] All environment variables documented
- [ ] MongoDB Atlas connection string ready
- [ ] Netlify site URL ready

### 🚀 Quick Steps:

1. **Sign up at Render.com** (use GitHub login)
2. **Create Web Service** → Connect your GitHub repo
3. **Settings**:
   - Build: `npm install` or `yarn install`
   - Start: `npm start` or `yarn start`
   - Plan: **Free**
4. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://...
   NODE_ENV=production
   FRONTEND_URL=https://your-site.netlify.app
   ```
5. **Deploy** → Wait 2-5 minutes
6. **Copy your backend URL** (e.g., `https://xxx.onrender.com`)
7. **Update Netlify**: Add `NEXT_PUBLIC_API_URL=https://xxx.onrender.com/api`
8. **Update MongoDB Atlas**: Allow all IPs (0.0.0.0/0) in Network Access

### 📝 Your URLs:
- **Backend**: `https://your-service.onrender.com`
- **API Base**: `https://your-service.onrender.com/api`
- **Frontend**: `https://your-site.netlify.app`

### 🔧 Test:
- Health Check: `https://your-service.onrender.com/api/health`
- Should return: `{"status":"OK",...}`

### ⚠️ Free Tier Note:
Service sleeps after 15 mins of inactivity. First request takes ~30 seconds (cold start).

