const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	role: {
		type: String,
		enum: ['student', 'recruiter', 'admin'],
		required: true
	},
	// Student specific fields
	major: {
		type: String,
		trim: true
	},
	graduationYear: {
		type: Number
	},
	resume: {
		type: String,
		trim: true
	},
	profileComplete: {
		type: Boolean,
		default: false
	},
	phone: {
		type: String,
		trim: true
	},
	skills: [{
		type: String,
		trim: true
	}],
	gpa: {
		type: String,
		trim: true
	},
	// Recruiter specific fields
	company: {
		type: String,
		trim: true
	},
	position: {
		type: String,
		trim: true
	}
}, {
	timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		return next();
	}
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user without password
userSchema.methods.toJSON = function() {
	const userObject = this.toObject();
	delete userObject.password;
	return userObject;
};

module.exports = mongoose.model('User', userSchema);

