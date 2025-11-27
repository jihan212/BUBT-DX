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

// POST /api/auth/register - Register new user (optional, for future use)
router.post('/register', async (req, res) => {
	try {
		const { email, password, name, role } = req.body;

		if (!email || !password || !name || !role) {
			return res.status(400).json({
				error: 'Email, password, name, and role are required'
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email: email.toLowerCase() });

		if (existingUser) {
			return res.status(400).json({
				error: 'User already exists with this email'
			});
		}

		// Create new user
		const user = new User({
			email: email.toLowerCase(),
			password,
			name,
			role
		});

		await user.save();

		res.status(201).json({
			message: 'User registered successfully',
			user: {
				id: user._id.toString(),
				email: user.email,
				name: user.name,
				role: user.role
			}
		});
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

module.exports = router;

