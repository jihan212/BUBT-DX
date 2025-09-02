import './globals.css';

export const metadata = {
	title: 'BUBT Career & Internship Opportunity Board',
	description:
		'Connect students with career opportunities and recruiters with talent',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='min-h-screen bg-background font-sans antialiased'>
				{children}
			</body>
		</html>
	);
}
