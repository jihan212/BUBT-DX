# Deployment Workflow Guide

## 📁 Your Current Setup

1. **Main Repo** (Frontend + Backend folder)
   - Connected to: **Netlify** (deploys frontend)
   - Contains: Frontend code + `backend/` folder

2. **Backend-Only Repo**
   - Connected to: **Render** (deploys backend)
   - Contains: Only backend code

---

## 🔄 Workflow for Making Changes

### Scenario 1: You Changed FRONTEND Code Only

**Steps:**

1. **Make your changes** in the main repo (frontend files)

2. **Commit and push to main repo**:
   ```bash
   git add .
   git commit -m "Update frontend: [describe changes]"
   git push origin main
   ```

3. **Netlify automatically deploys** ✨
   - Netlify detects the push
   - Builds and deploys frontend automatically
   - Done! (takes ~2-5 minutes)

4. **No action needed for backend** ✅
   - Backend repo stays unchanged
   - Render deployment unaffected

---

### Scenario 2: You Changed BACKEND Code Only

**Steps:**

1. **Make your changes** in the main repo's `backend/` folder

2. **Commit and push to main repo**:
   ```bash
   git add backend/
   git commit -m "Update backend: [describe changes]"
   git push origin main
   ```

3. **Sync changes to backend repo**:
   ```bash
   # Navigate to backend-only repo folder
   cd path/to/backend-only-repo
   
   # Copy changed files (or pull from main repo)
   # Option A: If backend repo is a submodule/subtree
   git pull origin main
   
   # Option B: Manual copy (if repos are separate)
   # Copy backend/ folder contents to backend-only repo
   ```

4. **Push to backend repo**:
   ```bash
   cd path/to/backend-only-repo
   git add .
   git commit -m "Update backend: [describe changes]"
   git push origin main
   ```

5. **Render automatically deploys** ✨
   - Render detects the push
   - Builds and deploys backend automatically
   - Done! (takes ~2-5 minutes)

---

### Scenario 3: You Changed BOTH Frontend AND Backend

**Steps:**

1. **Make your changes** in the main repo

2. **Commit and push to main repo**:
   ```bash
   git add .
   git commit -m "Update frontend and backend: [describe changes]"
   git push origin main
   ```

3. **Netlify automatically deploys frontend** ✨

4. **Sync backend changes to backend repo** (same as Scenario 2):
   ```bash
   cd path/to/backend-only-repo
   # Copy or pull backend/ folder
   git add .
   git commit -m "Update backend: [describe changes]"
   git push origin main
   ```

5. **Render automatically deploys backend** ✨

---

## 🎯 Recommended Workflow (Using Git Subtree)

To make this easier, you can use **Git Subtree** to automatically sync the `backend/` folder:

### Setup (One-time):

```bash
# In your main repo
cd /path/to/main-repo

# Add backend repo as subtree
git subtree push --prefix=backend origin-backend main --squash
```

Or use a simpler script (see below).

---

## 📝 Quick Reference Commands

### Frontend Only Changes:
```bash
# In main repo
git add app/ components/ lib/ # frontend files
git commit -m "Frontend update"
git push origin main
# ✅ Netlify auto-deploys
```

### Backend Only Changes:
```bash
# In main repo
git add backend/
git commit -m "Backend update"
git push origin main

# Then sync to backend repo
cd ../backend-only-repo
git pull  # or copy files manually
git add .
git commit -m "Backend update"
git push origin main
# ✅ Render auto-deploys
```

---

## 🤖 Automation Option: Use a Script

Create a script to automate backend sync:

**File: `sync-backend.sh`** (or `sync-backend.ps1` for Windows):

```bash
#!/bin/bash
# sync-backend.sh

echo "🔄 Syncing backend to separate repo..."

# Change to main repo
cd /path/to/main-repo
git pull origin main

# Copy backend folder to backend repo
cp -r backend/* /path/to/backend-only-repo/

# Commit and push to backend repo
cd /path/to/backend-only-repo
git add .
git commit -m "Sync backend from main repo"
git push origin main

echo "✅ Backend synced and deployed!"
```

**For Windows PowerShell (`sync-backend.ps1`):**
```powershell
Write-Host "🔄 Syncing backend to separate repo..." -ForegroundColor Cyan

# Change to main repo
Set-Location "F:\CSE\SDP-4\BUBT-DX"
git pull origin main

# Copy backend folder
Copy-Item -Path "backend\*" -Destination "F:\path\to\backend-only-repo\" -Recurse -Force

# Commit and push to backend repo
Set-Location "F:\path\to\backend-only-repo"
git add .
git commit -m "Sync backend from main repo"
git push origin main

Write-Host "✅ Backend synced and deployed!" -ForegroundColor Green
```

---

## ⚠️ Important Notes

1. **Environment Variables**:
   - Frontend (Netlify): `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com/api`
   - Backend (Render): `MONGODB_URI`, `NODE_ENV`, `FRONTEND_URL`

2. **Keep Backend in Sync**:
   - Always sync backend changes to the backend-only repo
   - Frontend deployment won't affect backend
   - Backend deployment won't affect frontend

3. **Testing**:
   - Test locally first before pushing
   - Check both deployments after changes

---

## 🎯 Alternative: Single Repo Setup (Recommended for Future)

Consider using a **single repo** with different build configs:
- Netlify: Build only frontend (ignore `backend/` folder)
- Render: Deploy only `backend/` folder

This eliminates the need to sync between repos!

