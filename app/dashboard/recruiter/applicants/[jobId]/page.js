'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
	ArrowLeft,
} from 'lucide-react';

export default function JobApplicants() {
	const params = useParams();
	const router = useRouter();
	const jobId = params.jobId;
	
	const [user, setUser] = useState(null);
	const [job, setJob] = useState(null);
	const [applications, setApplications] = useState([]);
	const [filteredApplications, setFilteredApplications] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedApplication, setSelectedApplication] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [statusFilter, setStatusFilter] = useState('all');

	useEffect(() => {
		const getJobApplications = async () => {
			try {
				const cookieValue = document.cookie
					.split('; ')
					.find((row) => row.startsWith('user_session='));

				if (cookieValue) {
					const userData = JSON.parse(
						decodeURIComponent(cookieValue.split('=')[1])
					);
					setUser(userData);

					// Get specific job details
					const jobResponse = await fetch(`/api/jobs/${jobId}`);
					if (jobResponse.ok) {
						const jobData = await jobResponse.json();
						setJob(jobData);
						
						// Set applications for this specific job
						const jobApplications = jobData.applications || [];
						const enrichedApplications = jobApplications.map(app => ({
							...app,
							jobTitle: jobData.title,
							jobId: jobData.id,
							company: jobData.company,
						}));
						
						setApplications(enrichedApplications);
						setFilteredApplications(enrichedApplications);
					}
				}
			} catch (error) {
				console.error('Error fetching job applications:', error);
			} finally {
				setIsLoading(false);
			}
		};

		if (jobId) {
			getJobApplications();
		}
	}, [jobId]);

	useEffect(() => {
		let filtered = applications;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter((app) =>
				app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				app.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Filter by status
		if (statusFilter !== 'all') {
			filtered = filtered.filter((app) => app.status === statusFilter);
		}

		setFilteredApplications(filtered);
	}, [searchTerm, statusFilter, applications]);

	const updateApplicationStatus = async (applicationId, newStatus) => {
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

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
					<p className='mt-2 text-gray-600'>Loading applications...</p>
				</div>
			</div>
		);
	}

	if (!job) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<Briefcase className='h-12 w-12 text-gray-400 mx-auto mb-4' />
					<p className='text-gray-600'>Job not found</p>
					<Button
						variant='outline'
						className='mt-4'
						onClick={() => router.back()}
					>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Go Back
					</Button>
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
						<div className='flex items-center space-x-3 mb-2'>
							<Button
								variant='ghost'
								size='sm'
								className='text-white hover:bg-white/10 -ml-2'
								onClick={() => router.back()}
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Back
							</Button>
						</div>
						<h1 className='text-3xl font-bold'>
							{job.title} Applicants 📋
						</h1>
						<p className='text-green-100 text-lg'>
							{job.company} • {applications.length} Applications
						</p>
					</div>
					<div className='hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3'>
						<User className='h-5 w-5 text-green-300' />
						<span className='text-sm font-medium'>{applications.length} Candidates</span>
					</div>
				</div>
			</div>

			{/* Job Details Card */}
			<Card className='border-0 shadow-lg'>
				<CardHeader>
					<CardTitle className='flex items-center'>
						<Briefcase className='mr-2 h-5 w-5' />
						Job Details
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
						<div>
							<p className='font-medium text-gray-900'>{job.title}</p>
							<p className='text-gray-600'>{job.company}</p>
						</div>
						<div>
							<p className='font-medium text-gray-900'>{job.type}</p>
							<p className='text-gray-600'>{job.location}</p>
						</div>
						<div>
							<p className='font-medium text-gray-900'>{job.salary}</p>
							<p className='text-gray-600'>Posted {new Date(job.postedDate).toLocaleDateString()}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Filters */}
			<div className='flex flex-col sm:flex-row gap-4'>
				<div className='relative flex-1'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
					<Input
						placeholder='Search by candidate name or email...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-10'
					/>
				</div>
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					<option value='all'>All Status</option>
					<option value='Pending'>Pending</option>
					<option value='Reviewed'>Reviewed</option>
					<option value='Interview'>Interview</option>
					<option value='Rejected'>Rejected</option>
				</select>
			</div>

			{/* Applications Table */}
			{filteredApplications.length > 0 ? (
				<Card className='border-0 shadow-lg'>
					<CardHeader>
						<CardTitle>Applications ({filteredApplications.length})</CardTitle>
						<CardDescription>
							Review and manage candidate applications
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='rounded-lg border'>
							<Table>
								<TableHeader>
									<TableRow className='bg-gray-50/50'>
										<TableHead className='font-semibold'>Candidate</TableHead>
										<TableHead className='font-semibold'>Applied Date</TableHead>
										<TableHead className='font-semibold'>Status</TableHead>
										<TableHead className='font-semibold'>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredApplications.map((application) => (
										<TableRow key={application.id} className='hover:bg-gray-50/50'>
											<TableCell>
												<div className='flex items-center space-x-3'>
													<div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center'>
														<User className='h-5 w-5 text-blue-600' />
													</div>
													<div>
														<div className='font-medium text-gray-900'>
															{application.studentName}
														</div>
														<div className='text-sm text-gray-500'>
															{application.studentEmail}
														</div>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className='flex items-center text-sm text-gray-600'>
													<Calendar className='h-4 w-4 mr-1' />
													{new Date(application.appliedDate).toLocaleDateString()}
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={getStatusBadgeVariant(application.status)} className='flex items-center w-fit'>
													{getStatusIcon(application.status)}
													<span className='ml-1'>{application.status}</span>
												</Badge>
											</TableCell>
											<TableCell>
												<div className='flex space-x-2'>
													<Dialog>
														<DialogTrigger asChild>
															<Button
																variant='outline'
																size='sm'
																onClick={() => setSelectedApplication(application)}
															>
																<Eye className='h-4 w-4 mr-1' />
																View
															</Button>
														</DialogTrigger>
														<DialogContent className='max-w-2xl'>
															<DialogHeader>
																<DialogTitle>Application Details</DialogTitle>
																<DialogDescription>
																	Review candidate application and update status
																</DialogDescription>
															</DialogHeader>
															{selectedApplication && (
																<div className='space-y-6'>
																	<div className='grid grid-cols-2 gap-4'>
																		<div>
																			<label className='text-sm font-medium text-gray-700'>
																				Candidate Name
																			</label>
																			<p className='text-sm text-gray-900 mt-1'>
																				{selectedApplication.studentName}
																			</p>
																		</div>
																		<div>
																			<label className='text-sm font-medium text-gray-700'>
																				Email
																			</label>
																			<p className='text-sm text-gray-900 mt-1'>
																				{selectedApplication.studentEmail}
																			</p>
																		</div>
																		<div>
																			<label className='text-sm font-medium text-gray-700'>
																				Applied Date
																			</label>
																			<p className='text-sm text-gray-900 mt-1'>
																				{new Date(selectedApplication.appliedDate).toLocaleDateString()}
																			</p>
																		</div>
																		<div>
																			<label className='text-sm font-medium text-gray-700'>
																				Current Status
																			</label>
																			<div className='mt-1'>
																				<Badge variant={getStatusBadgeVariant(selectedApplication.status)}>
																					{selectedApplication.status}
																				</Badge>
																			</div>
																		</div>
																	</div>

																	<div>
																		<label className='text-sm font-medium text-gray-700'>
																			Cover Letter
																		</label>
																		<div className='mt-2 p-3 bg-gray-50 rounded-lg'>
																			<p className='text-sm text-gray-900'>
																				{selectedApplication.coverLetter}
																			</p>
																		</div>
																	</div>

																	<div>
																		<label className='text-sm font-medium text-gray-700 mb-2 block'>
																			Update Status
																		</label>
																		<div className='flex space-x-2'>
																			<Button
																				size='sm'
																				variant='outline'
																				onClick={() =>
																					updateApplicationStatus(
																						selectedApplication.id,
																						'Reviewed'
																					)
																				}
																			>
																				Mark as Reviewed
																			</Button>
																			<Button
																				size='sm'
																				variant='outline'
																				onClick={() =>
																					updateApplicationStatus(
																						selectedApplication.id,
																						'Interview'
																					)
																				}
																			>
																				Schedule Interview
																			</Button>
																			<Button
																				size='sm'
																				variant='destructive'
																				onClick={() =>
																					updateApplicationStatus(
																						selectedApplication.id,
																						'Rejected'
																					)
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
						</div>
					</CardContent>
				</Card>
			) : (
				<Card className='border-0 shadow-lg'>
					<CardContent className='text-center py-12'>
						<User className='h-12 w-12 text-gray-400 mx-auto mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							No Applications Yet
						</h3>
						<p className='text-gray-600 mb-6'>
							{searchTerm || statusFilter !== 'all'
								? 'No applications match your current filters.'
								: 'This job hasn\'t received any applications yet.'}
						</p>
						{(searchTerm || statusFilter !== 'all') && (
							<div className='space-x-2'>
								<Button
									variant='outline'
									onClick={() => {
										setSearchTerm('');
										setStatusFilter('all');
									}}
								>
									Clear Filters
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
