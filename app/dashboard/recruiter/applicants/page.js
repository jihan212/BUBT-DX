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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	User,
	Mail,
	Phone,
	Calendar,
	Briefcase,
	FileText,
	Search,
	Eye,
	CheckCircle,
	XCircle,
	Clock,
} from 'lucide-react';

export default function RecruiterApplicants() {
	const [user, setUser] = useState(null);
	const [applications, setApplications] = useState([]);
	const [filteredApplications, setFilteredApplications] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedApplication, setSelectedApplication] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [statusFilter, setStatusFilter] = useState('all');

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

					// Get all applications for this recruiter's jobs
					const jobsResponse = await fetch(
						`/api/jobs?recruiter=${userData.id}`
					);
					if (jobsResponse.ok) {
						const jobs = await jobsResponse.json();
						const allApplications = [];

						// Collect all applications from all jobs
						jobs.forEach((job) => {
							if (job.applications) {
								job.applications.forEach((app) => {
									allApplications.push({
										...app,
										jobTitle: job.title,
										jobId: job.id,
										company: job.company,
									});
								});
							}
						});

						setApplications(allApplications);
						setFilteredApplications(allApplications);
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

	useEffect(() => {
		let filtered = applications;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(app) =>
					app.studentName
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					app.jobTitle
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					app.company.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Filter by status
		if (statusFilter !== 'all') {
			filtered = filtered.filter((app) => app.status === statusFilter);
		}

		setFilteredApplications(filtered);
	}, [searchTerm, statusFilter, applications]);

	const updateApplicationStatus = async (applicationId, jobId, newStatus) => {
		try {
			const response = await fetch(`/api/applications`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					applicationId,
					jobId,
					status: newStatus,
				}),
			});

			if (response.ok) {
				// Update local state
				setApplications((prev) =>
					prev.map((app) =>
						app.id === applicationId
							? { ...app, status: newStatus }
							: app
					)
				);
				setSelectedApplication((prev) =>
					prev?.id === applicationId
						? { ...prev, status: newStatus }
						: prev
				);
			}
		} catch (error) {
			console.error('Error updating application status:', error);
		}
	};

	const getStatusBadgeVariant = (status) => {
		switch (status) {
			case 'Pending':
				return 'default';
			case 'Reviewed':
				return 'secondary';
			case 'Interview':
				return 'outline';
			case 'Rejected':
				return 'destructive';
			default:
				return 'default';
		}
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case 'Pending':
				return <Clock className='h-4 w-4' />;
			case 'Reviewed':
				return <Eye className='h-4 w-4' />;
			case 'Interview':
				return <CheckCircle className='h-4 w-4' />;
			case 'Rejected':
				return <XCircle className='h-4 w-4' />;
			default:
				return <Clock className='h-4 w-4' />;
		}
	};

	const statusCounts = {
		all: applications.length,
		Pending: applications.filter((app) => app.status === 'Pending').length,
		Reviewed: applications.filter((app) => app.status === 'Reviewed')
			.length,
		Interview: applications.filter((app) => app.status === 'Interview')
			.length,
		Rejected: applications.filter((app) => app.status === 'Rejected')
			.length,
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
					<p className='mt-2 text-gray-600'>
						Loading applications...
					</p>
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
							Application Management 👥
						</h1>
						<p className='text-green-100 text-lg'>
							Review and manage job applications
						</p>
					</div>
					<div className='hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3'>
						<User className='h-5 w-5 text-green-300' />
						<span className='text-sm font-medium'>
							{applications.length} Applications
						</span>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<FileText className='h-5 w-5 text-blue-600' />
							<div>
								<p className='text-sm font-medium'>Total</p>
								<p className='text-2xl font-bold'>
									{statusCounts.all}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<Clock className='h-5 w-5 text-yellow-600' />
							<div>
								<p className='text-sm font-medium'>Pending</p>
								<p className='text-2xl font-bold'>
									{statusCounts.Pending}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<Eye className='h-5 w-5 text-blue-600' />
							<div>
								<p className='text-sm font-medium'>Reviewed</p>
								<p className='text-2xl font-bold'>
									{statusCounts.Reviewed}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<CheckCircle className='h-5 w-5 text-green-600' />
							<div>
								<p className='text-sm font-medium'>Interview</p>
								<p className='text-2xl font-bold'>
									{statusCounts.Interview}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<XCircle className='h-5 w-5 text-red-600' />
							<div>
								<p className='text-sm font-medium'>Rejected</p>
								<p className='text-2xl font-bold'>
									{statusCounts.Rejected}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<div className='flex flex-col sm:flex-row gap-4'>
						<div className='relative flex-1'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
							<Input
								placeholder='Search applicants, jobs, or companies...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-10'
							/>
						</div>
						<Tabs
							value={statusFilter}
							onValueChange={setStatusFilter}
						>
							<TabsList>
								<TabsTrigger value='all'>All</TabsTrigger>
								<TabsTrigger value='Pending'>
									Pending
								</TabsTrigger>
								<TabsTrigger value='Reviewed'>
									Reviewed
								</TabsTrigger>
								<TabsTrigger value='Interview'>
									Interview
								</TabsTrigger>
								<TabsTrigger value='Rejected'>
									Rejected
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				</CardHeader>
				<CardContent>
					{filteredApplications.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Applicant</TableHead>
									<TableHead>Job Position</TableHead>
									<TableHead>Applied Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredApplications.map((application) => (
									<TableRow key={application.id}>
										<TableCell>
											<div className='flex items-center space-x-3'>
												<div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
													<User className='h-5 w-5 text-blue-600' />
												</div>
												<div>
													<div className='font-medium'>
														{
															application.studentName
														}
													</div>
													<div className='text-sm text-gray-500'>
														{
															application.studentEmail
														}
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div>
												<div className='font-medium'>
													{application.jobTitle}
												</div>
												<div className='text-sm text-gray-500'>
													{application.company}
												</div>
											</div>
										</TableCell>
										<TableCell>
											{new Date(
												application.appliedDate
											).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<Badge
												variant={getStatusBadgeVariant(
													application.status
												)}
												className='flex items-center gap-1 w-fit'
											>
												{getStatusIcon(
													application.status
												)}
												{application.status}
											</Badge>
										</TableCell>
										<TableCell>
											<div className='flex items-center space-x-2'>
												<Dialog>
													<DialogTrigger asChild>
														<Button
															variant='outline'
															size='sm'
															onClick={() =>
																setSelectedApplication(
																	application
																)
															}
														>
															<Eye className='h-4 w-4 mr-1' />
															View
														</Button>
													</DialogTrigger>
													<DialogContent className='max-w-2xl'>
														<DialogHeader>
															<DialogTitle>
																Application
																Details
															</DialogTitle>
															<DialogDescription>
																Review
																application for{' '}
																{
																	selectedApplication?.jobTitle
																}
															</DialogDescription>
														</DialogHeader>
														{selectedApplication && (
															<div className='space-y-6'>
																{/* Applicant Info */}
																<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
																	<div className='space-y-3'>
																		<h4 className='font-semibold flex items-center'>
																			<User className='h-4 w-4 mr-2' />
																			Applicant
																			Information
																		</h4>
																		<div className='space-y-2 text-sm'>
																			<div className='flex items-center'>
																				<Mail className='h-4 w-4 mr-2 text-gray-400' />
																				{
																					selectedApplication.studentEmail
																				}
																			</div>
																			<div className='flex items-center'>
																				<Calendar className='h-4 w-4 mr-2 text-gray-400' />
																				Applied
																				on{' '}
																				{new Date(
																					selectedApplication.appliedDate
																				).toLocaleDateString()}
																			</div>
																		</div>
																	</div>
																	<div className='space-y-3'>
																		<h4 className='font-semibold flex items-center'>
																			<Briefcase className='h-4 w-4 mr-2' />
																			Job
																			Information
																		</h4>
																		<div className='space-y-2 text-sm'>
																			<div>
																				<strong>
																					Position:
																				</strong>{' '}
																				{
																					selectedApplication.jobTitle
																				}
																			</div>
																			<div>
																				<strong>
																					Company:
																				</strong>{' '}
																				{
																					selectedApplication.company
																				}
																			</div>
																		</div>
																	</div>
																</div>

																{/* Cover Letter */}
																{selectedApplication.coverLetter && (
																	<div className='space-y-3'>
																		<h4 className='font-semibold flex items-center'>
																			<FileText className='h-4 w-4 mr-2' />
																			Cover
																			Letter
																		</h4>
																		<div className='bg-gray-50 p-4 rounded-lg text-sm'>
																			{
																				selectedApplication.coverLetter
																			}
																		</div>
																	</div>
																)}

																{/* Status Update */}
																<div className='space-y-3'>
																	<h4 className='font-semibold'>
																		Update
																		Application
																		Status
																	</h4>
																	<div className='flex space-x-2'>
																		<Button
																			size='sm'
																			variant='outline'
																			onClick={() =>
																				updateApplicationStatus(
																					selectedApplication.id,
																					selectedApplication.jobId,
																					'Reviewed'
																				)
																			}
																			disabled={
																				selectedApplication.status ===
																				'Reviewed'
																			}
																		>
																			Mark
																			as
																			Reviewed
																		</Button>
																		<Button
																			size='sm'
																			onClick={() =>
																				updateApplicationStatus(
																					selectedApplication.id,
																					selectedApplication.jobId,
																					'Interview'
																				)
																			}
																			disabled={
																				selectedApplication.status ===
																				'Interview'
																			}
																		>
																			Schedule
																			Interview
																		</Button>
																		<Button
																			size='sm'
																			variant='destructive'
																			onClick={() =>
																				updateApplicationStatus(
																					selectedApplication.id,
																					selectedApplication.jobId,
																					'Rejected'
																				)
																			}
																			disabled={
																				selectedApplication.status ===
																				'Rejected'
																			}
																		>
																			Reject
																		</Button>
																	</div>
																</div>
															</div>
														)}
													</DialogContent>
												</Dialog>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<div className='text-center py-8'>
							<FileText className='mx-auto h-12 w-12 text-gray-400' />
							<h3 className='mt-2 text-sm font-medium text-gray-900'>
								No applications found
							</h3>
							<p className='mt-1 text-sm text-gray-500'>
								{searchTerm || statusFilter !== 'all'
									? 'Try adjusting your filters'
									: 'Applications will appear here when students apply to your jobs'}
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
