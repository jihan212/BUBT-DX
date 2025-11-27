const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');

// GET /api/jobs - Get all jobs or jobs by recruiter
router.get('/', async (req, res) => {
	try {
		const { recruiter } = req.query;

		let jobs;
		if (recruiter) {
			jobs = await Job.find({ postedBy: recruiter })
				.populate('postedBy', 'name email company')
				.sort({ postedDate: -1 });
		} else {
			jobs = await Job.find()
				.populate('postedBy', 'name email company')
				.sort({ postedDate: -1 });
		}

		// Format jobs to match frontend expectations
		const formattedJobs = jobs.map(job => ({
			id: job._id.toString(),
			title: job.title,
			company: job.company,
			description: job.description,
			requirements: job.requirements,
			benefits: job.benefits,
			department: job.department,
			type: job.type,
			location: job.location,
			salary: job.salary,
			skills: job.skills || [],
			postedBy: job.postedBy._id.toString(),
			postedDate: job.postedDate.toISOString().split('T')[0],
			applicationDeadline: job.applicationDeadline ? job.applicationDeadline.toISOString().split('T')[0] : null,
			applications: job.applications.map(app => ({
				id: app._id.toString(),
				studentId: app.studentId.toString(),
				studentName: app.studentName,
				studentEmail: app.studentEmail,
				appliedDate: app.appliedDate.toISOString().split('T')[0],
				status: app.status,
				coverLetter: app.coverLetter
			}))
		}));

		res.json(formattedJobs);
	} catch (error) {
		console.error('Get jobs error:', error);
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// GET /api/jobs/:id - Get specific job
router.get('/:id', async (req, res) => {
	try {
		const job = await Job.findById(req.params.id)
			.populate('postedBy', 'name email company');

		if (!job) {
			return res.status(404).json({
				error: 'Job not found'
			});
		}

		// Format job to match frontend expectations
		const formattedJob = {
			id: job._id.toString(),
			title: job.title,
			company: job.company,
			description: job.description,
			requirements: job.requirements,
			benefits: job.benefits,
			department: job.department,
			type: job.type,
			location: job.location,
			salary: job.salary,
			skills: job.skills || [],
			postedBy: job.postedBy._id.toString(),
			postedDate: job.postedDate.toISOString().split('T')[0],
			applicationDeadline: job.applicationDeadline ? job.applicationDeadline.toISOString().split('T')[0] : null,
			applications: job.applications.map(app => ({
				id: app._id.toString(),
				studentId: app.studentId.toString(),
				studentName: app.studentName,
				studentEmail: app.studentEmail,
				appliedDate: app.appliedDate.toISOString().split('T')[0],
				status: app.status,
				coverLetter: app.coverLetter
			}))
		};

		res.json(formattedJob);
	} catch (error) {
		console.error('Get job error:', error);
		if (error.name === 'CastError') {
			return res.status(404).json({
				error: 'Job not found'
			});
		}
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// POST /api/jobs - Create a new job
router.post('/', async (req, res) => {
	try {
		const { postedBy } = req.query;

		if (!postedBy) {
			return res.status(400).json({
				error: 'Recruiter ID is required as query parameter'
			});
		}

		const jobData = {
			...req.body,
			postedBy
		};

		if (req.body.applicationDeadline) {
			jobData.applicationDeadline = new Date(req.body.applicationDeadline);
		}

		const job = new Job(jobData);
		await job.save();

		const populatedJob = await Job.findById(job._id)
			.populate('postedBy', 'name email company');

		res.status(201).json({
			id: populatedJob._id.toString(),
			title: populatedJob.title,
			company: populatedJob.company,
			description: populatedJob.description,
			requirements: populatedJob.requirements,
			benefits: populatedJob.benefits,
			department: populatedJob.department,
			type: populatedJob.type,
			location: populatedJob.location,
			salary: populatedJob.salary,
			skills: populatedJob.skills || [],
			postedBy: populatedJob.postedBy._id.toString(),
			postedDate: populatedJob.postedDate.toISOString().split('T')[0],
			applicationDeadline: populatedJob.applicationDeadline ? populatedJob.applicationDeadline.toISOString().split('T')[0] : null,
			applications: []
		});
	} catch (error) {
		console.error('Create job error:', error);
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// PUT /api/jobs/:id - Update a job
router.put('/:id', async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);

		if (!job) {
			return res.status(404).json({
				error: 'Job not found'
			});
		}

		// Update job fields
		Object.keys(req.body).forEach(key => {
			if (key !== 'postedBy' && key !== 'applications' && key !== '_id') {
				job[key] = req.body[key];
			}
		});

		if (req.body.applicationDeadline) {
			job.applicationDeadline = new Date(req.body.applicationDeadline);
		}

		await job.save();

		const populatedJob = await Job.findById(job._id)
			.populate('postedBy', 'name email company');

		res.json({
			id: populatedJob._id.toString(),
			title: populatedJob.title,
			company: populatedJob.company,
			description: populatedJob.description,
			requirements: populatedJob.requirements,
			benefits: populatedJob.benefits,
			department: populatedJob.department,
			type: populatedJob.type,
			location: populatedJob.location,
			salary: populatedJob.salary,
			skills: populatedJob.skills || [],
			postedBy: populatedJob.postedBy._id.toString(),
			postedDate: populatedJob.postedDate.toISOString().split('T')[0],
			applicationDeadline: populatedJob.applicationDeadline ? populatedJob.applicationDeadline.toISOString().split('T')[0] : null,
			applications: populatedJob.applications.map(app => ({
				id: app._id.toString(),
				studentId: app.studentId.toString(),
				studentName: app.studentName,
				studentEmail: app.studentEmail,
				appliedDate: app.appliedDate.toISOString().split('T')[0],
				status: app.status,
				coverLetter: app.coverLetter
			}))
		});
	} catch (error) {
		console.error('Update job error:', error);
		if (error.name === 'CastError') {
			return res.status(404).json({
				error: 'Job not found'
			});
		}
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);

		if (!job) {
			return res.status(404).json({
				error: 'Job not found'
			});
		}

		await Job.findByIdAndDelete(req.params.id);

		res.json({
			message: 'Job deleted successfully'
		});
	} catch (error) {
		console.error('Delete job error:', error);
		if (error.name === 'CastError') {
			return res.status(404).json({
				error: 'Job not found'
			});
		}
		res.status(500).json({
			error: 'Internal server error'
		});
	}
});

module.exports = router;

