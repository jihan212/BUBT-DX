// Dummy data for the BUBT Career & Internship Opportunity Board

// Users data
export const users = {
	students: [
		{
			id: 'student1',
			email: 'john.doe@student.bubt.edu',
			password: 'password123',
			name: 'John Doe',
			major: 'Computer Science & Engineering',
			graduationYear: 2025,
			resume: 'Passionate full-stack developer with 2+ years of experience in React, Node.js, and Python. Built 5+ web applications including an e-commerce platform and a task management system. Strong problem-solving skills and experience with modern development tools.',
			profileComplete: true,
			applications: ['job1', 'job3', 'job4'],
			phone: '+880 1712-345678',
			skills: [
				'React',
				'Node.js',
				'Python',
				'MongoDB',
				'JavaScript',
				'TypeScript',
			],
			gpa: '3.85',
		},
		{
			id: 'student2',
			email: 'jane.smith@student.bubt.edu',
			password: 'password123',
			name: 'Jane Smith',
			major: 'Business Administration',
			graduationYear: 2024,
			resume: 'Dynamic marketing professional with internship experience at 3 companies. Led social media campaigns that increased engagement by 40%. Strong analytical skills with proficiency in Google Analytics and social media management tools.',
			profileComplete: true,
			applications: ['job2', 'job5'],
			phone: '+880 1798-765432',
			skills: [
				'Digital Marketing',
				'Content Creation',
				'Analytics',
				'Social Media',
				'Adobe Creative Suite',
			],
			gpa: '3.92',
		},
		{
			id: 'student3',
			email: 'mike.johnson@student.bubt.edu',
			password: 'password123',
			name: 'Mike Johnson',
			major: 'Electrical & Electronic Engineering',
			graduationYear: 2025,
			resume: 'Electronics enthusiast specializing in IoT and embedded systems. Completed 3 major projects including a smart home automation system. Experience with Arduino, Raspberry Pi, and circuit design.',
			profileComplete: false,
			applications: ['job6'],
			phone: '+880 1634-567890',
			skills: [
				'Arduino',
				'Raspberry Pi',
				'C/C++',
				'Circuit Design',
				'IoT',
			],
			gpa: '3.67',
		},
		{
			id: 'student4',
			email: 'sarah.ahmed@student.bubt.edu',
			password: 'password123',
			name: 'Sarah Ahmed',
			major: 'Textile Engineering',
			graduationYear: 2024,
			resume: 'Textile engineering student with focus on sustainable fashion and quality control. Completed internship at leading garment manufacturer. Passionate about innovation in textile technology.',
			profileComplete: true,
			applications: ['job7'],
			phone: '+880 1876-543210',
			skills: [
				'Quality Control',
				'Textile Technology',
				'Sustainability',
				'CAD Design',
			],
			gpa: '3.78',
		},
		{
			id: 'student5',
			email: 'rahul.hasan@student.bubt.edu',
			password: 'password123',
			name: 'Rahul Hasan',
			major: 'Civil Engineering',
			graduationYear: 2025,
			resume: 'Aspiring civil engineer with strong foundation in structural design and project management. Worked on 2 construction site internships and familiar with AutoCAD and project planning software.',
			profileComplete: true,
			applications: ['job8'],
			phone: '+880 1923-456789',
			skills: [
				'AutoCAD',
				'Project Management',
				'Structural Design',
				'Site Management',
			],
			gpa: '3.71',
		},
	],
	recruiters: [
		{
			id: 'recruiter1',
			email: 'hr@techcorp.com',
			password: 'password123',
			name: 'Sarah Wilson',
			company: 'TechCorp Bangladesh',
			position: 'Senior HR Manager',
			jobs: ['job1', 'job2'],
			phone: '+880 1711-234567',
		},
		{
			id: 'recruiter2',
			email: 'recruiter2@company.com',
			password: 'password123',
			name: 'David Chen',
			company: 'Innovatix Solutions',
			position: 'Head of Talent Acquisition',
			jobs: ['job3', 'job4'],
			phone: '+880 1812-345678',
		},
		{
			id: 'recruiter3',
			email: 'recruiter3@company.com',
			password: 'password123',
			name: 'Fatima Rahman',
			company: 'Digital Dynamics Ltd',
			position: 'Recruitment Specialist',
			jobs: ['job5', 'job6'],
			phone: '+880 1934-567890',
		},
	],
	admin: {
		id: 'admin1',
		email: 'admin@bubt.edu',
		password: 'admin123',
		name: 'Admin User',
	},
};

