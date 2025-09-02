'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Briefcase, Edit, Trash2, Users, Plus, Calendar } from 'lucide-react';

export default function RecruiterJobs() {
	const [user, setUser] = useState(null);
	const [jobs, setJobs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [jobToDelete, setJobToDelete] = useState(null);

	useEffect(() => {
		const getJobs = async () => {
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
						`/api/jobs?recruiter=${userData.id}`
					);
					if (response.ok) {
						const jobsData = await response.json();
						setJobs(jobsData);
					}
				}
			} catch (error) {
				console.error('Error fetching jobs:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getJobs();
	}, []);

	const handleDeleteJob = async (jobId) => {
		try {
			const response = await fetch(`/api/jobs/${jobId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				setJobs(jobs.filter((job) => job.id !== jobId));
				setJobToDelete(null);
			} else {
				console.error('Failed to delete job');
			}
		} catch (error) {
			console.error('Error deleting job:', error);
		}
	};

	const getStatusBadge = (job) => {
		const applicationCount = job.applications?.length || 0;
		if (applicationCount === 0)
			return <Badge variant='secondary'>No Applications</Badge>;
		if (applicationCount < 5)
			return <Badge variant='outline'>Few Applications</Badge>;
		return <Badge variant='default'>Popular</Badge>;
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
					<p className='mt-4 text-gray-600'>Loading jobs...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 p-8 text-white'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M30 30l15-15v30z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
				<div className='relative flex items-center justify-between'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold'>
							My Job Postings 📝
						</h1>
						<p className='text-green-100 text-lg'>
							Manage your active job listings and track
							applications
						</p>
					</div>
					<div className='flex items-center space-x-3'>
						<div className='hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3'>
							<Briefcase className='h-5 w-5 text-green-300' />
							<span className='text-sm font-medium'>
								{jobs.length} Active Jobs
							</span>
						</div>
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
					</div>
				</div>
			</div>

			{jobs.length > 0 ? (
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<Briefcase className='mr-2 h-5 w-5' />
							Active Job Postings ({jobs.length})
						</CardTitle>
						<CardDescription>
							View and manage all your job listings
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Job Title</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Applications</TableHead>
									<TableHead>Posted Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{jobs.map((job) => (
									<TableRow key={job.id}>
										<TableCell className='font-medium'>
											<div>
												<div className='font-medium'>
													{job.title}
												</div>
												<div className='text-sm text-gray-500'>
													{job.company}
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge
												variant={
													job.type === 'Full-time'
														? 'default'
														: 'secondary'
												}
											>
												{job.type}
											</Badge>
										</TableCell>
										<TableCell>
											<div className='flex items-center'>
												<Users className='mr-2 h-4 w-4 text-gray-400' />
												{job.applications?.length || 0}
											</div>
										</TableCell>
										<TableCell>
											<div className='flex items-center'>
												<Calendar className='mr-2 h-4 w-4 text-gray-400' />
												{new Date(
													job.postedDate
												).toLocaleDateString()}
											</div>
										</TableCell>
										<TableCell>
											{getStatusBadge(job)}
										</TableCell>
										<TableCell>
											<div className='flex space-x-2'>
												<Link
													href={`/dashboard/recruiter/applicants/${job.id}`}
												>
													<Button
														variant='outline'
														size='sm'
													>
														View Applicants
													</Button>
												</Link>
												<Button
													variant='outline'
													size='sm'
												>
													<Edit className='h-4 w-4' />
												</Button>
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button
															variant='outline'
															size='sm'
															onClick={() =>
																setJobToDelete(
																	job
																)
															}
														>
															<Trash2 className='h-4 w-4' />
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>
																Delete Job
																Posting
															</AlertDialogTitle>
															<AlertDialogDescription>
																Are you sure you
																want to delete "
																{
																	jobToDelete?.title
																}
																"? This action
																cannot be undone
																and will remove
																all associated
																applications.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>
																Cancel
															</AlertDialogCancel>
															<AlertDialogAction
																onClick={() =>
																	handleDeleteJob(
																		job.id
																	)
																}
																className='bg-red-600 hover:bg-red-700'
															>
																Delete
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</div>
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
						<Briefcase className='h-16 w-16 text-gray-400 mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							No job postings yet
						</h3>
						<p className='text-gray-600 text-center mb-6'>
							Start attracting talent by posting your first job
							opportunity.
						</p>
						<Link href='/dashboard/recruiter/jobs/new'>
							<Button>
								<Plus className='mr-2 h-4 w-4' />
								Post Your First Job
							</Button>
						</Link>
					</CardContent>
				</Card>
			)}

			{/* Job Statistics */}
			{jobs.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center'>
								<div className='flex-1'>
									<p className='text-sm font-medium text-gray-600'>
										Total Applications
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{jobs.reduce(
											(sum, job) =>
												sum +
												(job.applications?.length || 0),
											0
										)}
									</p>
								</div>
								<div className='h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center'>
									<Users className='h-4 w-4 text-blue-600' />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center'>
								<div className='flex-1'>
									<p className='text-sm font-medium text-gray-600'>
										Active Jobs
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{jobs.length}
									</p>
								</div>
								<div className='h-8 w-8 bg-green-100 rounded-full flex items-center justify-center'>
									<Briefcase className='h-4 w-4 text-green-600' />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center'>
								<div className='flex-1'>
									<p className='text-sm font-medium text-gray-600'>
										Avg. Applications
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{jobs.length > 0
											? Math.round(
													jobs.reduce(
														(sum, job) =>
															sum +
															(job.applications
																?.length || 0),
														0
													) / jobs.length
											  )
											: 0}
									</p>
								</div>
								<div className='h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center'>
									<div className='h-4 w-4 text-purple-600'>
										📊
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
