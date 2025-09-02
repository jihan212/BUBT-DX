import { getUserByEmail } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Email and password are required' },
				{ status: 400 }
			);
		}

		const user = getUserByEmail(email);

		if (!user || user.password !== password) {
			return NextResponse.json(
				{ error: 'Invalid email or password' },
				{ status: 401 }
			);
		}

		// Remove password from response
		const { password: _, ...userWithoutPassword } = user;

		// Create response with user data
		const response = NextResponse.json({
			message: 'Login successful',
			user: userWithoutPassword,
		});

		// Set a simple cookie for session management (non-httpOnly for demo purposes)
		response.cookies.set(
			'user_session',
			JSON.stringify(userWithoutPassword),
			{
				httpOnly: false, // Allow client-side access for demo
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			}
		);

		return response;
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function DELETE() {
	// Logout endpoint
	const response = NextResponse.json({ message: 'Logged out successfully' });
	response.cookies.set('user_session', '', {
		httpOnly: false, // Match login cookie settings
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 0,
	});
	return response;
}
