import { users } from '@/lib/data';
import { NextResponse } from 'next/server';

// GET /api/users/[id] - Get a specific user
export async function GET(request, { params }) {
	try {
		// Find user in students
		let user = users.students.find((s) => s.id === params.id);
		if (user) {
			return NextResponse.json({ ...user, role: 'student' });
		}

		// Find user in recruiters
		user = users.recruiters.find((r) => r.id === params.id);
		if (user) {
			return NextResponse.json({ ...user, role: 'recruiter' });
		}

		// Check admin
		if (users.admin.id === params.id) {
			return NextResponse.json({ ...users.admin, role: 'admin' });
		}

		return NextResponse.json({ error: 'User not found' }, { status: 404 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// PUT /api/users/[id] - Update a user profile
export async function PUT(request, { params }) {
	try {
		const updatedData = await request.json();

		// Find and update student
		let userIndex = users.students.findIndex((s) => s.id === params.id);
		if (userIndex !== -1) {
			users.students[userIndex] = {
				...users.students[userIndex],
				...updatedData,
			};
			return NextResponse.json({
				...users.students[userIndex],
				role: 'student',
			});
		}

		// Find and update recruiter
		userIndex = users.recruiters.findIndex((r) => r.id === params.id);
		if (userIndex !== -1) {
			users.recruiters[userIndex] = {
				...users.recruiters[userIndex],
				...updatedData,
			};
			return NextResponse.json({
				...users.recruiters[userIndex],
				role: 'recruiter',
			});
		}

		// Update admin
		if (users.admin.id === params.id) {
			users.admin = { ...users.admin, ...updatedData };
			return NextResponse.json({ ...users.admin, role: 'admin' });
		}

		return NextResponse.json({ error: 'User not found' }, { status: 404 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
