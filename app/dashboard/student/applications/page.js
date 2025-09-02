'use client';

import { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Building } from 'lucide-react';

export default function StudentApplications() {
	const [user, setUser] = useState(null);
	const [applications, setApplications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getApplications = async () => {
			try {
				const cookieValue = document.cookie
					.split('; ')
					.find((row) => row.startsWith('user_session='));

				if (cookieValue) {
					const userData = JSON.parse(
						decodeURIComponent(cookieValue.split('=')[1])
					);
					setUser(userData);

					const response = await fetch(
						`/api/applications?student=${userData.id}`
					);
					if (response.ok) {
						const apps = await response.json();
						setApplications(apps);
					}
				}
			} catch (error) {
				console.error('Error fetching applications:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getApplications();
	}, []);

	const getStatusBadge = (status) => {
		switch (status) {
			case 'Pending':
				return <Badge variant='secondary'>Pending</Badge>;
			case 'Interview Scheduled':
				return <Badge variant='default'>Interview Scheduled</Badge>;
			case 'Rejected':
				return <Badge variant='destructive'>Rejected</Badge>;
			default:
				return <Badge variant='outline'>{status}</Badge>;
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
					<p className='mt-4 text-gray-600'>
						Loading applications...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
				<div className='relative flex items-center justify-between'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold'>
							My Applications 📋
						</h1>
						<p className='text-blue-100 text-lg'>
							Track the status of all your job applications
						</p>
					</div>
					<div className='hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3'>
						<FileText className='h-5 w-5 text-blue-300' />
						<span className='text-sm font-medium'>
							{applications.length} Applications
						</span>
					</div>
				</div>
			</div>

			{applications.length > 0 ? (
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<FileText className='mr-2 h-5 w-5' />
							Application History
						</CardTitle>
						<CardDescription>
							A complete list of all jobs you've applied for
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Job Title</TableHead>
									<TableHead>Company</TableHead>
									<TableHead>Applied Date</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{applications.map((app) => (
									<TableRow key={app.jobId}>
										<TableCell className='font-medium'>
											<div className='flex items-center'>
												<Building className='mr-2 h-4 w-4 text-gray-400' />
												{app.jobTitle}
											</div>
										</TableCell>
										<TableCell>{app.company}</TableCell>
										<TableCell>
											<div className='flex items-center'>
												<Calendar className='mr-2 h-4 w-4 text-gray-400' />
												{new Date(
													app.appliedDate
												).toLocaleDateString()}
											</div>
										</TableCell>
										<TableCell>
											{getStatusBadge(app.status)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardContent className='flex flex-col items-center justify-center py-16'>
						<FileText className='h-16 w-16 text-gray-400 mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							No applications yet
						</h3>
						<p className='text-gray-600 text-center mb-6'>
							You haven't applied to any jobs yet. Start browsing
							available opportunities and submit your first
							application.
						</p>
						<a
							href='/dashboard/student/jobs'
							className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
						>
							Browse Jobs
						</a>
					</CardContent>
				</Card>
			)}

			{/* Application Statistics */}
			{applications.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center'>
								<div className='flex-1'>
									<p className='text-sm font-medium text-gray-600'>
										Pending
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{
											applications.filter(
												(app) =>
													app.status === 'Pending'
											).length
										}
									</p>
								</div>
								<div className='h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center'>
									<div className='h-3 w-3 bg-yellow-500 rounded-full'></div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center'>
								<div className='flex-1'>
									<p className='text-sm font-medium text-gray-600'>
										Interview Scheduled
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{
											applications.filter(
												(app) =>
													app.status ===
													'Interview Scheduled'
											).length
										}
									</p>
								</div>
								<div className='h-8 w-8 bg-green-100 rounded-full flex items-center justify-center'>
									<div className='h-3 w-3 bg-green-500 rounded-full'></div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center'>
								<div className='flex-1'>
									<p className='text-sm font-medium text-gray-600'>
										Rejected
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{
											applications.filter(
												(app) =>
													app.status === 'Rejected'
											).length
										}
									</p>
								</div>
								<div className='h-8 w-8 bg-red-100 rounded-full flex items-center justify-center'>
									<div className='h-3 w-3 bg-red-500 rounded-full'></div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
