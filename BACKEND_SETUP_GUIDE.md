# 🚀 Complete Backend Setup Guide for BUBT Career Board

This guide will walk you through setting up the entire backend with MongoDB for your project.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Configuration](#frontend-configuration)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ Node.js installed (v18 or higher) - [Download Node.js](https://nodejs.org/)
- ✅ npm or yarn package manager
- ✅ A code editor (VS Code recommended)
- ✅ Git (optional, for version control)

---

## MongoDB Setup

You have two options for MongoDB:

### Option A: MongoDB Atlas (Cloud - Recommended for Beginners) ☁️

**Why MongoDB Atlas?**
- ✅ No installation needed
- ✅ Free tier available (512MB storage)
- ✅ Accessible from anywhere
- ✅ Managed by MongoDB (no maintenance)

#### Step-by-Step Guide:

1. **Create a MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with your email (or use Google/GitHub)

2. **Create a Free Cluster**
   - Click **"Build a Database"**
   - Choose **FREE** (M0) tier
   - Select a cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region closest to you
   - Click **"Create Cluster"** (takes 3-5 minutes)

3. **Create Database User**
   - Go to **"Database Access"** in the left sidebar
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication
   - Create a username (e.g., `bubt_admin`)
   - Create a strong password (save it somewhere safe!)
   - Under "Database User Privileges", select **"Atlas Admin"**
   - Click **"Add User"**

4. **Configure Network Access**
   - Go to **"Network Access"** in the left sidebar
   - Click **"Add IP Address"**
   - For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Note: For production, restrict to specific IPs
   - Click **"Confirm"**

5. **Get Your Connection String**
   - Go to **"Database"** in the left sidebar
   - Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Copy the connection string (it looks like this):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name at the end: `/bubt_career_board`
   - Final string should look like:
     ```
     mongodb+srv://bubt_admin:yourpassword@cluster0.xxxxx.mongodb.net/bubt_career_board?retryWrites=true&w=majority
     ```
   - Save this connection string for later!

### Option B: Local MongoDB Installation 💻

#### Windows:

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows
   - Click "Download"

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - optional but helpful)

3. **Verify Installation**
   - MongoDB should start automatically
   - Open Command Prompt and run:
     ```bash
     mongosh
     ```
   - You should see the MongoDB shell

#### macOS (using Homebrew):

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):

```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Local Connection String:**
```
mongodb://localhost:27017/bubt_career_board
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Express.js (web framework)
- Mongoose (MongoDB driver)
- CORS (cross-origin resource sharing)
- dotenv (environment variables)
- bcryptjs (password hashing)
- Other dependencies

### Step 3: Configure Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Open `.env` file and update:**

   **For MongoDB Atlas (Cloud):**
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/bubt_career_board?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **For Local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/bubt_career_board
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   ⚠️ **Important:** Never commit your `.env` file to Git! It contains sensitive information.

### Step 4: Seed the Database (Optional but Recommended)

This will populate your database with sample users and jobs:

```bash
npm run seed
```

**Expected Output:**
```
✅ Connected to MongoDB for seeding
🗑️  Clearing existing data...
👨‍🎓 Creating students...
💼 Creating recruiters...
🛡️  Creating admin...
💼 Creating jobs...
✅ Database seeded successfully!

📝 Sample Login Credentials:
Student: monisa.biswas@student.bubt.edu / password123
Recruiter: hr@techcorp.com / password123
Admin: admin@bubt.edu / admin123

🎉 Done!
```

### Step 5: Start the Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Expected Output:**
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net (or localhost)
🚀 Backend server running on port 5000
📝 Environment: development
```

**Test the server:**
Open your browser and go to: http://localhost:5000/api/health

You should see:
```json
{
  "status": "OK",
  "message": "Backend server is running",
  "timestamp": "2024-..."
}
```

---

## Frontend Configuration

### Step 1: Configure Frontend Environment

1. **Create/Update `.env.local` in the root directory:**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

   This tells the frontend where to find the backend API.

2. **Restart your Next.js development server** (if it's running)

### Step 2: Verify Frontend Can Connect

The frontend is already configured to use the backend through proxy routes in `app/api/`. No frontend code changes needed!

---

## Running the Application

### Start Both Servers

You need to run **two servers** simultaneously:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend Server:**
```bash
# From the root directory
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Backend Health Check:** http://localhost:5000/api/health

