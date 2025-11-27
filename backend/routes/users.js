const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users - Get all users (admin only)
router.get('/', async (req, res) => {
	try {
		const users = await User.find().select('-password').sort({ createdAt: -1 });

		// Format users to match frontend expectations
		const formattedUsers = users.map(user => ({
			id: user._id.toString(),
			email: user.email,
			name: user.name,
			role: user.role,
			major: user.major,
			graduationYear: user.graduationYear,
			resume: user.resume,
			profileComplete: user.profileComplete,
			phone: user.phone,
			skills: user.skills || [],
			gpa: user.gpa,
			company: user.company,
			position: user.position
		}));

		res.json(formattedUsers);
	} catch (error) {
		console.error('Get users error:', error);
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// GET /api/users/:id - Get specific user
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');

		if (!user) {
			return res.status(404).json({
				error: 'User not found'
			});
		}

		res.json({
			id: user._id.toString(),
			email: user.email,
			name: user.name,
			role: user.role,
			major: user.major,
			graduationYear: user.graduationYear,
			resume: user.resume,
			profileComplete: user.profileComplete,
			phone: user.phone,
			skills: user.skills || [],
			gpa: user.gpa,
			company: user.company,
			position: user.position
		});
	} catch (error) {
		console.error('Get user error:', error);
		if (error.name === 'CastError') {
			return res.status(404).json({
				error: 'User not found'
			});
		}
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// PUT /api/users/:id - Update user profile
router.put('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				error: 'User not found'
			});
		}

		// Fields that can be updated
		const allowedUpdates = [
			'name',
			'major',
			'graduationYear',
			'resume',
			'profileComplete',
			'phone',
			'skills',
			'gpa',
			'company',
			'position'
		];

		// Update allowed fields
		allowedUpdates.forEach(field => {
			if (req.body[field] !== undefined) {
				user[field] = req.body[field];
			}
		});

		// Password update handled separately
		if (req.body.password) {
			user.password = req.body.password;
		}

		await user.save();

		// Return user without password
		const userObject = user.toObject();
		delete userObject.password;

		res.json({
			id: userObject._id.toString(),
			email: userObject.email,
			name: userObject.name,
			role: userObject.role,
			major: userObject.major,
			graduationYear: userObject.graduationYear,
			resume: userObject.resume,
			profileComplete: userObject.profileComplete,
			phone: userObject.phone,
			skills: userObject.skills || [],
			gpa: userObject.gpa,
			company: userObject.company,
			position: userObject.position
		});
	} catch (error) {
		console.error('Update user error:', error);
		if (error.name === 'CastError') {
			return res.status(404).json({
				error: 'User not found'
			});
		}
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

module.exports = router;

