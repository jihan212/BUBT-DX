import { NextResponse } from 'next/server';

// Use server-side env var first, then fallback to NEXT_PUBLIC_API_URL, then localhost
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Proxy users requests to backend
export async function GET(request) {
	try {
		const backendResponse = await fetch(`${BACKEND_URL}/users`, {
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
		console.error('Users GET proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
