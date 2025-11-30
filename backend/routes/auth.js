const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				error: 'Email and password are required'
			});
		}

		// Find user by email
		const user = await User.findOne({ email: email.toLowerCase() });

		if (!user) {
			return res.status(401).json({
				error: 'Invalid email or password'
			});
		}

		// Compare password
		const isPasswordValid = await user.comparePassword(password);

		if (!isPasswordValid) {
			return res.status(401).json({
				error: 'Invalid email or password'
			});
		}

		// Return user data (password is already excluded by toJSON method)
		res.json({
			message: 'Login successful',
			user: {
				id: user._id.toString(),
				email: user.email,
				name: user.name,
				role: user.role,
				major: user.major,
				graduationYear: user.graduationYear,
				resume: user.resume,
				profileComplete: user.profileComplete,
				phone: user.phone,
				skills: user.skills,
				gpa: user.gpa,
				company: user.company,
				position: user.position
			}
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
	try {
		const {
			email,
			password,
			name,
			role,
			major,
			graduationYear,
			phone,
			company,
			position
		} = req.body;

		if (!email || !password || !name || !role) {
			return res.status(400).json({
				error: 'Email, password, name, and role are required'
			});
		}

		// Validate role
		if (!['student', 'recruiter'].includes(role)) {
			return res.status(400).json({
				error: 'Invalid role. Must be student or recruiter'
			});
		}

		// Validate email format based on role
		if (role === 'student' && !email.toLowerCase().includes('@student.bubt.edu')) {
			return res.status(400).json({
				error: 'Student email must be from @student.bubt.edu domain'
			});
		}

		// Validate password length
		if (password.length < 6) {
			return res.status(400).json({
				error: 'Password must be at least 6 characters long'
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email: email.toLowerCase() });

		if (existingUser) {
			return res.status(400).json({
				error: 'User already exists with this email'
			});
		}

		// Create user data object
		const userData = {
			email: email.toLowerCase(),
			password,
			name,
			role
		};

		// Add role-specific fields
		if (role === 'student') {
			if (major) userData.major = major;
			if (graduationYear) userData.graduationYear = parseInt(graduationYear);
			if (phone) userData.phone = phone;
		} else if (role === 'recruiter') {
			if (company) userData.company = company;
			if (position) userData.position = position;
			if (phone) userData.phone = phone;
		}

		// Create new user
		const user = new User(userData);
		await user.save();

		// Return user data (password is excluded by toJSON method)
		res.status(201).json({
			message: 'User registered successfully',
			user: {
				id: user._id.toString(),
				email: user.email,
				name: user.name,
				role: user.role,
				major: user.major,
				graduationYear: user.graduationYear,
				phone: user.phone,
				company: user.company,
				position: user.position,
				profileComplete: user.profileComplete,
				skills: user.skills || [],
				gpa: user.gpa
			}
		});
	} catch (error) {
		console.error('Registration error:', error);
		
		// Handle duplicate email error
		if (error.code === 11000) {
			return res.status(400).json({
				error: 'User already exists with this email'
			});
		}

		// Handle validation errors
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(err => err.message);
			return res.status(400).json({
				error: errors.join(', ')
			});
		}

		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

module.exports = router;

