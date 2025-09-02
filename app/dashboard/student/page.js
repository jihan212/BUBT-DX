'use client';

import { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
	User,
	FileText,
	Briefcase,
	CheckCircle,
	Clock,
	XCircle,
	TrendingUp,
	Target,
	Calendar,
	Award,
	ArrowRight,
	Plus,
	Eye,
	Building,
	MapPin,
} from 'lucide-react';

export default function StudentDashboard() {
	const [user, setUser] = useState(null);
	const [applications, setApplications] = useState([]);
	const [stats, setStats] = useState({
		totalApplications: 0,
		pendingApplications: 0,
		acceptedApplications: 0,
		rejectedApplications: 0,
	});

	useEffect(() => {
		const getUserData = async () => {
			try {
				// Get user from cookie
				const cookieValue = document.cookie
					.split('; ')
					.find((row) => row.startsWith('user_session='));

				if (cookieValue) {
					const userData = JSON.parse(
						decodeURIComponent(cookieValue.split('=')[1])
					);
					setUser(userData);

					// Fetch applications
					const response = await fetch(
						`/api/applications?student=${userData.id}`
					);
					if (response.ok) {
						const apps = await response.json();
						setApplications(apps);

						// Calculate stats
						const total = apps.length;
						const pending = apps.filter(
							(app) => app.status === 'Pending'
						).length;
						const accepted = apps.filter(
							(app) => app.status === 'Interview Scheduled'
						).length;
						const rejected = apps.filter(
							(app) => app.status === 'Rejected'
						).length;

						setStats({
							totalApplications: total,
							pendingApplications: pending,
							acceptedApplications: accepted,
							rejectedApplications: rejected,
						});
					}
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		getUserData();
	}, []);

	const recentApplications = applications.slice(0, 3);

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
				<div className='relative flex items-center justify-between'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold'>
							Welcome back, {user?.name || 'Student'}! 👋
						</h1>
						<p className='text-blue-100 text-lg'>
							Ready to take the next step in your career journey?
						</p>
					</div>
					<div className='hidden md:flex space-x-3'>
						<Link href='/dashboard/student/jobs'>
							<Button
								size='lg'
								variant='secondary'
								className='bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
							>
								<Briefcase className='mr-2 h-5 w-5' />
								Browse Jobs
							</Button>
						</Link>
						<Link href='/dashboard/student/profile'>
							<Button
								size='lg'
								variant='outline'
								className='border-white/30 text-white hover:bg-white/10'
							>
								<User className='mr-2 h-5 w-5' />
								My Profile
							</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-blue-700'>
									Total Applications
								</p>
								<p className='text-3xl font-bold text-blue-900'>
									{stats.totalApplications}
								</p>
								<p className='text-xs text-blue-600'>
									Jobs you've applied to
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center'>
								<FileText className='h-6 w-6 text-blue-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-amber-700'>
									Pending Review
								</p>
								<p className='text-3xl font-bold text-amber-900'>
									{stats.pendingApplications}
								</p>
								<p className='text-xs text-amber-600'>
									Awaiting response
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-amber-200 flex items-center justify-center'>
								<Clock className='h-6 w-6 text-amber-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-green-700'>
									Interviews
								</p>
								<p className='text-3xl font-bold text-green-900'>
									{stats.acceptedApplications}
								</p>
								<p className='text-xs text-green-600'>
									Scheduled interviews
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-green-200 flex items-center justify-center'>
								<CheckCircle className='h-6 w-6 text-green-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-red-700'>
									Not Selected
								</p>
								<p className='text-3xl font-bold text-red-900'>
									{stats.rejectedApplications}
								</p>
								<p className='text-xs text-red-600'>
									Applications declined
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-red-200 flex items-center justify-center'>
								<XCircle className='h-6 w-6 text-red-700' />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions & Profile Status */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Profile Status */}
				<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
					<CardHeader className='pb-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<div className='h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
									<User className='h-5 w-5 text-white' />
								</div>
								<div>
									<CardTitle className='text-lg'>
										Profile Status
									</CardTitle>
									<CardDescription>
										Enhance your visibility to recruiters
									</CardDescription>
								</div>
							</div>
							<Badge
								variant={
									user?.profileComplete
										? 'default'
										: 'secondary'
								}
								className='px-3 py-1'
							>
								{user?.profileComplete
									? 'Complete'
									: 'Incomplete'}
							</Badge>
						</div>
					</CardHeader>
					<CardContent className='pt-0'>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<span className='text-sm font-medium'>
									Profile Completion
								</span>
								<span className='text-sm font-bold text-blue-600'>
									{user?.profileComplete ? '100%' : '75%'}
								</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-3'>
								<div
									className='bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500'
									style={{
										width: user?.profileComplete
											? '100%'
											: '75%',
									}}
								></div>
							</div>
							{!user?.profileComplete && (
								<div className='bg-amber-50 border border-amber-200 rounded-lg p-3'>
									<p className='text-sm text-amber-700'>
										💡 Add your resume and skills to
										complete your profile and get noticed by
										more recruiters!
									</p>
								</div>
							)}
							<Link href='/dashboard/student/profile'>
								<Button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'>
									<User className='mr-2 h-4 w-4' />
									{user?.profileComplete
										? 'Update Profile'
										: 'Complete Profile'}
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				{/* Quick Actions */}
				<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
					<CardHeader className='pb-4'>
						<div className='flex items-center space-x-3'>
							<div className='h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center'>
								<Target className='h-5 w-5 text-white' />
							</div>
							<div>
								<CardTitle className='text-lg'>
									Quick Actions
								</CardTitle>
								<CardDescription>
									Fast track your job search
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className='pt-0'>
						<div className='grid grid-cols-2 gap-3'>
							<Link href='/dashboard/student/jobs'>
								<Button
									variant='outline'
									className='w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200'
								>
									<Briefcase className='h-5 w-5 text-blue-600' />
									<span className='text-sm font-medium'>
										Browse Jobs
									</span>
								</Button>
							</Link>
							<Link href='/dashboard/student/applications'>
								<Button
									variant='outline'
									className='w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200'
								>
									<FileText className='h-5 w-5 text-green-600' />
									<span className='text-sm font-medium'>
										My Applications
									</span>
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Applications */}
			<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
				<CardHeader className='pb-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center'>
								<Calendar className='h-5 w-5 text-white' />
							</div>
							<div>
								<CardTitle className='text-lg'>
									Recent Applications
								</CardTitle>
								<CardDescription>
									Track your latest job applications
								</CardDescription>
							</div>
						</div>
						<Link href='/dashboard/student/applications'>
							<Button
								variant='ghost'
								size='sm'
								className='text-blue-600 hover:text-blue-700'
							>
								View All <ArrowRight className='ml-1 h-4 w-4' />
							</Button>
						</Link>
					</div>
				</CardHeader>
				<CardContent className='pt-0'>
					{recentApplications.length > 0 ? (
						<div className='space-y-3'>
							{recentApplications.map((app) => (
								<div
									key={app.jobId}
									className='flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 border border-gray-100'
								>
									<div className='flex items-center space-x-4'>
										<div className='h-12 w-12 rounded-lg bg-white shadow-sm flex items-center justify-center'>
											<Building className='h-6 w-6 text-gray-600' />
										</div>
										<div>
											<h4 className='font-semibold text-gray-900'>
												{app.jobTitle}
											</h4>
											<p className='text-sm text-gray-600 flex items-center'>
												<Building className='h-3 w-3 mr-1' />
												{app.company}
											</p>
											<p className='text-xs text-gray-500 flex items-center mt-1'>
												<Calendar className='h-3 w-3 mr-1' />
												Applied on {app.appliedDate}
											</p>
										</div>
									</div>
									<div className='text-right'>
										<Badge
											variant={
												app.status === 'Pending'
													? 'secondary'
													: app.status ===
													  'Interview Scheduled'
													? 'default'
													: 'destructive'
											}
											className='font-medium'
										>
											{app.status ===
											'Interview Scheduled'
												? '🎉 Interview!'
												: app.status === 'Pending'
												? '⏳ Pending'
												: '❌ Rejected'}
										</Badge>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-12'>
							<div className='w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4'>
								<Briefcase className='h-10 w-10 text-blue-600' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Ready to start your journey? 🚀
							</h3>
							<p className='text-gray-600 mb-6 max-w-sm mx-auto'>
								Discover amazing job opportunities and take the
								first step towards your dream career.
							</p>
							<Link href='/dashboard/student/jobs'>
								<Button
									size='lg'
									className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
								>
									<Plus className='mr-2 h-4 w-4' />
									Find Your First Job
								</Button>
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
