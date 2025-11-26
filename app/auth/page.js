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
	const [activeTab, setActiveTab] = useState('student');
	const router = useRouter();

	const handleLogin = async (role, email, password) => {
		setIsLoading(true);
		setError('');

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
					<p className='text-gray-600'>Sign in to your account</p>
				</div>

				<Tabs
					defaultValue='student'
					className='w-full'
					value={activeTab}
					onValueChange={setActiveTab}
				>
					{/* <TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='student'>Student Login</TabsTrigger>
						<TabsTrigger value='recruiter'>
							Recruiter Login
						</TabsTrigger>
					</TabsList> */}

					<TabsContent value='student'>
						<StudentLoginForm
							onLogin={handleLogin}
							isLoading={isLoading}
							error={error}
						/>
					</TabsContent>

					<TabsContent value='recruiter'>
						<RecruiterLoginForm
							onLogin={handleLogin}
							isLoading={isLoading}
							error={error}
						/>
					</TabsContent>
				</Tabs>

				<div className='mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
					<p className='text-sm font-semibold text-gray-900 mb-3'>
						Demo Credentials (Click to login):
					</p>
					<div className='space-y-2'>
						<button
							onClick={() => {
								setActiveTab('student');
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
								setActiveTab('recruiter');
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
								setActiveTab('student');
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
