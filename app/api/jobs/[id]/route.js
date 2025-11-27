import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Proxy job by ID requests to backend
export async function GET(request, { params }) {
	try {
		const backendResponse = await fetch(`${BACKEND_URL}/jobs/${params.id}`, {
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
		console.error('Job GET proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function PUT(request, { params }) {
	try {
		const jobData = await request.json();

		const backendResponse = await fetch(`${BACKEND_URL}/jobs/${params.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(jobData),
		});

		const data = await backendResponse.json();

		if (!backendResponse.ok) {
			return NextResponse.json(data, { status: backendResponse.status });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error('Job PUT proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function DELETE(request, { params }) {
	try {
		const backendResponse = await fetch(`${BACKEND_URL}/jobs/${params.id}`, {
			method: 'DELETE',
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
		console.error('Job DELETE proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
