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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
	User,
	Mail,
	GraduationCap,
	Calendar,
	Phone,
	Award,
	BookOpen,
	Edit,
	Save,
	X,
	Star,
	Target,
	Briefcase,
} from 'lucide-react';

export default function StudentProfile() {
	const [user, setUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [formData, setFormData] = useState({
		name: '',
		major: '',
		graduationYear: '',
		resume: '',
		phone: '',
		gpa: '',
		skills: [],
	});

	useEffect(() => {
		const getUserData = async () => {
			setIsLoading(true);
			try {
				const cookieValue = document.cookie
					.split('; ')
					.find((row) => row.startsWith('user_session='));

				if (cookieValue) {
					const userData = JSON.parse(
						decodeURIComponent(cookieValue.split('=')[1])
					);
					setUser(userData);
					setFormData({
						name: userData.name || '',
						major: userData.major || '',
						graduationYear: userData.graduationYear || '',
						resume: userData.resume || '',
						phone: userData.phone || '',
						gpa: userData.gpa || '',
						skills: userData.skills || [],
					});
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getUserData();
	}, []);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSave = async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			const response = await fetch(`/api/users/${user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					profileComplete: !!(
						formData.name &&
						formData.major &&
						formData.graduationYear &&
						formData.resume
					),
				}),
			});

			if (response.ok) {
				const updatedUser = await response.json();
				setUser(updatedUser);

				// Update cookie with new user data
				document.cookie = `user_session=${encodeURIComponent(
					JSON.stringify(updatedUser)
				)}; path=/; max-age=86400`;

				setIsEditing(false);
			} else {
				console.error('Failed to update profile');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		setFormData({
			name: user?.name || '',
			major: user?.major || '',
			graduationYear: user?.graduationYear || '',
			resume: user?.resume || '',
			phone: user?.phone || '',
			gpa: user?.gpa || '',
			skills: user?.skills || [],
		});
		setIsEditing(false);
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
					<p className='mt-4 text-gray-600'>Loading profile...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<User className='h-12 w-12 text-gray-400 mx-auto mb-4' />
					<p className='text-gray-600'>Unable to load profile data</p>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800 p-8 text-white'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
				<div className='relative flex items-center justify-between'>
					<div className='flex items-center space-x-6'>
						<div className='h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold'>
							{user.name?.charAt(0) || 'S'}
						</div>
						<div>
							<h1 className='text-3xl font-bold'>
								{user.name || 'Student Profile'} 👤
							</h1>
							<p className='text-purple-100 text-lg'>
								{user.major || 'Major not set'} • Class of{' '}
								{user.graduationYear || 'Year not set'}
							</p>
							<div className='flex items-center space-x-2 mt-2'>
								<Badge
									variant={
										user.profileComplete
											? 'default'
											: 'secondary'
									}
									className={
										user.profileComplete
											? 'bg-green-500 hover:bg-green-600'
											: 'bg-yellow-500 hover:bg-yellow-600'
									}
								>
									{user.profileComplete
										? '✅ Complete'
										: '⚠️ Incomplete'}
								</Badge>
								{user.gpa && (
									<Badge
										variant='outline'
										className='border-white/30 text-white'
									>
										🎯 GPA: {user.gpa}
									</Badge>
								)}
							</div>
						</div>
					</div>
					<div className='hidden md:block'>
						{!isEditing ? (
							<Button
								size='lg'
								variant='secondary'
								className='bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
								onClick={() => setIsEditing(true)}
							>
								<Edit className='mr-2 h-5 w-5' />
								Edit Profile
							</Button>
						) : (
							<div className='flex space-x-2'>
								<Button
									size='lg'
									variant='secondary'
									className='bg-green-500/80 backdrop-blur-sm border-white/20 text-white hover:bg-green-600/80'
									onClick={handleSave}
									disabled={isLoading}
								>
									<Save className='mr-2 h-5 w-5' />
									{isLoading ? 'Saving...' : 'Save'}
								</Button>
								<Button
									size='lg'
									variant='outline'
									className='border-white/30 text-white hover:bg-white/10'
									onClick={handleCancel}
								>
									<X className='mr-2 h-5 w-5' />
									Cancel
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Profile Summary Card */}
				<div className='space-y-6'>
					<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
						<CardHeader className='pb-4'>
							<div className='flex items-center space-x-3'>
								<div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
									<User className='h-5 w-5 text-white' />
								</div>
								<div>
									<CardTitle className='text-lg'>
										Contact Information
									</CardTitle>
									<CardDescription>
										Your personal details
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className='pt-0 space-y-4'>
							<div className='space-y-3'>
								<div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
									<Mail className='h-4 w-4 text-blue-600' />
									<div>
										<p className='text-xs text-gray-500'>
											Email
										</p>
										<p className='text-sm font-medium'>
											{user.email}
										</p>
									</div>
								</div>

								{(user.phone || isEditing) && (
									<div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
										<Phone className='h-4 w-4 text-green-600' />
										<div className='flex-1'>
											<p className='text-xs text-gray-500'>
												Phone
											</p>
											{isEditing ? (
												<Input
													value={formData.phone}
													onChange={(e) =>
														handleInputChange(
															'phone',
															e.target.value
														)
													}
													placeholder='+880 1XXX-XXXXXX'
													className='h-6 p-0 border-none bg-transparent text-sm font-medium'
												/>
											) : (
												<p className='text-sm font-medium'>
													{user.phone || 'Not set'}
												</p>
											)}
										</div>
									</div>
								)}

								<div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
									<GraduationCap className='h-4 w-4 text-purple-600' />
									<div>
										<p className='text-xs text-gray-500'>
											Major
										</p>
										<p className='text-sm font-medium'>
											{user.major || 'Not set'}
										</p>
									</div>
								</div>

								<div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
									<Calendar className='h-4 w-4 text-orange-600' />
									<div>
										<p className='text-xs text-gray-500'>
											Graduation Year
										</p>
										<p className='text-sm font-medium'>
											{user.graduationYear || 'Not set'}
										</p>
									</div>
								</div>

								{user.gpa && (
									<div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
										<Award className='h-4 w-4 text-yellow-600' />
										<div>
											<p className='text-xs text-gray-500'>
												GPA
											</p>
											<p className='text-sm font-medium'>
												{user.gpa}/4.00
											</p>
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Skills Card */}
					{user.skills && user.skills.length > 0 && (
						<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
							<CardHeader className='pb-4'>
								<div className='flex items-center space-x-3'>
									<div className='h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center'>
										<Target className='h-5 w-5 text-white' />
									</div>
									<div>
										<CardTitle className='text-lg'>
											Skills & Technologies
										</CardTitle>
										<CardDescription>
											Your technical expertise
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className='pt-0'>
								<div className='flex flex-wrap gap-2'>
									{user.skills.map((skill, index) => (
										<Badge
											key={index}
											variant='secondary'
											className='bg-blue-100 text-blue-800 hover:bg-blue-200'
										>
											{skill}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Profile Form */}
				<div className='lg:col-span-2 space-y-6'>
					<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
						<CardHeader className='pb-4'>
							<div className='flex items-center space-x-3'>
								<div className='h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center'>
									<BookOpen className='h-5 w-5 text-white' />
								</div>
								<div>
									<CardTitle className='text-lg'>
										Personal Information
									</CardTitle>
									<CardDescription>
										Update your profile information to
										improve your job prospects
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className='pt-0 space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<Label
										htmlFor='name'
										className='flex items-center'
									>
										<User className='h-4 w-4 mr-2' />
										Full Name *
									</Label>
									{isEditing ? (
										<Input
											id='name'
											value={formData.name}
											onChange={(e) =>
												handleInputChange(
													'name',
													e.target.value
												)
											}
											placeholder='Enter your full name'
											required
											className='focus:ring-2 focus:ring-blue-500'
										/>
									) : (
										<div className='p-3 border rounded-lg bg-gray-50 text-gray-900'>
											{user.name || 'Not set'}
										</div>
									)}
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='major'
										className='flex items-center'
									>
										<GraduationCap className='h-4 w-4 mr-2' />
										Major *
									</Label>
									{isEditing ? (
										<Input
											id='major'
											value={formData.major}
											onChange={(e) =>
												handleInputChange(
													'major',
													e.target.value
												)
											}
											placeholder='e.g., Computer Science & Engineering'
											required
											className='focus:ring-2 focus:ring-blue-500'
										/>
									) : (
										<div className='p-3 border rounded-lg bg-gray-50 text-gray-900'>
											{user.major || 'Not set'}
										</div>
									)}
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='graduationYear'
										className='flex items-center'
									>
										<Calendar className='h-4 w-4 mr-2' />
										Graduation Year *
									</Label>
									{isEditing ? (
										<Input
											id='graduationYear'
											type='number'
											min='2020'
											max='2030'
											value={formData.graduationYear}
											onChange={(e) =>
												handleInputChange(
													'graduationYear',
													e.target.value
												)
											}
											placeholder='e.g., 2025'
											required
											className='focus:ring-2 focus:ring-blue-500'
										/>
									) : (
										<div className='p-3 border rounded-lg bg-gray-50 text-gray-900'>
											{user.graduationYear || 'Not set'}
										</div>
									)}
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='gpa'
										className='flex items-center'
									>
										<Award className='h-4 w-4 mr-2' />
										GPA
									</Label>
									{isEditing ? (
										<Input
											id='gpa'
											type='number'
											step='0.01'
											min='0'
											max='4'
											value={formData.gpa}
											onChange={(e) =>
												handleInputChange(
													'gpa',
													e.target.value
												)
											}
											placeholder='e.g., 3.85'
											className='focus:ring-2 focus:ring-blue-500'
										/>
									) : (
										<div className='p-3 border rounded-lg bg-gray-50 text-gray-900'>
											{user.gpa
												? `${user.gpa}/4.00`
												: 'Not set'}
										</div>
									)}
								</div>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='resume'
									className='flex items-center'
								>
									<Briefcase className='h-4 w-4 mr-2' />
									Resume/Skills Summary *
								</Label>
								{isEditing ? (
									<Textarea
										id='resume'
										value={formData.resume}
										onChange={(e) =>
											handleInputChange(
												'resume',
												e.target.value
											)
										}
										placeholder='Describe your skills, experience, projects, and career goals...'
										rows={8}
										required
										className='focus:ring-2 focus:ring-blue-500 resize-none'
									/>
								) : (
									<div className='p-4 border rounded-lg bg-gray-50 text-gray-900 min-h-[200px] whitespace-pre-wrap'>
										{user.resume || 'Not set'}
									</div>
								)}
							</div>

							{/* Mobile Edit Buttons */}
							<div className='md:hidden'>
								{!isEditing ? (
									<Button
										onClick={() => setIsEditing(true)}
										className='w-full'
									>
										<Edit className='mr-2 h-4 w-4' />
										Edit Profile
									</Button>
								) : (
									<div className='flex space-x-3'>
										<Button
											onClick={handleSave}
											disabled={isLoading}
											className='flex-1'
										>
											<Save className='mr-2 h-4 w-4' />
											{isLoading
												? 'Saving...'
												: 'Save Changes'}
										</Button>
										<Button
											variant='outline'
											onClick={handleCancel}
											className='flex-1'
										>
											<X className='mr-2 h-4 w-4' />
											Cancel
										</Button>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Profile Completion Tips */}
					{!user.profileComplete && (
						<Card className='border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-100'>
							<CardContent className='p-6'>
								<div className='flex items-start space-x-4'>
									<div className='h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0'>
										<Star className='h-5 w-5 text-amber-600' />
									</div>
									<div>
										<h3 className='font-semibold text-amber-900 mb-2'>
											Complete Your Profile to Stand Out!
											🌟
										</h3>
										<ul className='text-sm text-amber-800 space-y-1'>
											<li>
												• Add a detailed resume/skills
												summary
											</li>
											<li>
												• Include your phone number for
												easy contact
											</li>
											<li>
												• List your technical skills and
												expertise
											</li>
											<li>
												• Keep your information up to
												date
											</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
