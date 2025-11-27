const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	studentName: {
		type: String,
		required: true
	},
	studentEmail: {
		type: String,
		required: true
	},
	appliedDate: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		enum: ['Pending', 'Reviewed', 'Interview', 'Accepted', 'Rejected'],
		default: 'Pending'
	},
	coverLetter: {
		type: String,
		trim: true
	}
}, {
	timestamps: true
});

const jobSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	company: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true
	},
	requirements: {
		type: String,
		required: true
	},
	benefits: {
		type: String
	},
	department: {
		type: String,
		trim: true
	},
	type: {
		type: String,
		enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
		required: true
	},
	location: {
		type: String,
		required: true,
		trim: true
	},
	salary: {
		type: String,
		trim: true
	},
	skills: [{
		type: String,
		trim: true
	}],
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	postedDate: {
		type: Date,
		default: Date.now
	},
	applicationDeadline: {
		type: Date
	},
	applications: [applicationSchema]
}, {
	timestamps: true
});

// Index for better query performance
jobSchema.index({ postedBy: 1 });
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

module.exports = mongoose.model('Job', jobSchema);

