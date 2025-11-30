import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-poppins',
});

export const metadata = {
	title: 'BUBT Career & Internship Opportunity Board',
	description:
		'Connect students with career opportunities and recruiters with talent',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={poppins.variable}>
			<body className='min-h-screen bg-background font-sans antialiased'>
				{children}
			</body>
		</html>
	);
}
