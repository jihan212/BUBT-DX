import {
	jobs,
	getApplicationsByStudent,
	getApplicationsByJob,
	getJobById,
	users,
} from '@/lib/data';
import { NextResponse } from 'next/server';

// GET /api/applications - Get applications by student or job
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const studentId = searchParams.get('student');
		const jobId = searchParams.get('job');

		if (studentId) {
			const applications = getApplicationsByStudent(studentId);
			return NextResponse.json(applications);
		}

		if (jobId) {
			const applications = getApplicationsByJob(jobId);
			return NextResponse.json(applications);
		}

		return NextResponse.json(
			{ error: 'Student ID or Job ID is required' },
			{ status: 400 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// POST /api/applications - Apply for a job
export async function POST(request) {
	try {
		const { jobId, studentId } = await request.json();

		if (!jobId || !studentId) {
			return NextResponse.json(
				{ error: 'Job ID and Student ID are required' },
				{ status: 400 }
			);
		}

		const job = getJobById(jobId);
		if (!job) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			);
		}

		// Check if student already applied
		const existingApplication = job.applications.find(
			(app) => app.studentId === studentId
		);
		if (existingApplication) {
			return NextResponse.json(
				{ error: 'Already applied for this job' },
				{ status: 400 }
			);
		}

		const newApplication = {
			studentId,
			appliedDate: new Date().toISOString().split('T')[0],
			status: 'Pending',
		};

		job.applications.push(newApplication);

		return NextResponse.json(newApplication, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// PUT /api/applications - Update application status
export async function PUT(request) {
	try {
		const { applicationId, jobId, status } = await request.json();

		if (!applicationId || !jobId || !status) {
			return NextResponse.json(
				{ error: 'Application ID, Job ID, and status are required' },
				{ status: 400 }
			);
		}

		const job = getJobById(jobId);
		if (!job) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			);
		}

		const application = job.applications.find(
			(app) => app.id === applicationId
		);
		if (!application) {
			return NextResponse.json(
				{ error: 'Application not found' },
				{ status: 404 }
			);
		}

		application.status = status;

		return NextResponse.json(application);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
