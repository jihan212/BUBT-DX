import { NextResponse } from 'next/server';

export function middleware(request) {
	const { pathname } = request.nextUrl;

	// Protected routes
	const protectedRoutes = [
		'/dashboard/student',
		'/dashboard/recruiter',
		'/dashboard/admin',
	];

	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

	if (isProtectedRoute) {
		const userSession = request.cookies.get('user_session');

		if (!userSession) {
			return NextResponse.redirect(new URL('/auth', request.url));
		}

		try {
			const user = JSON.parse(userSession.value);

			// Check if user has access to the specific dashboard
			if (
				pathname.startsWith('/dashboard/student') &&
				user.role !== 'student'
			) {
				return NextResponse.redirect(new URL('/auth', request.url));
			}

			if (
				pathname.startsWith('/dashboard/recruiter') &&
				user.role !== 'recruiter'
			) {
				return NextResponse.redirect(new URL('/auth', request.url));
			}

			if (
				pathname.startsWith('/dashboard/admin') &&
				user.role !== 'admin'
			) {
				return NextResponse.redirect(new URL('/auth', request.url));
			}
		} catch (error) {
			return NextResponse.redirect(new URL('/auth', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
