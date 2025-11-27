# BUBT Career Board - Backend Server

Express.js backend server with MongoDB for the BUBT Career & Internship Opportunity Board.

## 🚀 Quick Start

### Prerequisites

-   Node.js (v18 or higher)
-   MongoDB (local installation or MongoDB Atlas account)
-   npm or yarn

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up MongoDB

#### Option A: Local MongoDB Installation

1. **Download MongoDB Community Server**

    - Visit: https://www.mongodb.com/try/download/community
    - Download for your operating system
    - Follow installation instructions

2. **Start MongoDB Service**

    - **Windows**: MongoDB should start automatically as a service
    - **macOS/Linux**: Run `mongod` in terminal or start the service

3. **Verify MongoDB is Running**
    ```bash
    mongosh  # or mongo for older versions
    ```
    You should see the MongoDB shell.

#### Option B: MongoDB Atlas (Cloud - Recommended for beginners)

1. **Create Free Account**

    - Visit: https://www.mongodb.com/cloud/atlas/register
    - Sign up for a free account

2. **Create a Cluster**

    - Click "Build a Database"
    - Choose FREE tier (M0)
    - Select a cloud provider and region
    - Click "Create Cluster"

3. **Configure Database Access**

    - Go to "Database Access" → "Add New Database User"
    - Create username and password (save these!)
    - Set privileges to "Atlas Admin" or "Read and write to any database"

4. **Configure Network Access**

    - Go to "Network Access" → "Add IP Address"
    - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
    - Or add your specific IP address

5. **Get Connection String**
    - Go to "Database" → Click "Connect"
    - Choose "Connect your application"
    - Copy the connection string
    - Replace `<password>` with your database password
    - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bubt_career_board?retryWrites=true&w=majority`

### 3. Configure Environment Variables

1. **Copy the example environment file:**

    ```bash
    cp .env.example .env
    ```

2. **Edit `.env` file:**

    ```env
    # For Local MongoDB:
    MONGODB_URI=mongodb://localhost:27017/bubt_career_board

    # For MongoDB Atlas (replace with your connection string):
    # MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bubt_career_board

    PORT=5000
    NODE_ENV=development
    FRONTEND_URL=http://localhost:3000
    ```

### 4. Seed the Database (Optional)

Populate the database with sample data:

```bash
npm run seed
```

This will create:

-   3 sample students
-   2 sample recruiters
-   1 admin user
-   2 sample jobs with applications

**Default Login Credentials:**

-   Student: `monisa.biswas@student.bubt.edu` / `password123`
-   Recruiter: `hr@techcorp.com` / `password123`
-   Admin: `admin@bubt.edu` / `admin123`

### 5. Start the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   ├── User.js              # User model (Student/Recruiter/Admin)
│   ├── Job.js               # Job model with embedded applications
│   └── Application.js       # Application model (reference)
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── jobs.js              # Job CRUD routes
│   ├── applications.js      # Application routes
│   └── users.js             # User routes
├── scripts/
│   └── seedDatabase.js      # Database seeding script
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # This file
```

## 🔌 API Endpoints

### Authentication

-   `POST /api/auth/login` - Login user
-   `POST /api/auth/register` - Register new user (optional)

### Jobs

-   `GET /api/jobs` - Get all jobs
-   `GET /api/jobs?recruiter={id}` - Get jobs by recruiter
-   `GET /api/jobs/:id` - Get specific job
-   `POST /api/jobs?postedBy={id}` - Create new job
-   `PUT /api/jobs/:id` - Update job
-   `DELETE /api/jobs/:id` - Delete job

### Applications

-   `GET /api/applications?student={id}` - Get student's applications
-   `GET /api/applications?job={id}` - Get job applications
-   `POST /api/applications` - Apply for job
-   `PUT /api/applications` - Update application status

### Users

-   `GET /api/users` - Get all users (admin)
-   `GET /api/users/:id` - Get specific user
-   `PUT /api/users/:id` - Update user profile

### Health Check

-   `GET /api/health` - Server health check

## 🗄️ Database Schema

### User Model

-   `email` (String, unique, required)
-   `password` (String, hashed with bcrypt)
-   `name` (String, required)
-   `role` (Enum: student/recruiter/admin)
-   Student fields: `major`, `graduationYear`, `resume`, `skills`, `gpa`, `phone`
-   Recruiter fields: `company`, `position`

### Job Model

-   `title`, `company`, `description`, `requirements`, `benefits`
-   `department`, `type`, `location`, `salary`, `skills[]`
-   `postedBy` (User reference)
-   `postedDate`, `applicationDeadline`
-   `applications[]` (embedded subdocuments)

### Application (Embedded in Job)

-   `studentId` (User reference)
-   `studentName`, `studentEmail`
-   `appliedDate`, `status`, `coverLetter`

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: Authentication failed"**

-   Check your MongoDB username and password
-   Verify database user has correct permissions

**Error: "ECONNREFUSED"**

-   Ensure MongoDB service is running
-   Check if MongoDB is on default port 27017
-   Verify connection string in `.env` file

**Error: "MongoNetworkError" (Atlas)**

-   Add your IP address to Network Access in MongoDB Atlas
-   Or use "Allow Access from Anywhere" (0.0.0.0/0) for development

### Port Already in Use

If port 5000 is busy, change it in `.env`:

```env
PORT=5001
```

## 📝 Development Notes

-   Passwords are automatically hashed using bcrypt before saving
-   CORS is configured to allow requests from frontend
-   All API responses match the frontend's expected format
-   Error handling middleware catches and formats errors

## 🔐 Security Notes

-   Passwords are hashed with bcrypt (salt rounds: 10)
-   User passwords are never returned in API responses
-   CORS is configured to restrict origins
-   Input validation is handled by Mongoose schemas

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use MongoDB Atlas or managed MongoDB service
3. Set secure `FRONTEND_URL` for CORS
4. Use environment variables for all sensitive data
5. Consider adding rate limiting and authentication middleware

## 📞 Support

If you encounter any issues:

1. Check MongoDB is running and accessible
2. Verify environment variables are set correctly
3. Check console logs for detailed error messages
4. Ensure all dependencies are installed (`npm install`)

---

**Happy Coding! 🎉**