// Jobs data
export const jobs = [
	{
		id: 'job1',
		title: 'Frontend Developer',
		company: 'TechCorp Bangladesh',
		description:
			'We are looking for a passionate Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern technologies like React, Vue.js, and TypeScript. Work with our design team to create beautiful, responsive user interfaces.',
		requirements:
			"Bachelor's degree in Computer Science or related field. 2+ years experience with React/Vue.js. Strong knowledge of HTML5, CSS3, JavaScript ES6+. Experience with REST APIs and version control (Git).",
		benefits:
			'Competitive salary, health insurance, flexible working hours, professional development budget, modern office environment.',
		department: 'Engineering',
		type: 'Full-time',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 60,000 - 80,000',
		skills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Git'],
		postedBy: 'recruiter1',
		postedDate: '2024-02-01',
		applicationDeadline: '2024-03-01',
		applications: [
			{
				id: 'app1',
				studentId: 'student1',
				studentName: 'John Doe',
				studentEmail: 'john.doe@student.bubt.edu',
				appliedDate: '2024-02-05',
				status: 'Interview',
				coverLetter:
					'I am very interested in this position and believe my skills in React and Node.js make me a great fit for your team. I have built several web applications and am passionate about creating great user experiences.',
			},
			{
				id: 'app4',
				studentId: 'student3',
				studentName: 'Mike Johnson',
				studentEmail: 'mike.johnson@student.bubt.edu',
				appliedDate: '2024-02-03',
				status: 'Pending',
				coverLetter:
					'Although my background is in electronics, I have been learning web development and am excited to transition into frontend development.',
			},
		],
	},
	{
		id: 'job2',
		title: 'Marketing Intern',
		company: 'TechCorp Bangladesh',
		description:
			'Exciting opportunity for marketing students to gain hands-on experience in digital marketing, content creation, and social media management. Work closely with our marketing team on real campaigns.',
		requirements:
			'Currently pursuing degree in Marketing, Business Administration, or related field. Basic knowledge of social media platforms. Creative mindset and excellent communication skills.',
		benefits:
			'Stipend, mentorship program, certificate of completion, networking opportunities, potential for full-time offer.',
		department: 'Marketing',
		type: 'Internship',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 15,000 (stipend)',
		skills: [
			'Social Media',
			'Content Creation',
			'Analytics',
			'Communication',
		],
		postedBy: 'recruiter1',
		postedDate: '2024-02-02',
		applicationDeadline: '2024-02-25',
		applications: [
			{
				id: 'app2',
				studentId: 'student2',
				studentName: 'Jane Smith',
				studentEmail: 'jane.smith@student.bubt.edu',
				appliedDate: '2024-02-06',
				status: 'Reviewed',
				coverLetter:
					'I am excited about this marketing internship opportunity and eager to contribute to your team with my business administration background and social media experience.',
			},
		],
	},
	{
		id: 'job3',
		title: 'Software Engineer',
		company: 'Innovatix Solutions',
		description:
			'Join our innovative software development team to work on cutting-edge projects using the latest technologies and methodologies. Develop scalable web applications and work with cross-functional teams.',
		requirements:
			"Bachelor's degree in Computer Science. 3+ years of software development experience. Proficiency in Python, Java, or Node.js. Experience with databases and cloud platforms.",
		benefits:
			'Competitive salary, stock options, health & dental insurance, flexible work arrangements, learning & development budget.',
		department: 'Engineering',
		type: 'Full-time',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 70,000 - 90,000',
		skills: ['Python', 'Java', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
		postedBy: 'recruiter2',
		postedDate: '2024-02-03',
		applicationDeadline: '2024-03-05',
		applications: [
			{
				id: 'app3',
				studentId: 'student1',
				studentName: 'John Doe',
				studentEmail: 'john.doe@student.bubt.edu',
				appliedDate: '2024-02-07',
				status: 'Pending',
				coverLetter:
					'I would love to join your innovative team and contribute to cutting-edge software development projects. My experience with full-stack development aligns well with your requirements.',
			},
		],
	},
	{
		id: 'job4',
		title: 'UI/UX Designer',
		company: 'Innovatix Solutions',
		description:
			'We are seeking a creative UI/UX Designer to join our design team. Create intuitive and visually appealing user interfaces for web and mobile applications. Collaborate with developers and product managers.',
		requirements:
			"Bachelor's degree in Design or related field. 2+ years of UI/UX design experience. Proficiency in Figma, Adobe Creative Suite. Strong portfolio showcasing design projects.",
		benefits:
			'Competitive salary, creative freedom, modern design tools, team collaboration, professional growth opportunities.',
		department: 'Design',
		type: 'Full-time',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 55,000 - 75,000',
		skills: [
			'Figma',
			'Adobe XD',
			'Photoshop',
			'User Research',
			'Prototyping',
		],
		postedBy: 'recruiter2',
		postedDate: '2024-02-04',
		applicationDeadline: '2024-03-10',
		applications: [],
	},
	{
		id: 'job5',
		title: 'Digital Marketing Specialist',
		company: 'Digital Dynamics Ltd',
		description:
			'Looking for a Digital Marketing Specialist to develop and execute digital marketing campaigns across various channels. Manage social media, content marketing, and SEO strategies.',
		requirements:
			"Bachelor's degree in Marketing or related field. 2+ years digital marketing experience. Knowledge of Google Ads, Facebook Ads, SEO tools. Analytics and reporting skills.",
		benefits:
			'Competitive salary, performance bonuses, health insurance, professional development, remote work options.',
		department: 'Marketing',
		type: 'Full-time',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 45,000 - 65,000',
		skills: [
			'Google Ads',
			'Facebook Ads',
			'SEO',
			'Analytics',
			'Content Marketing',
		],
		postedBy: 'recruiter3',
		postedDate: '2024-02-05',
		applicationDeadline: '2024-03-15',
		applications: [
			{
				id: 'app5',
				studentId: 'student2',
				studentName: 'Jane Smith',
				studentEmail: 'jane.smith@student.bubt.edu',
				appliedDate: '2024-02-08',
				status: 'Pending',
				coverLetter:
					'My experience in digital marketing and proven track record of successful campaigns make me an ideal candidate for this position.',
			},
		],
	},
	{
		id: 'job6',
		title: 'Electronics Engineer',
		company: 'Digital Dynamics Ltd',
		description:
			'Join our hardware team as an Electronics Engineer. Design and develop electronic systems and circuits for IoT devices. Work on innovative projects in the tech industry.',
		requirements:
			"Bachelor's degree in Electrical/Electronics Engineering. Experience with circuit design, PCB layout. Knowledge of microcontrollers, sensors, and embedded systems.",
		benefits:
			'Competitive salary, project bonuses, health coverage, technical training, innovation time.',
		department: 'Hardware',
		type: 'Full-time',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 50,000 - 70,000',
		skills: [
			'Circuit Design',
			'PCB Layout',
			'Arduino',
			'Embedded Systems',
			'IoT',
		],
		postedBy: 'recruiter3',
		postedDate: '2024-02-06',
		applicationDeadline: '2024-03-20',
		applications: [
			{
				id: 'app6',
				studentId: 'student3',
				studentName: 'Mike Johnson',
				studentEmail: 'mike.johnson@student.bubt.edu',
				appliedDate: '2024-02-09',
				status: 'Reviewed',
				coverLetter:
					'My background in electronics engineering and hands-on experience with IoT projects align perfectly with this role.',
			},
		],
	},
	{
		id: 'job7',
		title: 'Quality Control Manager',
		company: 'Textile Innovations Ltd',
		description:
			'Seeking an experienced Quality Control Manager for our textile manufacturing facility. Ensure product quality, implement quality systems, and lead quality improvement initiatives.',
		requirements:
			"Bachelor's degree in Textile Engineering or related field. 3+ years quality control experience. Knowledge of quality management systems, testing procedures.",
		benefits:
			'Competitive salary, performance incentives, health insurance, career advancement, training programs.',
		department: 'Quality Assurance',
		type: 'Full-time',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 55,000 - 75,000',
		skills: [
			'Quality Control',
			'Testing Procedures',
			'ISO Standards',
			'Team Leadership',
		],
		postedBy: 'recruiter1',
		postedDate: '2024-02-07',
		applicationDeadline: '2024-03-25',
		applications: [
			{
				id: 'app7',
				studentId: 'student4',
				studentName: 'Sarah Ahmed',
				studentEmail: 'sarah.ahmed@student.bubt.edu',
				appliedDate: '2024-02-10',
				status: 'Interview',
				coverLetter:
					'My textile engineering background and focus on quality control make me an excellent fit for this management position.',
			},
		],
	},
	{
		id: 'job8',
		title: 'Project Engineer',
		company: 'Construction Solutions Ltd',
		description:
			'Looking for a Project Engineer to support construction projects from planning to completion. Coordinate with teams, manage project timelines, and ensure quality standards.',
		requirements:
			"Bachelor's degree in Civil Engineering. 1-2 years project experience. Knowledge of project management tools, AutoCAD. Strong communication skills.",
		benefits:
			'Competitive salary, project completion bonuses, health benefits, career growth, site allowances.',
		department: 'Engineering',
		type: 'Full-time',
		location: 'Dhaka, Bangladesh',
		salary: 'BDT 40,000 - 60,000',
		skills: [
			'Project Management',
			'AutoCAD',
			'Construction Management',
			'Team Coordination',
		],
		postedBy: 'recruiter2',
		postedDate: '2024-02-08',
		applicationDeadline: '2024-03-30',
		applications: [
			{
				id: 'app8',
				studentId: 'student5',
				studentName: 'Rahul Hasan',
				studentEmail: 'rahul.hasan@student.bubt.edu',
				appliedDate: '2024-02-11',
				status: 'Pending',
				coverLetter:
					'My civil engineering education and internship experience in construction projects prepare me well for this project engineer role.',
			},
		],
	},
];

// Helper functions
export function getUserByEmail(email) {
	// Check students
	const student = users.students.find((s) => s.email === email);
	if (student) return { ...student, role: 'student' };

	// Check recruiters
	const recruiter = users.recruiters.find((r) => r.email === email);
	if (recruiter) return { ...recruiter, role: 'recruiter' };

	// Check admin
	if (users.admin.email === email) return { ...users.admin, role: 'admin' };

	return null;
}

export function getJobById(id) {
	return jobs.find((job) => job.id === id);
}

export function getJobsByRecruiter(recruiterId) {
	return jobs.filter((job) => job.postedBy === recruiterId);
}

export function getApplicationsByStudent(studentId) {
	return jobs
		.filter((job) =>
			job.applications.some((app) => app.studentId === studentId)
		)
		.map((job) => {
			const application = job.applications.find(
				(app) => app.studentId === studentId
			);
			return {
				jobId: job.id,
				jobTitle: job.title,
				company: job.company,
				appliedDate: application.appliedDate,
				status: application.status,
			};
		});
}

export function getApplicationsByJob(jobId) {
	const job = getJobById(jobId);
	if (!job) return [];

	return job.applications.map((app) => {
		const student = users.students.find((s) => s.id === app.studentId);
		return {
			...app,
			studentName: student?.name || 'Unknown',
			studentMajor: student?.major || 'Unknown',
			studentEmail: student?.email || 'Unknown',
			studentResume: student?.resume || '',
		};
	});
}
