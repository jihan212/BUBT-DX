import { jobs, getJobById } from '@/lib/data';
import { NextResponse } from 'next/server';

// GET /api/jobs/[id] - Get a specific job
export async function GET(request, { params }) {
	try {
		const job = getJobById(params.id);

		if (!job) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(job);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// PUT /api/jobs/[id] - Update a job
export async function PUT(request, { params }) {
	try {
		const jobIndex = jobs.findIndex((job) => job.id === params.id);

		if (jobIndex === -1) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			);
		}

		const updatedData = await request.json();
		jobs[jobIndex] = { ...jobs[jobIndex], ...updatedData };

		return NextResponse.json(jobs[jobIndex]);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// DELETE /api/jobs/[id] - Delete a job
export async function DELETE(request, { params }) {
	try {
		const jobIndex = jobs.findIndex((job) => job.id === params.id);

		if (jobIndex === -1) {
			return NextResponse.json(
				{ error: 'Job not found' },
				{ status: 404 }
			);
		}

		jobs.splice(jobIndex, 1);

		return NextResponse.json({ message: 'Job deleted successfully' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
