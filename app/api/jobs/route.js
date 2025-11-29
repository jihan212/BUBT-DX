import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Proxy jobs requests to backend
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const recruiterId = searchParams.get('recruiter');

		const endpoint = recruiterId 
			? `${BACKEND_URL}/jobs?recruiter=${recruiterId}`
			: `${BACKEND_URL}/jobs`;

		const backendResponse = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await backendResponse.json();

		if (!backendResponse.ok) {
			return NextResponse.json(data, { status: backendResponse.status });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error('Jobs GET proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function POST(request) {
	try {
		const jobData = await request.json();
		const { searchParams } = new URL(request.url);
		const recruiterId = searchParams.get('postedBy') || searchParams.get('recruiter');

		if (!recruiterId) {
			return NextResponse.json(
				{ error: 'Recruiter ID is required' },
				{ status: 400 }
			);
		}

		const backendResponse = await fetch(`${BACKEND_URL}/jobs?postedBy=${recruiterId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(jobData),
		});

		const data = await backendResponse.json();

		if (!backendResponse.ok) {
			return NextResponse.json(data, { status: backendResponse.status });
		}

		return NextResponse.json(data, { status: backendResponse.status });
	} catch (error) {
		console.error('Jobs POST proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
