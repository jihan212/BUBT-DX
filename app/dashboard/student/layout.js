'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { User, FileText, LogOut, Menu, Home, Briefcase } from 'lucide-react';

export default function StudentLayout({ children }) {
	const [user, setUser] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Get user data from cookie (in a real app, you'd use a proper auth context)
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

	const navigation = [
		{ name: 'Dashboard', href: '/dashboard/student', icon: Home },
		{ name: 'My Profile', href: '/dashboard/student/profile', icon: User },
		{
			name: 'My Applications',
			href: '/dashboard/student/applications',
			icon: FileText,
		},
		{
			name: 'Browse Jobs',
			href: '/dashboard/student/jobs',
			icon: Briefcase,
		},
	];

	const SidebarContent = () => (
		<div className='flex h-full flex-col'>
			<div className='flex h-16 items-center border-b px-4'>
				<h2 className='text-lg font-semibold'>Student Portal</h2>
			</div>
			<nav className='flex-1 space-y-1 p-4'>
				{navigation.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
								isActive
									? 'bg-blue-100 text-blue-700'
									: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
							}`}
							onClick={() => setSidebarOpen(false)}
						>
							<item.icon className='mr-3 h-5 w-5' />
							{item.name}
						</Link>
					);
				})}
			</nav>
			<div className='border-t p-4'>
				<div className='flex items-center space-x-3 mb-4'>
					<div className='h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium'>
						{user?.name?.charAt(0) || 'S'}
					</div>
					<div className='flex-1 min-w-0'>
						<p className='text-sm font-medium text-gray-900 truncate'>
							{user?.name || 'Student'}
						</p>
						<p className='text-xs text-gray-500 truncate'>
							{user?.email || ''}
						</p>
					</div>
				</div>
				<Button
					onClick={handleLogout}
					variant='outline'
					className='w-full justify-start'
				>
					<LogOut className='mr-2 h-4 w-4' />
					Logout
				</Button>
			</div>
		</div>
	);

	return (
		<div className='flex h-screen bg-gray-50'>
			{/* Desktop Sidebar */}
			<div className='hidden md:flex md:w-64 md:flex-col'>
				<div className='flex flex-col flex-1 bg-white border-r border-gray-200'>
					<SidebarContent />
				</div>
			</div>

			{/* Mobile Sidebar */}
			<Sheet
				open={sidebarOpen}
				onOpenChange={setSidebarOpen}
			>
				<SheetContent
					side='left'
					className='p-0 w-64'
				>
					<SidebarContent />
				</SheetContent>
			</Sheet>

			{/* Main Content */}
			<div className='flex-1 flex flex-col overflow-hidden'>
				{/* Mobile Header */}
				<div className='md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200'>
					<h1 className='text-lg font-semibold'>Student Portal</h1>
					<Sheet
						open={sidebarOpen}
						onOpenChange={setSidebarOpen}
					>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
							>
								<Menu className='h-6 w-6' />
							</Button>
						</SheetTrigger>
					</Sheet>
				</div>

				{/* Page Content */}
				<main className='flex-1 overflow-y-auto p-6'>{children}</main>
			</div>
		</div>
	);
}
