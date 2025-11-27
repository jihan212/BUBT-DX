// This model is kept for reference, but applications are embedded in Job model
// Keeping it here for potential future normalization

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
	jobId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job',
		required: true
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	status: {
		type: String,
		enum: ['Pending', 'Reviewed', 'Interview', 'Accepted', 'Rejected'],
		default: 'Pending'
	},
	coverLetter: {
		type: String,
		trim: true
	},
	appliedDate: {
		type: Date,
		default: Date.now
	}
}, {
	timestamps: true
});

// Prevent duplicate applications
applicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);

