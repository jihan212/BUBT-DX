'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, Users, Briefcase } from 'lucide-react';

export default function AdminLayout({ children }) {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		// Get user data from cookie
		const getUserFromCookie = () => {
			try {
				const cookieValue = document.cookie
					.split('; ')
					.find((row) => row.startsWith('user_session='));

				if (cookieValue) {
					const userData = JSON.parse(
						decodeURIComponent(cookieValue.split('=')[1])
					);
					setUser(userData);
				}
			} catch (error) {
				console.error('Error parsing user data:', error);
			}
		};

		getUserFromCookie();
	}, []);

	const handleLogout = async () => {
		try {
			await fetch('/api/auth', { method: 'DELETE' });
			document.cookie =
				'user_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			router.push('/auth');
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						<div className='flex items-center'>
							<Shield className='h-8 w-8 text-blue-600 mr-3' />
							<div>
								<h1 className='text-xl font-bold text-gray-900'>
									Admin Panel
								</h1>
								<p className='text-sm text-gray-500'>
									BUBT Career Board
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<div className='text-right'>
								<p className='text-sm font-medium text-gray-900'>
									{user?.name}
								</p>
								<p className='text-xs text-gray-500'>
									{user?.email}
								</p>
							</div>
							<Button
								onClick={handleLogout}
								variant='outline'
								size='sm'
							>
								<LogOut className='h-4 w-4 mr-2' />
								Logout
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
				{children}
			</main>
		</div>
	);
}
