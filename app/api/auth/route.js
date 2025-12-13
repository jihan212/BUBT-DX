import { NextResponse } from 'next/server';

// Use server-side env var first, then fallback to NEXT_PUBLIC_API_URL, then localhost
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Proxy login request to backend
export async function POST(request) {
	try {
		const body = await request.json();

		const backendResponse = await fetch(`${BACKEND_URL}/auth/login`, {
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

		// Create response with user data
		const response = NextResponse.json(data);

		// Set a simple cookie for session management (non-httpOnly for demo purposes)
		response.cookies.set(
			'user_session',
			JSON.stringify(data.user),
			{
				httpOnly: false, // Allow client-side access for demo
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			}
		);

		return response;
	} catch (error) {
		console.error('Auth proxy error:', error);
		console.error('BACKEND_URL:', BACKEND_URL);
		return NextResponse.json(
			{ 
				error: 'Internal server error',
				details: process.env.NODE_ENV === 'development' ? error.message : undefined
			},
			{ status: 500 }
		);
	}
}

// Proxy register request to backend
export async function PUT(request) {
	try {
		const body = await request.json();

		const backendResponse = await fetch(`${BACKEND_URL}/auth/register`, {
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

		// Create response with user data
		const response = NextResponse.json(data);

		// Set session cookie after registration
		response.cookies.set(
			'user_session',
			JSON.stringify(data.user),
			{
				httpOnly: false,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			}
		);

		return response;
	} catch (error) {
		console.error('Register proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function DELETE() {
	// Logout endpoint - clear cookie
	const response = NextResponse.json({ message: 'Logged out successfully' });
	response.cookies.set('user_session', '', {
		httpOnly: false,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 0,
	});
	return response;
}