---

## Testing the Setup

1. **Test Backend Connection:**
   - Visit: http://localhost:5000/api/health
   - Should show: `{"status":"OK",...}`

2. **Test MongoDB Connection:**
   - Check backend terminal for: `✅ MongoDB Connected`
   - If you see connection errors, check your `.env` file

3. **Test Login:**
   - Go to: http://localhost:3000/auth
   - Use demo credentials:
     - Student: `monisa.biswas@student.bubt.edu` / `password123`
     - Recruiter: `hr@techcorp.com` / `password123`
     - Admin: `admin@bubt.edu` / `admin123`

---

## Troubleshooting

### ❌ MongoDB Connection Failed

**Error:** `MongoServerError: Authentication failed`

**Solutions:**
- ✅ Check your username and password in the connection string
- ✅ Verify database user has "Atlas Admin" privileges
- ✅ Make sure password doesn't contain special characters (or URL-encode them)

**Error:** `ECONNREFUSED` or `MongoNetworkError`

**Solutions:**
- ✅ Check MongoDB service is running (for local): `mongosh`
- ✅ For Atlas: Verify IP address is allowed in Network Access
- ✅ Check your internet connection (for Atlas)
- ✅ Verify connection string is correct

### ❌ Port Already in Use

**Error:** `Port 5000 is already in use`

**Solutions:**
- ✅ Change port in `backend/.env`: `PORT=5001`
- ✅ Or stop the process using port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F`
  - Mac/Linux: `lsof -ti:5000 | xargs kill`

### ❌ Backend Can't Find Modules

**Error:** `Cannot find module 'express'`

**Solutions:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### ❌ Frontend Can't Connect to Backend

**Error:** `Network error` or `Failed to fetch`

**Solutions:**
- ✅ Verify backend is running on port 5000
- ✅ Check `NEXT_PUBLIC_API_URL` in `.env.local`
- ✅ Restart frontend server after changing `.env.local`
- ✅ Check CORS configuration in `backend/server.js`

### ❌ Database Seed Fails

**Error:** `MongoServerError` during seeding

**Solutions:**
- ✅ Make sure MongoDB connection is working first
- ✅ Clear database manually and try again
- ✅ Check if users already exist (they should be cleared automatically)

---

## 📁 Project Structure Overview

```
BUBT-DX/
├── backend/                 # Backend server
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── models/             # Database models
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   └── users.js
│   ├── scripts/
│   │   └── seedDatabase.js # Database seeding
│   ├── .env                # Environment variables (NOT in Git)
│   ├── .env.example        # Environment template
│   ├── package.json
│   └── server.js           # Main server file
│
├── app/                    # Frontend (Next.js)
│   └── api/               # Proxy routes to backend
│
└── .env.local             # Frontend environment (NOT in Git)
```

---

## 🎯 Next Steps

1. ✅ Backend is set up and running
2. ✅ MongoDB is connected
3. ✅ Database is seeded with sample data
4. ✅ Frontend is connected to backend

**You're all set!** 🎉

Try logging in with the demo credentials and explore the application. The backend will now persist all data in MongoDB instead of memory.

---

## 📚 Additional Resources

- **MongoDB Atlas Documentation:** https://docs.atlas.mongodb.com/
- **Mongoose Documentation:** https://mongoosejs.com/docs/
- **Express.js Documentation:** https://expressjs.com/
- **MongoDB University (Free Courses):** https://university.mongodb.com/

---

## 🆘 Still Need Help?

If you're still having issues:

1. Check the backend terminal for error messages
2. Check the browser console for frontend errors
3. Verify all environment variables are set correctly
4. Make sure both servers are running
5. Check MongoDB connection status

Good luck with your project! 🚀

