import Link from 'next/link';

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
			{/* Header */}
			<header className='relative z-10'>
				<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
								<span className='text-white font-bold text-lg'>
									B
								</span>
							</div>
							<span className='text-xl font-bold text-gray-900'>
								BUBT Career Board
							</span>
						</div>
						<Link
							href='/auth'
							className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'
						>
							Sign In
						</Link>
					</div>
				</nav>
			</header>

			{/* Hero Section */}
			<section className='relative pt-20 pb-32'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
							Launch Your Career with{' '}
							<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
								BUBT
							</span>
						</h1>
						<p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed'>
							Connect with top employers, discover exciting
							opportunities, and take the next step in your
							professional journey. Your dream career starts here.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Link
								href='/auth'
								className='bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1'
							>
								Get Started Today →
							</Link>
							<button className='text-gray-600 hover:text-gray-900 px-8 py-4 font-medium transition-colors'>
								Learn More
							</button>
						</div>
					</div>
				</div>

				{/* Background Elements */}
				<div className='absolute inset-0 overflow-hidden pointer-events-none'>
					<div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl'></div>
					<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl'></div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 bg-white/50 backdrop-blur-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
							Everything You Need to Succeed
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Our platform connects students, recruiters, and
							opportunities in one seamless experience.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* For Students */}
						<div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
							<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6'>
								<span className='text-white text-2xl'>👨‍🎓</span>
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-4'>
								For Students
							</h3>
							<p className='text-gray-600 mb-6'>
								Build your profile, discover opportunities, and
								track your applications all in one place.
							</p>
							<ul className='space-y-2 text-sm text-gray-600'>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
									Browse job opportunities
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
									Track application status
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
									Build professional profile
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
									Connect with recruiters
								</li>
							</ul>
						</div>

						{/* For Recruiters */}
						<div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
							<div className='w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6'>
								<span className='text-white text-2xl'>💼</span>
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-4'>
								For Recruiters
							</h3>
							<p className='text-gray-600 mb-6'>
								Find top talent, manage applications, and
								streamline your hiring process.
							</p>
							<ul className='space-y-2 text-sm text-gray-600'>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
									Post job openings
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
									Review applications
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
									Manage hiring pipeline
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
									Connect with candidates
								</li>
							</ul>
						</div>

						{/* Platform Features */}
						<div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
							<div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6'>
								<span className='text-white text-2xl'>⚡</span>
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-4'>
								Smart Platform
							</h3>
							<p className='text-gray-600 mb-6'>
								Built with modern technology for a seamless and
								intuitive experience.
							</p>
							<ul className='space-y-2 text-sm text-gray-600'>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
									Real-time notifications
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
									Advanced search filters
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
									Mobile-friendly design
								</li>
								<li className='flex items-center'>
									<span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
									Secure & reliable
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Demo Section */}
			<section className='py-20 bg-gradient-to-br from-gray-50 to-gray-100'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
							Try the Demo
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Explore the platform with our demo accounts and see
							how it works for different user types.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
						{/* Student Demo */}
						<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<div className='text-center mb-4'>
								<div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3'>
									<span className='text-white text-xl'>
										👨‍🎓
									</span>
								</div>
								<h3 className='text-lg font-semibold text-blue-900'>
									Student Demo
								</h3>
								<p className='text-sm text-blue-700'>
									Experience the student portal
								</p>
							</div>
							<div className='space-y-2 text-sm'>
								<div className='bg-blue-50 p-3 rounded-lg'>
									<div className='font-medium text-gray-700'>
										Email:
									</div>
									<code className='text-blue-800 font-mono'>
										monisa.biswas@student.bubt.edu
									</code>
								</div>
								<div className='bg-blue-50 p-3 rounded-lg'>
									<div className='font-medium text-gray-700'>
										Password:
									</div>
									<code className='text-blue-800 font-mono'>
										password123
									</code>
								</div>
							</div>
						</div>

						{/* Recruiter Demo */}
						<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<div className='text-center mb-4'>
								<div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3'>
									<span className='text-white text-xl'>
										💼
									</span>
								</div>
								<h3 className='text-lg font-semibold text-green-900'>
									Recruiter Demo
								</h3>
								<p className='text-sm text-green-700'>
									Explore the recruiter dashboard
								</p>
							</div>
							<div className='space-y-2 text-sm'>
								<div className='bg-green-50 p-3 rounded-lg'>
									<div className='font-medium text-gray-700'>
										Email:
									</div>
									<code className='text-green-800 font-mono'>
										hr@techcorp.com
									</code>
								</div>
								<div className='bg-green-50 p-3 rounded-lg'>
									<div className='font-medium text-gray-700'>
										Password:
									</div>
									<code className='text-green-800 font-mono'>
										password123
									</code>
								</div>
							</div>
						</div>

						{/* Admin Demo */}
						<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<div className='text-center mb-4'>
								<div className='w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3'>
									<span className='text-white text-xl'>
										🛡️
									</span>
								</div>
								<h3 className='text-lg font-semibold text-purple-900'>
									Admin Demo
								</h3>
								<p className='text-sm text-purple-700'>
									See the admin panel
								</p>
							</div>
							<div className='space-y-2 text-sm'>
								<div className='bg-purple-50 p-3 rounded-lg'>
									<div className='font-medium text-gray-700'>
										Email:
									</div>
									<code className='text-purple-800 font-mono'>
										admin@bubt.edu
									</code>
								</div>
								<div className='bg-purple-50 p-3 rounded-lg'>
									<div className='font-medium text-gray-700'>
										Password:
									</div>
									<code className='text-purple-800 font-mono'>
										admin123
									</code>
								</div>
							</div>
						</div>
					</div>

					<div className='text-center mt-12'>
						<Link
							href='/auth'
							className='inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1'
						>
							Start Exploring →
						</Link>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						Ready to Get Started?
					</h2>
					<p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
						Join thousands of students and recruiters who are
						already using BUBT Career Board to achieve their goals.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Link
							href='/auth'
							className='bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1'
						>
							Create Account
						</Link>
						<Link
							href='/auth'
							className='border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg'
						>
							Sign In
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-900 text-white py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div className='col-span-1 md:col-span-2'>
							<div className='flex items-center space-x-2 mb-4'>
								<div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
									<span className='text-white font-bold'>
										B
									</span>
								</div>
								<span className='text-xl font-bold'>
									BUBT Career Board
								</span>
							</div>
							<p className='text-gray-400 mb-4 max-w-md'>
								Connecting talented students with amazing
								opportunities. Built for the future of career
								development.
							</p>
							<div className='text-sm text-gray-500'>
								© 2024 BUBT Career Board. All rights reserved.
							</div>
						</div>

						<div>
							<h3 className='text-lg font-semibold mb-4'>
								Platform
							</h3>
							<ul className='space-y-2 text-gray-400'>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										For Students
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										For Recruiters
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										Features
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										Pricing
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='text-lg font-semibold mb-4'>
								Support
							</h3>
							<ul className='space-y-2 text-gray-400'>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										Help Center
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										Contact Us
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white transition-colors'
									>
										Terms of Service
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
