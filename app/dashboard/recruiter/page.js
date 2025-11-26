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
	Briefcase,
	Users,
	FileText,
	TrendingUp,
	Calendar,
	Building,
	Plus,
	ArrowRight,
	Target,
	Clock,
	CheckCircle,
	Eye,
	MapPin,
	DollarSign,
} from 'lucide-react';

export default function RecruiterDashboard() {
	const [user, setUser] = useState(null);
	const [jobs, setJobs] = useState([]);
	const [stats, setStats] = useState({
		totalJobs: 0,
		totalApplications: 0,
		pendingApplications: 0,
		recentApplications: 0,
	});

	useEffect(() => {
		const getDashboardData = async () => {
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

					// Get recruiter's jobs
					const jobsResponse = await fetch(
						`/api/jobs?recruiter=${userData.id}`
					);
					if (jobsResponse.ok) {
						const jobsData = await jobsResponse.json();
						setJobs(jobsData);

						// Calculate stats
						const totalJobs = jobsData.length;
						const totalApplications = jobsData.reduce(
							(sum, job) => sum + (job.applications?.length || 0),
							0
						);
						const pendingApplications = jobsData.reduce(
							(sum, job) =>
								sum +
								(job.applications?.filter(
									(app) => app.status === 'Pending'
								).length || 0),
							0
						);
						const recentApplications = jobsData.reduce(
							(sum, job) =>
								sum +
								(job.applications?.filter((app) => {
									const appDate = new Date(app.appliedDate);
									const weekAgo = new Date();
									weekAgo.setDate(weekAgo.getDate() - 7);
									return appDate >= weekAgo;
								}).length || 0),
							0
						);

						setStats({
							totalJobs,
							totalApplications,
							pendingApplications,
							recentApplications,
						});
					}
				}
			} catch (error) {
				console.error('Error fetching dashboard data:', error);
			}
		};

		getDashboardData();
	}, []);

	const recentJobs = jobs.slice(0, 3);

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 p-8 text-white'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M30 30l15-15v30z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
				<div className='relative flex items-center justify-between'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold'>
							Welcome back, {user?.name || 'Recruiter'}! 🎯
						</h1>
						<p className='text-green-100 text-lg'>
							Find the perfect candidates for your team
						</p>
					</div>
					<div className='hidden md:flex space-x-3'>
						<Link href='/dashboard/recruiter/jobs/new'>
							<Button
								size='lg'
								variant='secondary'
								className='bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
							>
								<Plus className='mr-2 h-5 w-5' />
								Post New Job
							</Button>
						</Link>
						<Link href='/dashboard/recruiter/applicants'>
							<Button
								size='lg'
								variant='secondary'
								className='bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
							>
								<Users className='mr-2 h-5 w-5' />
								View Applicants
							</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<Card className='border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-emerald-700'>
									Active Jobs
								</p>
								<p className='text-3xl font-bold text-emerald-900'>
									{stats.totalJobs}
								</p>
								<p className='text-xs text-emerald-600'>
									Job postings created
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-emerald-200 flex items-center justify-center'>
								<Briefcase className='h-6 w-6 text-emerald-700' />
							</div>
						</div>
					</CardContent>
				</Card>

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
									Applications received
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
									Need your attention
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-amber-200 flex items-center justify-center'>
								<Clock className='h-6 w-6 text-amber-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-purple-700'>
									This Week
								</p>
								<p className='text-3xl font-bold text-purple-900'>
									{stats.recentApplications}
								</p>
								<p className='text-xs text-purple-600'>
									New applications
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center'>
								<TrendingUp className='h-6 w-6 text-purple-700' />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions & Job Management */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Quick Actions */}
				<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
					<CardHeader className='pb-4'>
						<div className='flex items-center space-x-3'>
							<div className='h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center'>
								<Target className='h-5 w-5 text-white' />
							</div>
							<div>
								<CardTitle className='text-lg'>
									Quick Actions
								</CardTitle>
								<CardDescription>
									Manage your hiring process efficiently
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className='pt-0'>
						<div className='grid grid-cols-2 gap-3'>
							<Link href='/dashboard/recruiter/jobs/new'>
								<Button
									variant='outline'
									className='w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200'
								>
									<Plus className='h-5 w-5 text-green-600' />
									<span className='text-sm font-medium'>
										Post Job
									</span>
								</Button>
							</Link>
							<Link href='/dashboard/recruiter/applicants'>
								<Button
									variant='outline'
									className='w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200'
								>
									<Users className='h-5 w-5 text-blue-600' />
									<span className='text-sm font-medium'>
										View Applicants
									</span>
								</Button>
							</Link>
							<Link href='/dashboard/recruiter/jobs'>
								<Button
									variant='outline'
									className='w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200'
								>
									<Briefcase className='h-5 w-5 text-purple-600' />
									<span className='text-sm font-medium'>
										Manage Jobs
									</span>
								</Button>
							</Link>
							<Link href='/dashboard/recruiter/applicants'>
								<Button
									variant='outline'
									className='w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200'
								>
									<Eye className='h-5 w-5 text-orange-600' />
									<span className='text-sm font-medium'>
										Review Apps
									</span>
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				{/* Hiring Pipeline */}
				<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
					<CardHeader className='pb-4'>
						<div className='flex items-center space-x-3'>
							<div className='h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center'>
								<TrendingUp className='h-5 w-5 text-white' />
							</div>
							<div>
								<CardTitle className='text-lg'>
									Hiring Pipeline
								</CardTitle>
								<CardDescription>
									Track your recruitment progress
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className='pt-0'>
						<div className='space-y-4'>
							<div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg'>
								<div className='flex items-center space-x-3'>
									<div className='h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center'>
										<Clock className='h-4 w-4 text-blue-700' />
									</div>
									<span className='font-medium text-blue-900'>
										Pending Review
									</span>
								</div>
								<Badge className='bg-blue-100 text-blue-800'>
									{stats.pendingApplications}
								</Badge>
							</div>
							<div className='flex items-center justify-between p-3 bg-green-50 rounded-lg'>
								<div className='flex items-center space-x-3'>
									<div className='h-8 w-8 rounded-full bg-green-200 flex items-center justify-center'>
										<CheckCircle className='h-4 w-4 text-green-700' />
									</div>
									<span className='font-medium text-green-900'>
										Active Jobs
									</span>
								</div>
								<Badge className='bg-green-100 text-green-800'>
									{stats.totalJobs}
								</Badge>
							</div>
							<div className='flex items-center justify-between p-3 bg-purple-50 rounded-lg'>
								<div className='flex items-center space-x-3'>
									<div className='h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center'>
										<TrendingUp className='h-4 w-4 text-purple-700' />
									</div>
									<span className='font-medium text-purple-900'>
										This Week
									</span>
								</div>
								<Badge className='bg-purple-100 text-purple-800'>
									{stats.recentApplications}
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Job Postings */}
			<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
				<CardHeader className='pb-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center'>
								<Calendar className='h-5 w-5 text-white' />
							</div>
							<div>
								<CardTitle className='text-lg'>
									Recent Job Postings
								</CardTitle>
								<CardDescription>
									Your latest job postings and their status
								</CardDescription>
							</div>
						</div>
						<Link href='/dashboard/recruiter/jobs'>
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
					{recentJobs.length > 0 ? (
						<div className='space-y-3'>
							{recentJobs.map((job) => (
								<div
									key={job.id}
									className='flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 border border-gray-100'
								>
									<div className='flex items-center space-x-4'>
										<div className='h-12 w-12 rounded-lg bg-white shadow-sm flex items-center justify-center'>
											<Building className='h-6 w-6 text-gray-600' />
										</div>
										<div>
											<h4 className='font-semibold text-gray-900'>
												{job.title}
											</h4>
											<p className='text-sm text-gray-600 flex items-center'>
												<Building className='h-3 w-3 mr-1' />
												{job.company}
											</p>
											<p className='text-xs text-gray-500 flex items-center mt-1'>
												<Calendar className='h-3 w-3 mr-1' />
												Posted on{' '}
												{new Date(
													job.postedDate
												).toLocaleDateString()}
											</p>
										</div>
									</div>
									<div className='text-right space-y-1'>
										<Badge
											variant='default'
											className='font-medium'
										>
											{job.applications?.length || 0}{' '}
											Applications
										</Badge>
										<p className='text-xs text-gray-500'>
											{job.applications?.filter(
												(app) =>
													app.status === 'Pending'
											).length || 0}{' '}
											pending review
										</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-12'>
							<div className='w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4'>
								<Briefcase className='h-10 w-10 text-green-600' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Ready to find great talent? 🌟
							</h3>
							<p className='text-gray-600 mb-6 max-w-sm mx-auto'>
								Create your first job posting and start
								attracting qualified candidates to your team.
							</p>
							<Link href='/dashboard/recruiter/jobs/new'>
								<Button
									size='lg'
									className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
								>
									<Plus className='mr-2 h-4 w-4' />
									Post Your First Job
								</Button>
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
