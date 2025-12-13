import { NextResponse } from 'next/server';

// Use server-side env var first, then fallback to NEXT_PUBLIC_API_URL, then localhost
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Proxy applications requests to backend
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const studentId = searchParams.get('student');
		const jobId = searchParams.get('job');

		let endpoint;
		if (studentId) {
			endpoint = `${BACKEND_URL}/applications?student=${studentId}`;
		} else if (jobId) {
			endpoint = `${BACKEND_URL}/applications?job=${jobId}`;
		} else {
			return NextResponse.json(
				{ error: 'Student ID or Job ID is required' },
				{ status: 400 }
			);
		}

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
		console.error('Applications GET proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function POST(request) {
	try {
		const body = await request.json();

		const backendResponse = await fetch(`${BACKEND_URL}/applications`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		const data = await backendResponse.json();

		if (!backendResponse.ok) {
			return NextResponse.json(data, { status: backendResponse.status });
		}

		return NextResponse.json(data, { status: backendResponse.status });
	} catch (error) {
		console.error('Applications POST proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function PUT(request) {
	try {
		const body = await request.json();

		const backendResponse = await fetch(`${BACKEND_URL}/applications`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		const data = await backendResponse.json();

		if (!backendResponse.ok) {
			return NextResponse.json(data, { status: backendResponse.status });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error('Applications PUT proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
