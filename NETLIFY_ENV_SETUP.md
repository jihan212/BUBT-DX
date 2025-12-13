# Netlify Environment Variables Setup

## ⚠️ IMPORTANT: Set These Environment Variables in Netlify

After deploying to Netlify, you **MUST** set the following environment variable:

### Required Environment Variable:

1. **Go to Netlify Dashboard**:
   - Visit https://app.netlify.com
   - Select your site (e.g., `bubt-dx`)

2. **Navigate to Environment Variables**:
   - Click on **"Site settings"** (gear icon)
   - Go to **"Environment variables"** in the left sidebar
   - Click **"Add a variable"**

3. **Add the Backend URL**:
   ```
   Variable name: NEXT_PUBLIC_API_URL
   Value: https://your-backend-service.onrender.com/api
   ```
   
   **Example**:
   ```
   NEXT_PUBLIC_API_URL=https://bubt-backend.onrender.com/api
   ```

4. **Redeploy**:
   - After adding the variable, go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**
   - OR push a new commit to trigger automatic redeploy

## 🔍 How to Verify:

1. **Check Build Logs**:
   - Go to "Deploys" tab
   - Click on the latest deploy
   - Check if the environment variable is being used

2. **Test the API**:
   - Open browser console on your Netlify site
   - Try to login
   - Check Network tab - should see requests to your Render backend

## 📝 Notes:

- `NEXT_PUBLIC_` prefix makes the variable available to both client and server
- The variable must be set **before** building/deploying
- If you change the variable, you need to **redeploy** the site
- The backend URL should end with `/api` (e.g., `https://xxx.onrender.com/api`)

## 🐛 Troubleshooting:

**If login still doesn't work:**

1. **Verify Backend is Running**:
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return: `{"status":"OK",...}`

2. **Check Environment Variable**:
   - In Netlify, verify `NEXT_PUBLIC_API_URL` is set correctly
   - Make sure it includes `/api` at the end

3. **Check Browser Console**:
   - Open DevTools → Console
   - Look for any error messages
   - Check Network tab for failed requests

4. **Redeploy**:
   - Sometimes Netlify needs a fresh deploy to pick up env vars
   - Clear cache and redeploy

