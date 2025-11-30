'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export default function AuthPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
	const [userType, setUserType] = useState('student'); // 'student' or 'recruiter'
	const router = useRouter();

	const handleLogin = async (role, email, password) => {
		setIsLoading(true);
		setError('');
		setSuccessMessage('');

		try {
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				// Redirect based on user role
				if (data.user.role === 'student') {
					router.push('/dashboard/student');
				} else if (data.user.role === 'recruiter') {
					router.push('/dashboard/recruiter');
				} else if (data.user.role === 'admin') {
					router.push('/dashboard/admin');
				}
			} else {
				setError(data.error || 'Login failed');
			}
		} catch (error) {
			setError('Network error. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegister = async (userData) => {
		setIsLoading(true);
		setError('');
		setSuccessMessage('');

		try {
			const response = await fetch('/api/auth', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			const data = await response.json();

			if (response.ok) {
				setSuccessMessage('Registration successful! Redirecting...');
				// Redirect based on user role
				setTimeout(() => {
					if (data.user.role === 'student') {
						router.push('/dashboard/student');
					} else if (data.user.role === 'recruiter') {
						router.push('/dashboard/recruiter');
					}
				}, 1500);
			} else {
				setError(data.error || 'Registration failed');
			}
		} catch (error) {
			setError('Network error. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleDemoLogin = (email, password) => {
		handleLogin(null, email, password);
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						BUBT Career Board
					</h1>
					<p className='text-gray-600'>
						{authMode === 'signin'
							? 'Sign in to your account'
							: 'Create a new account'}
					</p>
				</div>

				{/* Auth Mode Tabs */}
				<div className='mb-6'>
					<Tabs
						value={authMode}
						onValueChange={setAuthMode}
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='signin'>Sign In</TabsTrigger>
							<TabsTrigger value='signup'>Sign Up</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{/* User Type Tabs */}
				<div className='mb-6'>
					<Tabs
						value={userType}
						onValueChange={setUserType}
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='student'>Student</TabsTrigger>
							<TabsTrigger value='recruiter'>Recruiter</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{/* Forms */}
				{authMode === 'signin' ? (
					userType === 'student' ? (
						<StudentLoginForm
							onLogin={handleLogin}
							isLoading={isLoading}
							error={error}
						/>
					) : (
						<RecruiterLoginForm
							onLogin={handleLogin}
							isLoading={isLoading}
							error={error}
						/>
					)
				) : userType === 'student' ? (
					<StudentSignupForm
						onRegister={handleRegister}
						isLoading={isLoading}
						error={error}
						successMessage={successMessage}
					/>
				) : (
					<RecruiterSignupForm
						onRegister={handleRegister}
						isLoading={isLoading}
						error={error}
						successMessage={successMessage}
					/>
				)}

				<div className='mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
					<p className='text-sm font-semibold text-gray-900 mb-3'>
						Demo Credentials (Click to login):
					</p>
					<div className='space-y-2'>
						<button
							onClick={() => {
								setUserType('student');
								setAuthMode('signin');
								handleDemoLogin(
									'monisa.biswas@student.bubt.edu',
									'password123'
								);
							}}
							disabled={isLoading}
							className='w-full text-left p-2 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-blue-200'
						>
							<p className='text-sm font-medium text-blue-600 hover:text-blue-700'>
								Student: monisa.biswas@student.bubt.edu
							</p>
							<p className='text-xs text-gray-500'>password123</p>
						</button>
						<button
							onClick={() => {
								setUserType('recruiter');
								setAuthMode('signin');
								handleDemoLogin(
									'hr@techcorp.com',
									'password123'
								);
							}}
							disabled={isLoading}
							className='w-full text-left p-2 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-blue-200'
						>
							<p className='text-sm font-medium text-blue-600 hover:text-blue-700'>
								Recruiter: hr@techcorp.com
							</p>
							<p className='text-xs text-gray-500'>password123</p>
						</button>
						<button
							onClick={() => {
								setUserType('student');
								setAuthMode('signin');
								handleDemoLogin('admin@bubt.edu', 'admin123');
							}}
							disabled={isLoading}
							className='w-full text-left p-2 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-blue-200'
						>
							<p className='text-sm font-medium text-blue-600 hover:text-blue-700'>
								Admin: admin@bubt.edu
							</p>
							<p className='text-xs text-gray-500'>admin123</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function StudentLoginForm({ onLogin, isLoading, error }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin('student', email, password);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle> Login</CardTitle>
				<CardDescription>
					Access your dashboard and job opportunities
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div className='space-y-2'>
						<Label htmlFor='student-email'>Email</Label>
						<Input
							id='student-email'
							type='email'
							placeholder='your.email@student.bubt.edu'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='student-password'>Password</Label>
						<Input
							id='student-password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className='text-sm text-red-600'>{error}</p>}
					<Button
						type='submit'
						className='w-full'
						disabled={isLoading}
					>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

function RecruiterLoginForm({ onLogin, isLoading, error }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin('recruiter', email, password);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recruiter Login</CardTitle>
				<CardDescription>
					Manage your job postings and review applications
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div className='space-y-2'>
						<Label htmlFor='recruiter-email'>Email</Label>
						<Input
							id='recruiter-email'
							type='email'
							placeholder='hr@company.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='recruiter-password'>Password</Label>
						<Input
							id='recruiter-password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className='text-sm text-red-600'>{error}</p>}
					<Button
						type='submit'
						className='w-full'
						disabled={isLoading}
					>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

function StudentSignupForm({ onRegister, isLoading, error, successMessage }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		major: '',
		graduationYear: '',
		phone: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			return;
		}

		if (formData.password.length < 6) {
			return;
		}

		const registrationData = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
			role: 'student',
			major: formData.major,
			graduationYear: formData.graduationYear,
			phone: formData.phone,
		};

		onRegister(registrationData);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Student Sign Up</CardTitle>
				<CardDescription>
					Create your student account to browse jobs and apply
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div className='space-y-2'>
						<Label htmlFor='signup-name'>Full Name *</Label>
						<Input
							id='signup-name'
							name='name'
							type='text'
							placeholder='Enter your full name'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='signup-email'>Email *</Label>
						<Input
							id='signup-email'
							name='email'
							type='email'
							placeholder='your.email@student.bubt.edu'
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<p className='text-xs text-gray-500'>
							Must be a @student.bubt.edu email
						</p>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='signup-major'>Major</Label>
						<Input
							id='signup-major'
							name='major'
							type='text'
							placeholder='e.g., Computer Science & Engineering'
							value={formData.major}
							onChange={handleChange}
						/>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='signup-grad-year'>Graduation Year</Label>
							<Input
								id='signup-grad-year'
								name='graduationYear'
								type='number'
								min='2024'
								max='2030'
								placeholder='2025'
								value={formData.graduationYear}
								onChange={handleChange}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='signup-phone'>Phone</Label>
							<Input
								id='signup-phone'
								name='phone'
								type='tel'
								placeholder='+880 1XXX-XXXXXX'
								value={formData.phone}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='signup-password'>Password *</Label>
						<Input
							id='signup-password'
							name='password'
							type='password'
							placeholder='At least 6 characters'
							value={formData.password}
							onChange={handleChange}
							minLength={6}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='signup-confirm-password'>
							Confirm Password *
						</Label>
						<Input
							id='signup-confirm-password'
							name='confirmPassword'
							type='password'
							placeholder='Re-enter your password'
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
						{formData.password &&
							formData.confirmPassword &&
							formData.password !== formData.confirmPassword && (
								<p className='text-xs text-red-600'>
									Passwords do not match
								</p>
							)}
					</div>
					{error && <p className='text-sm text-red-600'>{error}</p>}
					{successMessage && (
						<p className='text-sm text-green-600'>{successMessage}</p>
					)}
					<Button
						type='submit'
						className='w-full'
						disabled={
							isLoading ||
							formData.password !== formData.confirmPassword ||
							formData.password.length < 6
						}
					>
						{isLoading ? 'Creating account...' : 'Create Account'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

function RecruiterSignupForm({ onRegister, isLoading, error, successMessage }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		company: '',
		position: '',
		phone: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			return;
		}

		if (formData.password.length < 6) {
			return;
		}

		const registrationData = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
			role: 'recruiter',
			company: formData.company,
			position: formData.position,
			phone: formData.phone,
		};

		onRegister(registrationData);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recruiter Sign Up</CardTitle>
				<CardDescription>
					Create your recruiter account to post jobs and find talent
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div className='space-y-2'>
						<Label htmlFor='recruiter-signup-name'>Full Name *</Label>
						<Input
							id='recruiter-signup-name'
							name='name'
							type='text'
							placeholder='Enter your full name'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='recruiter-signup-email'>Email *</Label>
						<Input
							id='recruiter-signup-email'
							name='email'
							type='email'
							placeholder='hr@company.com'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='recruiter-signup-company'>Company Name *</Label>
						<Input
							id='recruiter-signup-company'
							name='company'
							type='text'
							placeholder='Your company name'
							value={formData.company}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='recruiter-signup-position'>
								Position
							</Label>
							<Input
								id='recruiter-signup-position'
								name='position'
								type='text'
								placeholder='e.g., HR Manager'
								value={formData.position}
								onChange={handleChange}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='recruiter-signup-phone'>Phone</Label>
							<Input
								id='recruiter-signup-phone'
								name='phone'
								type='tel'
								placeholder='+880 1XXX-XXXXXX'
								value={formData.phone}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='recruiter-signup-password'>Password *</Label>
						<Input
							id='recruiter-signup-password'
							name='password'
							type='password'
							placeholder='At least 6 characters'
							value={formData.password}
							onChange={handleChange}
							minLength={6}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='recruiter-signup-confirm-password'>
							Confirm Password *
						</Label>
						<Input
							id='recruiter-signup-confirm-password'
							name='confirmPassword'
							type='password'
							placeholder='Re-enter your password'
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
						{formData.password &&
							formData.confirmPassword &&
							formData.password !== formData.confirmPassword && (
								<p className='text-xs text-red-600'>
									Passwords do not match
								</p>
							)}
					</div>
					{error && <p className='text-sm text-red-600'>{error}</p>}
					{successMessage && (
						<p className='text-sm text-green-600'>{successMessage}</p>
					)}
					<Button
						type='submit'
						className='w-full'
						disabled={
							isLoading ||
							formData.password !== formData.confirmPassword ||
							formData.password.length < 6
						}
					>
						{isLoading ? 'Creating account...' : 'Create Account'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
