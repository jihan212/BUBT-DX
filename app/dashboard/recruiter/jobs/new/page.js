'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
	Briefcase,
	MapPin,
	DollarSign,
	Calendar,
	Users,
	Building,
	ArrowLeft,
	Plus,
	X,
} from 'lucide-react';

export default function NewJobPosting() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [skills, setSkills] = useState([]);
	const [newSkill, setNewSkill] = useState('');

	const [formData, setFormData] = useState({
		title: '',
		company: '',
		location: '',
		type: 'Full-time',
		salary: '',
		description: '',
		requirements: '',
		benefits: '',
		applicationDeadline: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const addSkill = () => {
		if (newSkill.trim() && !skills.includes(newSkill.trim())) {
			setSkills([...skills, newSkill.trim()]);
			setNewSkill('');
		}
	};

	const removeSkill = (skillToRemove) => {
		setSkills(skills.filter((skill) => skill !== skillToRemove));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		try {
			// Get user data from cookie
			const cookieValue = document.cookie
				.split('; ')
				.find((row) => row.startsWith('user_session='));

			if (!cookieValue) {
				setError('Please log in again');
				return;
			}

			const userData = JSON.parse(
				decodeURIComponent(cookieValue.split('=')[1])
			);

			const jobData = {
				...formData,
				skills: skills,
				recruiterId: userData.id,
				postedDate: new Date().toISOString(),
				status: 'Active',
			};

			const response = await fetch('/api/jobs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jobData),
			});

			if (response.ok) {
				router.push('/dashboard/recruiter/jobs');
			} else {
				const data = await response.json();
				setError(data.error || 'Failed to create job posting');
			}
		} catch (error) {
			setError('Network error. Please try again.');
			console.error('Error creating job:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center space-x-4'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => router.back()}
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Back
				</Button>
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>
						Post New Job
					</h1>
					<p className='text-gray-600'>
						Create a new job posting to attract qualified candidates
					</p>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Main Form */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Basic Information */}
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center'>
									<Briefcase className='h-5 w-5 mr-2' />
									Job Information
								</CardTitle>
								<CardDescription>
									Basic details about the position
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='title'>
											Job Title *
										</Label>
										<Input
											id='title'
											name='title'
											value={formData.title}
											onChange={handleInputChange}
											placeholder='e.g. Senior Software Engineer'
											required
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='company'>
											Company *
										</Label>
										<Input
											id='company'
											name='company'
											value={formData.company}
											onChange={handleInputChange}
											placeholder='e.g. TechCorp Inc.'
											required
										/>
									</div>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='location'>
											Location *
										</Label>
										<Input
											id='location'
											name='location'
											value={formData.location}
											onChange={handleInputChange}
											placeholder='e.g. Dhaka, Bangladesh'
											required
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='type'>Job Type *</Label>
										<select
											id='type'
											name='type'
											value={formData.type}
											onChange={handleInputChange}
											className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
											required
										>
											<option value='Full-time'>
												Full-time
											</option>
											<option value='Part-time'>
												Part-time
											</option>
											<option value='Contract'>
												Contract
											</option>
											<option value='Internship'>
												Internship
											</option>
										</select>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='salary'>
											Salary Range
										</Label>
										<Input
											id='salary'
											name='salary'
											value={formData.salary}
											onChange={handleInputChange}
											placeholder='e.g. $50,000 - $70,000'
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='applicationDeadline'>
										Application Deadline
									</Label>
									<Input
										id='applicationDeadline'
										name='applicationDeadline'
										type='date'
										value={formData.applicationDeadline}
										onChange={handleInputChange}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Job Description */}
						<Card>
							<CardHeader>
								<CardTitle>Job Description</CardTitle>
								<CardDescription>
									Detailed information about the role
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='description'>
										Description *
									</Label>
									<Textarea
										id='description'
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
										rows={6}
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='requirements'>
										Requirements & Qualifications *
									</Label>
									<Textarea
										id='requirements'
										name='requirements'
										value={formData.requirements}
										onChange={handleInputChange}
										placeholder='List the required qualifications, experience, and skills...'
										rows={4}
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='benefits'>
										Benefits & Perks
									</Label>
									<Textarea
										id='benefits'
										name='benefits'
										value={formData.benefits}
										onChange={handleInputChange}
										placeholder='Describe the benefits, perks, and what makes your company great...'
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Skills */}
						<Card>
							<CardHeader>
								<CardTitle>Required Skills</CardTitle>
								<CardDescription>
									Add relevant skills and technologies
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex space-x-2'>
									<Input
										value={newSkill}
										onChange={(e) =>
											setNewSkill(e.target.value)
										}
										placeholder='Add a skill (e.g. JavaScript, React, etc.)'
										onKeyPress={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault();
												addSkill();
											}
										}}
									/>
									<Button
										type='button'
										onClick={addSkill}
										size='sm'
									>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
								{skills.length > 0 && (
									<div className='flex flex-wrap gap-2'>
										{skills.map((skill, index) => (
											<Badge
												key={index}
												variant='secondary'
												className='flex items-center gap-1'
											>
												{skill}
												<button
													type='button'
													onClick={() =>
														removeSkill(skill)
													}
													className='ml-1 hover:text-destructive'
												>
													<X className='h-3 w-3' />
												</button>
											</Badge>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Preview Card */}
					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle>Preview</CardTitle>
								<CardDescription>
									How your job posting will look
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-3'>
									<div>
										<h3 className='font-semibold text-lg'>
											{formData.title || 'Job Title'}
										</h3>
										<p className='text-gray-600'>
											{formData.company || 'Company Name'}
										</p>
									</div>

									<div className='flex flex-wrap gap-2 text-sm text-gray-600'>
										<div className='flex items-center'>
											<MapPin className='h-4 w-4 mr-1' />
											{formData.location || 'Location'}
										</div>
										<div className='flex items-center'>
											<Briefcase className='h-4 w-4 mr-1' />
											{formData.type}
										</div>
										{formData.salary && (
											<div className='flex items-center'>
												<DollarSign className='h-4 w-4 mr-1' />
												{formData.salary}
											</div>
										)}
									</div>

									{skills.length > 0 && (
										<div className='flex flex-wrap gap-1'>
											{skills
												.slice(0, 3)
												.map((skill, index) => (
													<Badge
														key={index}
														variant='outline'
														className='text-xs'
													>
														{skill}
													</Badge>
												))}
											{skills.length > 3 && (
												<Badge
													variant='outline'
													className='text-xs'
												>
													+{skills.length - 3} more
												</Badge>
											)}
										</div>
									)}

									{formData.description && (
										<div className='text-sm text-gray-700'>
											<p className='line-clamp-3'>
												{formData.description}
											</p>
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Action Buttons */}
						<div className='space-y-3'>
							{error && (
								<div className='text-sm text-red-600 bg-red-50 p-3 rounded-md'>
									{error}
								</div>
							)}
							<Button
								type='submit'
								className='w-full'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Publishing...' : 'Publish Job'}
							</Button>
							<Button
								type='button'
								variant='outline'
								className='w-full'
								onClick={() =>
									router.push('/dashboard/recruiter/jobs')
								}
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
