import { users } from '@/lib/data';
import { NextResponse } from 'next/server';

// GET /api/users - Get all users (admin only)
export async function GET(request) {
	try {
		const allUsers = [
			...users.students.map((user) => ({ ...user, role: 'student' })),
			...users.recruiters.map((user) => ({ ...user, role: 'recruiter' })),
			{ ...users.admin, role: 'admin' },
		];

		return NextResponse.json(allUsers);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
