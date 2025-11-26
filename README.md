# BUBT Career & Internship Opportunity Board

A comprehensive Next.js 14 application for connecting BUBT students with career opportunities and recruiters with talent.

## 🚀 Features

### Student Portal

-   **Profile Management**: Create and update personal profiles with skills and resume
-   **Job Browsing**: Search and apply to available job opportunities
-   **Application Tracking**: Monitor application status and interview schedules
-   **Dashboard**: Overview of profile completion, applications, and statistics

### Recruiter Portal

-   **Job Management**: Post, edit, and manage job listings
-   **Applicant Tracking**: Review applications and manage candidate pipeline
-   **Analytics Dashboard**: Track job performance and application metrics
-   **Company Profile**: Manage company information and branding

### Admin Panel

-   **User Management**: Oversee all students and recruiters
-   **Job Oversight**: Monitor and manage all job postings
-   **System Analytics**: View platform-wide statistics and reports

## 🛠 Tech Stack

-   **Frontend**: Next.js 14 with App Router
-   **Styling**: Tailwind CSS
-   **UI Components**: Shadcn UI
-   **Authentication**: Cookie-based session management
-   **API**: Next.js Route Handlers
-   **State Management**: React hooks

## 📋 Prerequisites

-   Node.js 18.x or higher
-   npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bubt_dx
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 🔐 Authentication

### Demo Credentials

#### Student Login

-   **Email**: monisa.biswas@student.bubt.edu
-   **Password**: password123

#### Recruiter Login

-   **Email**: hr@techcorp.com
-   **Password**: password123

#### Admin Login

-   **Email**: admin@bubt.edu
-   **Password**: admin123

## 📁 Project Structure

```
bubt_dx/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── applications/         # Application management
│   │   ├── jobs/                 # Job CRUD operations
│   │   └── users/                # User management
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── student/              # Student portal
│   │   ├── recruiter/            # Recruiter portal
│   │   └── admin/                # Admin panel
│   ├── auth/                     # Authentication pages
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Home page
├── components/                   # Reusable components
│   └── ui/                       # Shadcn UI components
├── lib/                          # Utility functions and data
│   ├── data.js                   # Dummy data and helper functions
│   └── utils.js                  # Utility functions
├── middleware.js                 # Route protection middleware
├── tailwind.config.js            # Tailwind CSS configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies and scripts
```

## 🎯 User Flows

### Student Journey

1. **Registration/Login**: Access the platform with student credentials
2. **Profile Setup**: Complete profile with academic information and resume
3. **Job Discovery**: Browse available jobs and internships
4. **Application**: Apply to relevant opportunities
5. **Tracking**: Monitor application status and interview schedules

### Recruiter Journey

1. **Registration/Login**: Access recruiter dashboard
2. **Job Posting**: Create detailed job descriptions
3. **Application Review**: Evaluate candidate applications
4. **Interview Management**: Schedule and track interviews
5. **Hiring**: Manage the recruitment pipeline

### Admin Journey

1. **System Overview**: Monitor platform statistics
2. **User Management**: Oversee student and recruiter accounts
3. **Content Moderation**: Manage job postings and applications
4. **Analytics**: Generate reports on platform usage

## 🔧 API Endpoints

### Authentication

-   `POST /api/auth` - Login user
-   `DELETE /api/auth` - Logout user

### Jobs

-   `GET /api/jobs` - Get all jobs
-   `GET /api/jobs?recruiter={id}` - Get recruiter's jobs
-   `POST /api/jobs` - Create new job
-   `GET /api/jobs/{id}` - Get specific job
-   `PUT /api/jobs/{id}` - Update job
-   `DELETE /api/jobs/{id}` - Delete job

### Applications

-   `GET /api/applications?student={id}` - Get student's applications
-   `GET /api/applications?job={id}` - Get job applications
-   `POST /api/applications` - Apply for job

### Users

-   `GET /api/users` - Get all users (admin)
-   `GET /api/users/{id}` - Get specific user
-   `PUT /api/users/{id}` - Update user profile

## 🎨 UI Components

The application uses Shadcn UI components including:

-   Button, Input, Card, Table
-   Tabs, Sheet, Dialog, Form
-   Badge, Label, Textarea

## 🔒 Security Features

-   **Route Protection**: Middleware-based authentication
-   **Session Management**: Cookie-based sessions
-   **Input Validation**: Client-side form validation
-   **Protected API Routes**: Authentication checks on sensitive endpoints

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

-   Desktop computers
-   Tablets
-   Mobile devices

## 🚀 Deployment

### Environment Variables

Create a `.env.local` file for production:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Build Commands

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for BUBT students and employers**
