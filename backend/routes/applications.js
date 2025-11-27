const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');

// GET /api/applications - Get applications by student or job
router.get('/', async (req, res) => {
	try {
		const { student, job } = req.query;

		if (student) {
			// Get all applications for a specific student
			const jobs = await Job.find({
				'applications.studentId': student
			}).populate('postedBy', 'name email company');

			const applications = [];
			jobs.forEach(jobDoc => {
				const application = jobDoc.applications.find(
					app => app.studentId.toString() === student
				);
				if (application) {
					applications.push({
						jobId: jobDoc._id.toString(),
						jobTitle: jobDoc.title,
						company: jobDoc.company,
						appliedDate: application.appliedDate.toISOString().split('T')[0],
						status: application.status
					});
				}
			});

			res.json(applications);
		} else if (job) {
			// Get all applications for a specific job
			const jobDoc = await Job.findById(job)
				.populate('applications.studentId', 'name email major graduationYear resume skills gpa');

			if (!jobDoc) {
				return res.status(404).json({
					error: 'Job not found'
				});
			}

			const applications = jobDoc.applications.map(app => {
				const student = app.studentId;
				return {
					id: app._id.toString(),
					studentId: student._id.toString(),
					studentName: student.name,
					studentMajor: student.major || 'Unknown',
					studentEmail: student.email,
					studentResume: student.resume || '',
					appliedDate: app.appliedDate.toISOString().split('T')[0],
					status: app.status,
					coverLetter: app.coverLetter
				};
			});

			res.json(applications);
		} else {
			res.status(400).json({
				error: 'Student ID or Job ID is required'
			});
		}
	} catch (error) {
		console.error('Get applications error:', error);
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// POST /api/applications - Apply for a job
router.post('/', async (req, res) => {
	try {
		const { jobId, studentId, coverLetter } = req.body;

		if (!jobId || !studentId) {
			return res.status(400).json({
				error: 'Job ID and Student ID are required'
			});
		}

		const job = await Job.findById(jobId);

		if (!job) {
			return res.status(404).json({
				error: 'Job not found'
			});
		}

		// Check if student already applied
		const existingApplication = job.applications.find(
			app => app.studentId.toString() === studentId
		);

		if (existingApplication) {
			return res.status(400).json({
				error: 'Already applied for this job'
			});
		}

		// Get student info
		const student = await User.findById(studentId);

		if (!student) {
			return res.status(404).json({
				error: 'Student not found'
			});
		}

		// Create new application
		const newApplication = {
			studentId: studentId,
			studentName: student.name,
			studentEmail: student.email,
			appliedDate: new Date(),
			status: 'Pending',
			coverLetter: coverLetter || ''
		};

		job.applications.push(newApplication);
		await job.save();

		const savedApplication = job.applications[job.applications.length - 1];

		res.status(201).json({
			id: savedApplication._id.toString(),
			studentId: savedApplication.studentId.toString(),
			studentName: savedApplication.studentName,
			studentEmail: savedApplication.studentEmail,
			appliedDate: savedApplication.appliedDate.toISOString().split('T')[0],
			status: savedApplication.status,
			coverLetter: savedApplication.coverLetter
		});
	} catch (error) {
		console.error('Apply for job error:', error);
		if (error.name === 'CastError') {
			return res.status(404).json({
				error: 'Invalid ID format'
			});
		}
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// PUT /api/applications - Update application status
router.put('/', async (req, res) => {
	try {
		const { applicationId, jobId, status } = req.body;

		if (!applicationId || !jobId || !status) {
			return res.status(400).json({
				error: 'Application ID, Job ID, and status are required'
			});
		}

		const validStatuses = ['Pending', 'Reviewed', 'Interview', 'Accepted', 'Rejected'];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({
				error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
			});
		}

		const job = await Job.findById(jobId);

		if (!job) {
			return res.status(404).json({
				error: 'Job not found'
			});
		}

		const application = job.applications.id(applicationId);

		if (!application) {
			return res.status(404).json({
				error: 'Application not found'
			});
		}

		application.status = status;
		await job.save();

		res.json({
			id: application._id.toString(),
			studentId: application.studentId.toString(),
			studentName: application.studentName,
			studentEmail: application.studentEmail,
			appliedDate: application.appliedDate.toISOString().split('T')[0],
			status: application.status,
			coverLetter: application.coverLetter
		});
	} catch (error) {
		console.error('Update application error:', error);
		if (error.name === 'CastError') {
			return res.status(404).json({
				error: 'Invalid ID format'
			});
		}
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

module.exports = router;

