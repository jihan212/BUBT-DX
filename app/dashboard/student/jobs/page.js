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
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Building,
	MapPin,
	Calendar,
	DollarSign,
	Search,
	Briefcase,
	Users,
} from 'lucide-react';

export default function BrowseJobs() {
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [user, setUser] = useState(null);
	const [selectedJob, setSelectedJob] = useState(null);
	const [isApplying, setIsApplying] = useState(false);
	const [appliedJobs, setAppliedJobs] = useState(new Set());

	useEffect(() => {
		const getJobsAndUser = async () => {
			try {
				// Get user data
				const cookieValue = document.cookie
					.split('; ')
					.find((row) => row.startsWith('user_session='));

				if (cookieValue) {
					const userData = JSON.parse(
						decodeURIComponent(cookieValue.split('=')[1])
					);
					setUser(userData);

					// Get user's applications to mark already applied jobs
					const appsResponse = await fetch(
						`/api/applications?student=${userData.id}`
					);
					if (appsResponse.ok) {
						const applications = await appsResponse.json();
						const appliedJobIds = new Set(
							applications.map((app) => app.jobId)
						);
						setAppliedJobs(appliedJobIds);
					}
				}

				// Get all jobs
				const jobsResponse = await fetch('/api/jobs');
				if (jobsResponse.ok) {
					const jobsData = await jobsResponse.json();
					setJobs(jobsData);
					setFilteredJobs(jobsData);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		getJobsAndUser();
	}, []);

	useEffect(() => {
		const filtered = jobs.filter(
			(job) =>
				job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
				job.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredJobs(filtered);
	}, [searchTerm, jobs]);

	const handleApply = async (jobId) => {
		if (!user) return;

		setIsApplying(true);
		try {
			const response = await fetch('/api/applications', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					jobId,
					studentId: user.id,
				}),
			});

			if (response.ok) {
				setAppliedJobs((prev) => new Set([...prev, jobId]));
				alert('Application submitted successfully!');
			} else {
				const error = await response.json();
				alert(error.error || 'Failed to apply for job');
			}
		} catch (error) {
			console.error('Error applying for job:', error);
			alert('Failed to apply for job');
		} finally {
			setIsApplying(false);
		}
	};

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
				<div className='relative flex items-center justify-between'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold'>
							Browse Job Opportunities 💼
						</h1>
						<p className='text-blue-100 text-lg'>
							Find and apply to job opportunities that match your
							skills
						</p>
					</div>
					<div className='hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3'>
						<Briefcase className='h-5 w-5 text-blue-300' />
						<span className='text-sm font-medium'>
							{filteredJobs.length} Jobs Available
						</span>
					</div>
				</div>
			</div>

			{/* Search Bar */}
			<div className='relative'>
				<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
				<Input
					placeholder='Search jobs by title, company, or description...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='pl-10'
				/>
			</div>

			{/* Jobs Grid */}
			{filteredJobs.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredJobs.map((job) => (
						<Card
							key={job.id}
							className='hover:shadow-lg transition-shadow'
						>
							<CardHeader>
								<div className='flex items-start justify-between'>
									<div className='flex-1'>
										<CardTitle className='text-lg'>
											{job.title}
										</CardTitle>
										<CardDescription className='flex items-center mt-1'>
											<Building className='mr-1 h-4 w-4' />
											{job.company}
										</CardDescription>
									</div>
									<Badge
										variant={
											job.type === 'Full-time'
												? 'default'
												: 'secondary'
										}
									>
										{job.type}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2 text-sm text-gray-600'>
									<div className='flex items-center'>
										<MapPin className='mr-2 h-4 w-4' />
										{job.location}
									</div>
									<div className='flex items-center'>
										<DollarSign className='mr-2 h-4 w-4' />
										{job.salary}
									</div>
									<div className='flex items-center'>
										<Calendar className='mr-2 h-4 w-4' />
										Posted{' '}
										{new Date(
											job.postedDate
										).toLocaleDateString()}
									</div>
									<div className='flex items-center'>
										<Users className='mr-2 h-4 w-4' />
										{job.applications?.length || 0}{' '}
										applicant
										{job.applications?.length !== 1
											? 's'
											: ''}
									</div>
								</div>

								<p className='text-sm text-gray-700 line-clamp-3'>
									{job.description}
								</p>

								<div className='flex space-x-2'>
									<Dialog>
										<DialogTrigger asChild>
											<Button
												variant='outline'
												size='sm'
												className='flex-1'
											>
												<Briefcase className='mr-2 h-4 w-4' />
												View Details
											</Button>
										</DialogTrigger>
										<DialogContent className='max-w-2xl'>
											<DialogHeader>
												<DialogTitle>
													{job.title}
												</DialogTitle>
												<DialogDescription>
													{job.company}
												</DialogDescription>
											</DialogHeader>
											<div className='space-y-4'>
												<div className='grid grid-cols-2 gap-4 text-sm'>
													<div>
														<strong>
															Location:
														</strong>{' '}
														{job.location}
													</div>
													<div>
														<strong>Type:</strong>{' '}
														{job.type}
													</div>
													<div>
														<strong>
															Department:
														</strong>{' '}
														{job.department}
													</div>
													<div>
														<strong>Salary:</strong>{' '}
														{job.salary}
													</div>
												</div>
												<div>
													<strong>
														Description:
													</strong>
													<p className='mt-2 text-gray-700'>
														{job.description}
													</p>
												</div>
												<div className='flex justify-end'>
													{appliedJobs.has(job.id) ? (
														<Button
															disabled
															variant='secondary'
														>
															Already Applied
														</Button>
													) : (
														<Button
															onClick={() =>
																handleApply(
																	job.id
																)
															}
															disabled={
																isApplying
															}
														>
															{isApplying
																? 'Applying...'
																: 'Apply Now'}
														</Button>
													)}
												</div>
											</div>
										</DialogContent>
									</Dialog>

									{appliedJobs.has(job.id) ? (
										<Button
											disabled
											variant='secondary'
											size='sm'
										>
											Applied
										</Button>
									) : (
										<Button
											onClick={() => handleApply(job.id)}
											disabled={isApplying}
											size='sm'
										>
											Apply
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card>
					<CardContent className='flex flex-col items-center justify-center py-16'>
						<Briefcase className='h-16 w-16 text-gray-400 mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							{searchTerm ? 'No jobs found' : 'No jobs available'}
						</h3>
						<p className='text-gray-600 text-center'>
							{searchTerm
								? 'Try adjusting your search terms to find more opportunities.'
								: 'Check back later for new job postings.'}
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
