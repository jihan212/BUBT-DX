const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Job = require('../models/Job');

// Connect to MongoDB
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bubt_career_board', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('✅ Connected to MongoDB for seeding');
	} catch (error) {
		console.error('❌ MongoDB connection error:', error);
		process.exit(1);
	}
};

const seedDatabase = async () => {
	try {
		await connectDB();

		// Clear existing data
		console.log('🗑️  Clearing existing data...');
		await User.deleteMany({});
		await Job.deleteMany({});

		// Create students
		console.log('👨‍🎓 Creating students...');
		const student1 = await User.create({
			email: 'monisa.biswas@student.bubt.edu',
			password: 'password123',
			name: 'Monisa Biswas',
			role: 'student',
			major: 'Computer Science & Engineering',
			graduationYear: 2025,
			resume: 'Passionate full-stack developer with 2+ years of experience in React, Node.js, and Python. Built 5+ web applications including an e-commerce platform and a task management system. Strong problem-solving skills and experience with modern development tools.',
			profileComplete: true,
			phone: '+880 1712-345678',
			skills: ['React', 'Node.js', 'Python', 'MongoDB', 'JavaScript', 'TypeScript'],
			gpa: '3.85'
		});

		const student2 = await User.create({
			email: 'jane.smith@student.bubt.edu',
			password: 'password123',
			name: 'Jane Smith',
			role: 'student',
			major: 'Business Administration',
			graduationYear: 2024,
			resume: 'Dynamic marketing professional with internship experience at 3 companies. Led social media campaigns that increased engagement by 40%. Strong analytical skills with proficiency in Google Analytics and social media management tools.',
			profileComplete: true,
			phone: '+880 1798-765432',
			skills: ['Digital Marketing', 'Content Creation', 'Analytics', 'Social Media', 'Adobe Creative Suite'],
			gpa: '3.92'
		});

		const student3 = await User.create({
			email: 'mike.monisason@student.bubt.edu',
			password: 'password123',
			name: 'Mike monisason',
			role: 'student',
			major: 'Electrical & Electronic Engineering',
			graduationYear: 2025,
			resume: 'Electronics enthusiast specializing in IoT and embedded systems. Completed 3 major projects including a smart home automation system. Experience with Arduino, Raspberry Pi, and circuit design.',
			profileComplete: false,
			phone: '+880 1634-567890',
			skills: ['Arduino', 'Raspberry Pi', 'C/C++', 'Circuit Design', 'IoT'],
			gpa: '3.67'
		});

		// Create recruiters
		console.log('💼 Creating recruiters...');
		const recruiter1 = await User.create({
			email: 'hr@techcorp.com',
			password: 'password123',
			name: 'Rocky Ahmed',
			role: 'recruiter',
			company: 'TechCorp Bangladesh',
			position: 'Senior HR Manager',
			phone: '+880 1711-234567'
		});

		const recruiter2 = await User.create({
			email: 'recruiter2@company.com',
			password: 'password123',
			name: 'David Chen',
			role: 'recruiter',
			company: 'Innovatix Solutions',
			position: 'Head of Talent Acquisition',
			phone: '+880 1812-345678'
		});

		// Create admin
		console.log('🛡️  Creating admin...');
		const admin = await User.create({
			email: 'admin@bubt.edu',
			password: 'admin123',
			name: 'Admin User',
			role: 'admin'
		});

		// Create jobs
		console.log('💼 Creating jobs...');
		const job1 = await Job.create({
			title: 'Frontend Developer',
			company: 'TechCorp Bangladesh',
			description: 'We are looking for a passionate Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern technologies like React, Vue.js, and TypeScript. Work with our design team to create beautiful, responsive user interfaces.',
			requirements: "Bachelor's degree in Computer Science or related field. 2+ years experience with React/Vue.js. Strong knowledge of HTML5, CSS3, JavaScript ES6+. Experience with REST APIs and version control (Git).",
			benefits: 'Competitive salary, health insurance, flexible working hours, professional development budget, modern office environment.',
			department: 'Engineering',
			type: 'Full-time',
			location: 'Dhaka, Bangladesh',
			salary: 'BDT 60,000 - 80,000',
			skills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Git'],
			postedBy: recruiter1._id,
			postedDate: new Date('2024-02-01'),
			applicationDeadline: new Date('2024-03-01'),
			applications: [
				{
					studentId: student1._id,
					studentName: student1.name,
					studentEmail: student1.email,
					appliedDate: new Date('2024-02-05'),
					status: 'Interview',
					coverLetter: 'I am very interested in this position and believe my skills in React and Node.js make me a great fit for your team. I have built several web applications and am passionate about creating great user experiences.'
				}
			]
		});

		const job2 = await Job.create({
			title: 'Marketing Intern',
			company: 'TechCorp Bangladesh',
			description: 'Exciting opportunity for marketing students to gain hands-on experience in digital marketing, content creation, and social media management. Work closely with our marketing team on real campaigns.',
			requirements: 'Currently pursuing degree in Marketing, Business Administration, or related field. Basic knowledge of social media platforms. Creative mindset and excellent communication skills.',
			benefits: 'Stipend, mentorship program, certificate of completion, networking opportunities, potential for full-time offer.',
			department: 'Marketing',
			type: 'Internship',
			location: 'Dhaka, Bangladesh',
			salary: 'BDT 15,000 (stipend)',
			skills: ['Social Media', 'Content Creation', 'Analytics', 'Communication'],
			postedBy: recruiter1._id,
			postedDate: new Date('2024-02-02'),
			applicationDeadline: new Date('2024-02-25'),
			applications: [
				{
					studentId: student2._id,
					studentName: student2.name,
					studentEmail: student2.email,
					appliedDate: new Date('2024-02-06'),
					status: 'Reviewed',
					coverLetter: 'I am excited about this marketing internship opportunity and eager to contribute to your team with my business administration background and social media experience.'
				}
			]
		});

		console.log('✅ Database seeded successfully!');
		console.log('\n📝 Sample Login Credentials:');
		console.log('Student: monisa.biswas@student.bubt.edu / password123');
		console.log('Recruiter: hr@techcorp.com / password123');
		console.log('Admin: admin@bubt.edu / admin123');
		console.log('\n🎉 Done!');

		process.exit(0);
	} catch (error) {
		console.error('❌ Error seeding database:', error);
		process.exit(1);
	}
};

seedDatabase();

