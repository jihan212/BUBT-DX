'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
	Users,
	Briefcase,
	FileText,
	TrendingUp,
	UserCheck,
	Building,
	Shield,
	Activity,
	BarChart3,
	Target,
	Globe,
	Settings,
	Calendar,
	MapPin,
	DollarSign,
} from 'lucide-react';

export default function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [stats, setStats] = useState({
		totalUsers: 0,
		totalStudents: 0,
		totalRecruiters: 0,
		totalJobs: 0,
		totalApplications: 0,
	});

	useEffect(() => {
		const getAdminData = async () => {
			try {
				// Get all users
				const usersResponse = await fetch('/api/users');
				if (usersResponse.ok) {
					const usersData = await usersResponse.json();
					setUsers(usersData);
				}

				// Get all jobs
				const jobsResponse = await fetch('/api/jobs');
				if (jobsResponse.ok) {
					const jobsData = await jobsResponse.json();
					setJobs(jobsData);
				}

				// Calculate stats
				const totalUsers = users.length;
				const totalStudents = users.filter(
					(u) => u.role === 'student'
				).length;
				const totalRecruiters = users.filter(
					(u) => u.role === 'recruiter'
				).length;
				const totalJobs = jobs.length;
				const totalApplications = jobs.reduce(
					(sum, job) => sum + (job.applications?.length || 0),
					0
				);

				setStats({
					totalUsers,
					totalStudents,
					totalRecruiters,
					totalJobs,
					totalApplications,
				});
			} catch (error) {
				console.error('Error fetching admin data:', error);
			}
		};

		if (users.length > 0 || jobs.length > 0) {
			getAdminData();
		} else {
			getAdminData();
		}
	}, [users.length, jobs.length]);

	const getRoleBadge = (role) => {
		switch (role) {
			case 'student':
				return (
					<Badge className='bg-blue-100 text-blue-800 hover:bg-blue-200'>
						👨‍🎓 Student
					</Badge>
				);
			case 'recruiter':
				return (
					<Badge className='bg-green-100 text-green-800 hover:bg-green-200'>
						💼 Recruiter
					</Badge>
				);
			case 'admin':
				return (
					<Badge className='bg-red-100 text-red-800 hover:bg-red-200'>
						🛡️ Admin
					</Badge>
				);
			default:
				return <Badge variant='outline'>{role}</Badge>;
		}
	};

	const getJobTypeBadge = (type) => {
		const variants = {
			'Full-time': 'bg-emerald-100 text-emerald-800',
			'Part-time': 'bg-blue-100 text-blue-800',
			Contract: 'bg-purple-100 text-purple-800',
			Internship: 'bg-orange-100 text-orange-800',
		};
		return (
			<Badge className={variants[type] || 'bg-gray-100 text-gray-800'}>
				{type}
			</Badge>
		);
	};

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 p-8 text-white'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpolygon points="30,0 60,30 30,60 0,30"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
				<div className='relative flex items-center justify-between'>
					<div className='space-y-2'>
						<div className='flex items-center space-x-3'>
							<div className='h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
								<Shield className='h-6 w-6 text-white' />
							</div>
							<div>
								<h1 className='text-3xl font-bold'>
									Admin Dashboard 🛡️
								</h1>
								<p className='text-purple-100 text-lg'>
									Monitor and manage the entire platform
								</p>
							</div>
						</div>
					</div>
					<div className='hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3'>
						<Activity className='h-5 w-5 text-green-400' />
						<span className='text-sm font-medium'>
							System Healthy
						</span>
					</div>
				</div>
			</div>

			{/* Stats Overview */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
				<Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-blue-700'>
									Total Users
								</p>
								<p className='text-3xl font-bold text-blue-900'>
									{stats.totalUsers}
								</p>
								<p className='text-xs text-blue-600'>
									Platform members
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center'>
								<Users className='h-6 w-6 text-blue-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-green-700'>
									Students
								</p>
								<p className='text-3xl font-bold text-green-900'>
									{stats.totalStudents}
								</p>
								<p className='text-xs text-green-600'>
									Job seekers
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-green-200 flex items-center justify-center'>
								<UserCheck className='h-6 w-6 text-green-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-purple-700'>
									Recruiters
								</p>
								<p className='text-3xl font-bold text-purple-900'>
									{stats.totalRecruiters}
								</p>
								<p className='text-xs text-purple-600'>
									Hiring managers
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center'>
								<Building className='h-6 w-6 text-purple-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-orange-700'>
									Job Postings
								</p>
								<p className='text-3xl font-bold text-orange-900'>
									{stats.totalJobs}
								</p>
								<p className='text-xs text-orange-600'>
									Available positions
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-orange-200 flex items-center justify-center'>
								<Briefcase className='h-6 w-6 text-orange-700' />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-teal-700'>
									Applications
								</p>
								<p className='text-3xl font-bold text-teal-900'>
									{stats.totalApplications}
								</p>
								<p className='text-xs text-teal-600'>
									Total submissions
								</p>
							</div>
							<div className='h-12 w-12 rounded-full bg-teal-200 flex items-center justify-center'>
								<FileText className='h-6 w-6 text-teal-700' />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Management Tabs */}
			<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
				<CardHeader className='pb-4'>
					<div className='flex items-center space-x-3'>
						<div className='h-10 w-10 rounded-full bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center'>
							<Settings className='h-5 w-5 text-white' />
						</div>
						<div>
							<CardTitle className='text-xl'>
								Platform Management
							</CardTitle>
							<CardDescription>
								Manage users, jobs, and monitor platform
								activity
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className='pt-0'>
					<Tabs
						defaultValue='users'
						className='space-y-6'
					>
						<TabsList className='grid w-full grid-cols-2 bg-gray-100'>
							<TabsTrigger
								value='users'
								className='data-[state=active]:bg-white data-[state=active]:shadow-sm'
							>
								<Users className='h-4 w-4 mr-2' />
								Manage Users
							</TabsTrigger>
							<TabsTrigger
								value='jobs'
								className='data-[state=active]:bg-white data-[state=active]:shadow-sm'
							>
								<Briefcase className='h-4 w-4 mr-2' />
								Manage Jobs
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value='users'
							className='space-y-4'
						>
							<div className='rounded-lg border bg-card'>
								<Table>
									<TableHeader>
										<TableRow className='bg-gray-50/50'>
											<TableHead className='font-semibold'>
												User
											</TableHead>
											<TableHead className='font-semibold'>
												Role
											</TableHead>
											<TableHead className='font-semibold'>
												Details
											</TableHead>
											<TableHead className='font-semibold'>
												Status
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{users.map((user) => (
											<TableRow
												key={user.id}
												className='hover:bg-gray-50/50 transition-colors'
											>
												<TableCell>
													<div className='flex items-center space-x-3'>
														<div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center'>
															<Users className='h-5 w-5 text-blue-600' />
														</div>
														<div>
															<div className='font-medium text-gray-900'>
																{user.name}
															</div>
															<div className='text-sm text-gray-500'>
																{user.email}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{getRoleBadge(user.role)}
												</TableCell>
												<TableCell>
													<div className='text-sm'>
														{user.role ===
															'student' && (
															<div className='space-y-1'>
																<p className='text-gray-700'>
																	📚{' '}
																	{user.major ||
																		'N/A'}
																</p>
																<p className='text-gray-500'>
																	🎓 Class of{' '}
																	{user.graduationYear ||
																		'N/A'}
																</p>
															</div>
														)}
														{user.role ===
															'recruiter' && (
															<div className='space-y-1'>
																<p className='text-gray-700'>
																	🏢{' '}
																	{user.company ||
																		'N/A'}
																</p>
																<p className='text-gray-500'>
																	💼{' '}
																	{user.position ||
																		'N/A'}
																</p>
															</div>
														)}
														{user.role ===
															'admin' && (
															<p className='text-gray-700'>
																🛡️ System
																Administrator
															</p>
														)}
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant='default'
														className='bg-green-100 text-green-800'
													>
														✅ Active
													</Badge>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</TabsContent>

						<TabsContent
							value='jobs'
							className='space-y-4'
						>
							<div className='rounded-lg border bg-card'>
								<Table>
									<TableHeader>
										<TableRow className='bg-gray-50/50'>
											<TableHead className='font-semibold'>
												Job Details
											</TableHead>
											<TableHead className='font-semibold'>
												Company
											</TableHead>
											<TableHead className='font-semibold'>
												Type & Location
											</TableHead>
											<TableHead className='font-semibold'>
												Applications
											</TableHead>
											<TableHead className='font-semibold'>
												Posted
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{jobs.map((job) => (
											<TableRow
												key={job.id}
												className='hover:bg-gray-50/50 transition-colors'
											>
												<TableCell>
													<div className='flex items-center space-x-3'>
														<div className='h-10 w-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center'>
															<Briefcase className='h-5 w-5 text-emerald-600' />
														</div>
														<div>
															<div className='font-medium text-gray-900'>
																{job.title}
															</div>
															<div className='text-sm text-gray-500'>
																{job.department ||
																	'General'}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<div className='flex items-center space-x-2'>
														<Building className='h-4 w-4 text-gray-400' />
														<span className='font-medium'>
															{job.company}
														</span>
													</div>
												</TableCell>
												<TableCell>
													<div className='space-y-2'>
														{getJobTypeBadge(
															job.type
														)}
														<div className='flex items-center text-sm text-gray-600'>
															<MapPin className='h-3 w-3 mr-1' />
															{job.location}
														</div>
													</div>
												</TableCell>
												<TableCell>
													<div className='text-center'>
														<div className='text-lg font-bold text-blue-600'>
															{job.applications
																?.length || 0}
														</div>
														<div className='text-xs text-gray-500'>
															applications
														</div>
													</div>
												</TableCell>
												<TableCell>
													<div className='flex items-center text-sm text-gray-600'>
														<Calendar className='h-3 w-3 mr-1' />
														{new Date(
															job.postedDate
														).toLocaleDateString()}
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
