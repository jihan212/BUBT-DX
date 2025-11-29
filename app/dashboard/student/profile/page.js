'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
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
	Plus,
	FileText,
	Code,
	ExternalLink,
	Github,
	Linkedin,
	Twitter,
	Globe,
	Download,
	Trash2,
	CheckCircle,
	BriefcaseIcon,
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
		certificates: [],
		projects: [],
		experience: [],
		socialLinks: {
			github: '',
			linkedin: '',
			twitter: '',
			medium: '',
			portfolio: '',
			website: '',
		},
	});
	const [newSkill, setNewSkill] = useState('');
	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
						certificates: userData.certificates || [],
						projects: userData.projects || [],
						experience: userData.experience || [],
						socialLinks: userData.socialLinks || {
							github: '',
							linkedin: '',
							twitter: '',
							medium: '',
							portfolio: '',
							website: '',
						},
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
			certificates: user?.certificates || [],
			projects: user?.projects || [],
			experience: user?.experience || [],
			socialLinks: user?.socialLinks || {
				github: '',
				linkedin: '',
				twitter: '',
				medium: '',
				portfolio: '',
				website: '',
			},
		});
		setNewSkill('');
		setIsEditing(false);
	};

	const addSkill = () => {
		if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
			setFormData((prev) => ({
				...prev,
				skills: [...prev.skills, newSkill.trim()],
			}));
			setNewSkill('');
		}
	};

	const removeSkill = (skillToRemove) => {
		setFormData((prev) => ({
			...prev,
			skills: prev.skills.filter((skill) => skill !== skillToRemove),
		}));
	};

	// Experience handlers
	const addExperience = () => {
		setFormData((prev) => ({
			...prev,
			experience: [
				...prev.experience,
				{
					title: '',
					company: '',
					type: 'Full-time',
					location: '',
					startDate: '',
					endDate: '',
					current: false,
					description: '',
				},
			],
		}));
	};

	const updateExperience = (index, field, value) => {
		setFormData((prev) => {
			const updated = [...prev.experience];
			updated[index] = { ...updated[index], [field]: value };
			return { ...prev, experience: updated };
		});
	};

	const removeExperience = (index) => {
		setFormData((prev) => ({
			...prev,
			experience: prev.experience.filter((_, i) => i !== index),
		}));
	};

	// Project handlers
	const addProject = () => {
		setFormData((prev) => ({
			...prev,
			projects: [
				...prev.projects,
				{
					name: '',
					description: '',
					technologies: [],
					projectUrl: '',
					githubUrl: '',
					startDate: '',
					endDate: '',
					current: false,
				},
			],
		}));
	};

	const updateProject = (index, field, value) => {
		setFormData((prev) => {
			const updated = [...prev.projects];
			updated[index] = { ...updated[index], [field]: value };
			return { ...prev, projects: updated };
		});
	};

	const removeProject = (index) => {
		setFormData((prev) => ({
			...prev,
			projects: prev.projects.filter((_, i) => i !== index),
		}));
	};

	const addProjectTechnology = (projectIndex, tech) => {
		if (!tech.trim()) return;
		setFormData((prev) => {
			const updated = [...prev.projects];
			if (!updated[projectIndex].technologies) {
				updated[projectIndex].technologies = [];
			}
			if (!updated[projectIndex].technologies.includes(tech.trim())) {
				updated[projectIndex].technologies.push(tech.trim());
			}
			return { ...prev, projects: updated };
		});
	};

	const removeProjectTechnology = (projectIndex, tech) => {
		setFormData((prev) => {
			const updated = [...prev.projects];
			updated[projectIndex].technologies = updated[
				projectIndex
			].technologies.filter((t) => t !== tech);
			return { ...prev, projects: updated };
		});
	};

	// Certificate handlers
	const addCertificate = () => {
		setFormData((prev) => ({
			...prev,
			certificates: [
				...prev.certificates,
				{
					name: '',
					issuer: '',
					issueDate: '',
					expiryDate: '',
					credentialId: '',
					credentialUrl: '',
				},
			],
		}));
	};

	const updateCertificate = (index, field, value) => {
		setFormData((prev) => {
			const updated = [...prev.certificates];
			updated[index] = { ...updated[index], [field]: value };
			return { ...prev, certificates: updated };
		});
	};

	const removeCertificate = (index) => {
		setFormData((prev) => ({
			...prev,
			certificates: prev.certificates.filter((_, i) => i !== index),
		}));
	};

	// PDF Resume Generator
	const generatePDF = () => {
		if (!user) return;
		
		setIsGeneratingPDF(true);
		
		try {
			const pdf = new jsPDF();
			let yPos = 20;
			const pageWidth = pdf.internal.pageSize.getWidth();
			const margin = 20;
			const maxWidth = pageWidth - 2 * margin;
			
			// Helper function to add text with word wrapping
			const addText = (text, size, isBold = false, color = [0, 0, 0]) => {
				if (!text) return;
				pdf.setFontSize(size);
				pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
				pdf.setTextColor(color[0], color[1], color[2]);
				
				const lines = pdf.splitTextToSize(String(text), maxWidth);
				pdf.text(lines, margin, yPos);
				yPos += lines.length * (size * 0.4);
			};

			// Header - Name
			addText(user.name || 'Student Name', 24, true, [0, 0, 0]);
			yPos += 5;

			// Contact Information
			pdf.setFontSize(10);
			pdf.setFont('helvetica', 'normal');
			pdf.setTextColor(100, 100, 100);
			const contactInfo = [];
			if (user.email) contactInfo.push(user.email);
			if (user.phone) contactInfo.push(user.phone);
			if (user.socialLinks?.linkedin) contactInfo.push(`LinkedIn: ${user.socialLinks.linkedin}`);
			if (user.socialLinks?.github) contactInfo.push(`GitHub: ${user.socialLinks.github}`);
			if (contactInfo.length > 0) {
				pdf.text(contactInfo.join(' | '), margin, yPos);
				yPos += 8;
			}

			// Add line separator
			pdf.setDrawColor(200, 200, 200);
			pdf.line(margin, yPos, pageWidth - margin, yPos);
			yPos += 10;

			// Professional Summary/Resume
			if (user.resume) {
				addText('PROFESSIONAL SUMMARY', 14, true, [0, 0, 0]);
				yPos += 2;
				pdf.setFontSize(10);
				pdf.setTextColor(0, 0, 0);
				const resumeLines = pdf.splitTextToSize(user.resume, maxWidth);
				pdf.text(resumeLines, margin, yPos);
				yPos += resumeLines.length * 4 + 8;
			}

			// Education
			addText('EDUCATION', 14, true, [0, 0, 0]);
			yPos += 5;
			pdf.setFontSize(11);
			pdf.setFont('helvetica', 'bold');
			if (user.major) {
				pdf.text(user.major, margin, yPos);
				yPos += 6;
			}
			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(10);
			if (user.graduationYear) {
				pdf.text(`Expected Graduation: ${user.graduationYear}`, margin + 5, yPos);
				yPos += 5;
			}
			if (user.gpa) {
				pdf.text(`GPA: ${user.gpa}/4.00`, margin + 5, yPos);
				yPos += 8;
			}

			// Skills
			if (user.skills && user.skills.length > 0) {
				if (yPos > 250) {
					pdf.addPage();
					yPos = 20;
				}
				addText('TECHNICAL SKILLS', 14, true, [0, 0, 0]);
				yPos += 5;
				pdf.setFontSize(10);
				pdf.setFont('helvetica', 'normal');
				pdf.text(user.skills.join(' • '), margin, yPos);
				yPos += 8;
			}

			// Experience
			if (user.experience && user.experience.length > 0) {
				if (yPos > 250) {
					pdf.addPage();
					yPos = 20;
				}
				addText('EXPERIENCE', 14, true, [0, 0, 0]);
				yPos += 5;
				
				user.experience.forEach((exp, index) => {
					if (yPos > 260) {
						pdf.addPage();
						yPos = 20;
					}
					pdf.setFontSize(11);
					pdf.setFont('helvetica', 'bold');
					if (exp.title) {
						pdf.text(exp.title, margin, yPos);
						yPos += 6;
					}
					pdf.setFont('helvetica', 'normal');
					pdf.setFontSize(10);
					const companyInfo = [];
					if (exp.company) companyInfo.push(exp.company);
					if (exp.type) companyInfo.push(exp.type);
					if (exp.location) companyInfo.push(exp.location);
					if (companyInfo.length > 0) {
						pdf.text(companyInfo.join(' | '), margin, yPos);
						yPos += 5;
					}
					const dateInfo = [];
					if (exp.startDate) {
						const startDate = new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
						const endDate = exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
						if (endDate) {
							dateInfo.push(`${startDate} - ${endDate}`);
						} else {
							dateInfo.push(startDate);
						}
					}
					if (dateInfo.length > 0) {
						pdf.text(dateInfo.join(' | '), margin, yPos);
						yPos += 5;
					}
					if (exp.description) {
						const descLines = pdf.splitTextToSize(exp.description, maxWidth - 5);
						pdf.text(descLines, margin + 5, yPos);
						yPos += descLines.length * 4 + 3;
					}
					if (index < user.experience.length - 1) {
						yPos += 3;
					}
				});
				yPos += 5;
			}

			// Projects
			if (user.projects && user.projects.length > 0) {
				if (yPos > 250) {
					pdf.addPage();
					yPos = 20;
				}
				addText('PROJECTS', 14, true, [0, 0, 0]);
				yPos += 5;
				
				user.projects.forEach((project, index) => {
					if (yPos > 260) {
						pdf.addPage();
						yPos = 20;
					}
					pdf.setFontSize(11);
					pdf.setFont('helvetica', 'bold');
					if (project.name) {
						pdf.text(project.name, margin, yPos);
						yPos += 6;
					}
					if (project.technologies && project.technologies.length > 0) {
						pdf.setFont('helvetica', 'normal');
						pdf.setFontSize(9);
						pdf.setTextColor(100, 100, 100);
						pdf.text(project.technologies.join(' • '), margin, yPos);
						yPos += 5;
						pdf.setTextColor(0, 0, 0);
					}
					if (project.description) {
						pdf.setFontSize(10);
						const descLines = pdf.splitTextToSize(project.description, maxWidth - 5);
						pdf.text(descLines, margin + 5, yPos);
						yPos += descLines.length * 4;
					}
					if (project.githubUrl || project.projectUrl) {
						pdf.setFontSize(9);
						pdf.setTextColor(0, 100, 200);
						if (project.githubUrl) {
							pdf.text(`GitHub: ${project.githubUrl}`, margin + 5, yPos);
							yPos += 4;
						}
						if (project.projectUrl) {
							pdf.text(`Live: ${project.projectUrl}`, margin + 5, yPos);
							yPos += 4;
						}
						pdf.setTextColor(0, 0, 0);
					}
					if (index < user.projects.length - 1) {
						yPos += 3;
					}
				});
				yPos += 5;
			}

			// Certificates
			if (user.certificates && user.certificates.length > 0) {
				if (yPos > 250) {
					pdf.addPage();
					yPos = 20;
				}
				addText('CERTIFICATIONS', 14, true, [0, 0, 0]);
				yPos += 5;
				
				user.certificates.forEach((cert, index) => {
					if (yPos > 260) {
						pdf.addPage();
						yPos = 20;
					}
					pdf.setFontSize(11);
					pdf.setFont('helvetica', 'bold');
					if (cert.name) {
						pdf.text(cert.name, margin, yPos);
						yPos += 6;
					}
					pdf.setFont('helvetica', 'normal');
					pdf.setFontSize(10);
					if (cert.issuer) {
						pdf.text(`Issued by: ${cert.issuer}`, margin + 5, yPos);
						yPos += 5;
					}
					if (cert.issueDate) {
						const issueDate = new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
						const expiryDate = cert.expiryDate ? ` - ${new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : '';
						pdf.text(`Issued: ${issueDate}${expiryDate}`, margin + 5, yPos);
						yPos += 5;
					}
					if (cert.credentialId) {
						pdf.text(`Credential ID: ${cert.credentialId}`, margin + 5, yPos);
						yPos += 8;
					}
					if (index < user.certificates.length - 1) {
						yPos += 2;
					}
				});
			}

			// Save PDF
			const fileName = `${user.name?.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
			pdf.save(fileName);
			
			setIsGeneratingPDF(false);
		} catch (error) {
			console.error('Error generating PDF:', error);
			setIsGeneratingPDF(false);
			alert('Error generating PDF. Please try again.');
		}
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
					<div className='hidden md:flex md:flex-col md:space-y-2'>
						{!isEditing ? (
							<>
								<Button
									size='lg'
									variant='secondary'
									className='bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
									onClick={() => setIsEditing(true)}
								>
									<Edit className='mr-2 h-5 w-5' />
									Edit Profile
								</Button>
								<Button
									size='lg'
									variant='secondary'
									className='bg-indigo-500/80 backdrop-blur-sm border-white/20 text-white hover:bg-indigo-600/80'
									onClick={generatePDF}
									disabled={isGeneratingPDF}
								>
									<Download className='mr-2 h-5 w-5' />
									{isGeneratingPDF ? 'Generating...' : 'Download Resume PDF'}
								</Button>
							</>
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
						<CardContent className='pt-0 space-y-4'>
							{isEditing ? (
								<>
									<div className='flex space-x-2'>
										<Input
											value={newSkill}
											onChange={(e) => setNewSkill(e.target.value)}
											placeholder='Add a skill (e.g. React, Python)'
											onKeyPress={(e) => {
												if (e.key === 'Enter') {
													e.preventDefault();
													addSkill();
												}
											}}
											className='flex-1'
										/>
										<Button
											type='button'
											onClick={addSkill}
											size='sm'
											variant='outline'
										>
											<Plus className='h-4 w-4 mr-1' />
											Add
										</Button>
									</div>
									{formData.skills.length > 0 && (
										<div className='flex flex-wrap gap-2'>
											{formData.skills.map((skill, index) => (
												<Badge
													key={index}
													variant='secondary'
													className='bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1'
												>
													{skill}
													<button
														type='button'
														onClick={() => removeSkill(skill)}
														className='ml-1 hover:text-red-600'
													>
														<X className='h-3 w-3' />
													</button>
												</Badge>
											))}
										</div>
									)}
								</>
							) : (
								<div className='flex flex-wrap gap-2'>
									{formData.skills && formData.skills.length > 0 ? (
										formData.skills.map((skill, index) => (
											<Badge
												key={index}
												variant='secondary'
												className='bg-blue-100 text-blue-800 hover:bg-blue-200'
											>
												{skill}
											</Badge>
										))
									) : (
										<p className='text-sm text-gray-500 italic'>
											No skills added yet
										</p>
									)}
								</div>
							)}
						</CardContent>
					</Card>
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
							<div className='md:hidden space-y-3'>
								{!isEditing ? (
									<>
										<Button
											onClick={() => setIsEditing(true)}
											className='w-full'
										>
											<Edit className='mr-2 h-4 w-4' />
											Edit Profile
										</Button>
										<Button
											onClick={generatePDF}
											disabled={isGeneratingPDF}
											variant='outline'
											className='w-full'
										>
											<Download className='mr-2 h-4 w-4' />
											{isGeneratingPDF ? 'Generating...' : 'Download Resume PDF'}
										</Button>
									</>
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

					{/* Social Links Section */}
					<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
						<CardHeader className='pb-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center'>
										<Globe className='h-5 w-5 text-white' />
									</div>
									<div>
										<CardTitle className='text-lg'>
											Social & Professional Links
										</CardTitle>
										<CardDescription>
											Connect your online presence
										</CardDescription>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent className='pt-0 space-y-4'>
							{isEditing ? (
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label className='flex items-center'>
											<Github className='h-4 w-4 mr-2' />
											GitHub
										</Label>
										<Input
											value={formData.socialLinks?.github || ''}
											onChange={(e) =>
												handleInputChange('socialLinks', {
													...formData.socialLinks,
													github: e.target.value,
												})
											}
											placeholder='https://github.com/username'
										/>
									</div>
									<div className='space-y-2'>
										<Label className='flex items-center'>
											<Linkedin className='h-4 w-4 mr-2' />
											LinkedIn
										</Label>
										<Input
											value={formData.socialLinks?.linkedin || ''}
											onChange={(e) =>
												handleInputChange('socialLinks', {
													...formData.socialLinks,
													linkedin: e.target.value,
												})
											}
											placeholder='https://linkedin.com/in/username'
										/>
									</div>
									<div className='space-y-2'>
										<Label className='flex items-center'>
											<Twitter className='h-4 w-4 mr-2' />
											Twitter
										</Label>
										<Input
											value={formData.socialLinks?.twitter || ''}
											onChange={(e) =>
												handleInputChange('socialLinks', {
													...formData.socialLinks,
													twitter: e.target.value,
												})
											}
											placeholder='https://twitter.com/username'
										/>
									</div>
									<div className='space-y-2'>
										<Label className='flex items-center'>
											<FileText className='h-4 w-4 mr-2' />
											Medium
										</Label>
										<Input
											value={formData.socialLinks?.medium || ''}
											onChange={(e) =>
												handleInputChange('socialLinks', {
													...formData.socialLinks,
													medium: e.target.value,
												})
											}
											placeholder='https://medium.com/@username'
										/>
									</div>
									<div className='space-y-2'>
										<Label className='flex items-center'>
											<Globe className='h-4 w-4 mr-2' />
											Portfolio
										</Label>
										<Input
											value={formData.socialLinks?.portfolio || ''}
											onChange={(e) =>
												handleInputChange('socialLinks', {
													...formData.socialLinks,
													portfolio: e.target.value,
												})
											}
											placeholder='https://yourportfolio.com'
										/>
									</div>
									<div className='space-y-2'>
										<Label className='flex items-center'>
											<Globe className='h-4 w-4 mr-2' />
											Website
										</Label>
										<Input
											value={formData.socialLinks?.website || ''}
											onChange={(e) =>
												handleInputChange('socialLinks', {
													...formData.socialLinks,
													website: e.target.value,
												})
											}
											placeholder='https://yourwebsite.com'
										/>
									</div>
								</div>
							) : (
								<div className='flex flex-wrap gap-3'>
									{formData.socialLinks?.github && (
										<a
											href={formData.socialLinks.github}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
										>
											<Github className='h-4 w-4' />
											<span>GitHub</span>
											<ExternalLink className='h-3 w-3' />
										</a>
									)}
									{formData.socialLinks?.linkedin && (
										<a
											href={formData.socialLinks.linkedin}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors'
										>
											<Linkedin className='h-4 w-4' />
											<span>LinkedIn</span>
											<ExternalLink className='h-3 w-3' />
										</a>
									)}
									{formData.socialLinks?.twitter && (
										<a
											href={formData.socialLinks.twitter}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center space-x-2 px-4 py-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors'
										>
											<Twitter className='h-4 w-4' />
											<span>Twitter</span>
											<ExternalLink className='h-3 w-3' />
										</a>
									)}
									{formData.socialLinks?.medium && (
										<a
											href={formData.socialLinks.medium}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
										>
											<FileText className='h-4 w-4' />
											<span>Medium</span>
											<ExternalLink className='h-3 w-3' />
										</a>
									)}
									{formData.socialLinks?.portfolio && (
										<a
											href={formData.socialLinks.portfolio}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center space-x-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors'
										>
											<Globe className='h-4 w-4' />
											<span>Portfolio</span>
											<ExternalLink className='h-3 w-3' />
										</a>
									)}
									{formData.socialLinks?.website && (
										<a
											href={formData.socialLinks.website}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors'
										>
											<Globe className='h-4 w-4' />
											<span>Website</span>
											<ExternalLink className='h-3 w-3' />
										</a>
									)}
									{(!formData.socialLinks?.github &&
										!formData.socialLinks?.linkedin &&
										!formData.socialLinks?.twitter &&
										!formData.socialLinks?.medium &&
										!formData.socialLinks?.portfolio &&
										!formData.socialLinks?.website) && (
										<p className='text-sm text-gray-500 italic'>
											No social links added yet
										</p>
									)}
								</div>
							)}
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
