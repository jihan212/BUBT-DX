import { jobs, getJobsByRecruiter } from '@/lib/data';
import { NextResponse } from 'next/server';

// GET /api/jobs - Get all jobs or jobs by recruiter
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const recruiterId = searchParams.get('recruiter');

		if (recruiterId) {
			const recruiterJobs = getJobsByRecruiter(recruiterId);
			return NextResponse.json(recruiterJobs);
		}

		return NextResponse.json(jobs);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// POST /api/jobs - Create a new job
export async function POST(request) {
	try {
		const jobData = await request.json();
		const { searchParams } = new URL(request.url);
		const recruiterId = searchParams.get('recruiter');

		if (!recruiterId) {
			return NextResponse.json(
				{ error: 'Recruiter ID is required' },
				{ status: 400 }
			);
		}

		const newJob = {
			id: `job${jobs.length + 1}`,
			...jobData,
			postedBy: recruiterId,
			postedDate: new Date().toISOString().split('T')[0],
			applications: [],
		};

		jobs.push(newJob);

		return NextResponse.json(newJob, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
