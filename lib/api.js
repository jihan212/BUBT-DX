// API configuration for backend server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Helper function to make API requests
export async function apiRequest(endpoint, options = {}) {
	const url = `${API_BASE_URL}${endpoint}`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
		...options,
	};

	if (config.body && typeof config.body === 'object') {
		config.body = JSON.stringify(config.body);
	}

	try {
		const response = await fetch(url, config);
		const data = await response.json();
		
		if (!response.ok) {
			throw new Error(data.error || 'API request failed');
		}
		
		return data;
	} catch (error) {
		console.error('API Request Error:', error);
		throw error;
	}
}

// Auth API
export const authAPI = {
	login: (email, password) => 
		apiRequest('/auth/login', {
			method: 'POST',
			body: { email, password },
		}),
	
	logout: () => 
		apiRequest('/auth', {
			method: 'DELETE',
		}),
};

// Jobs API
export const jobsAPI = {
	getAll: (recruiterId) => {
		const endpoint = recruiterId 
			? `/jobs?recruiter=${recruiterId}`
			: '/jobs';
		return apiRequest(endpoint);
	},
	
	getById: (id) => 
		apiRequest(`/jobs/${id}`),
	
	create: (jobData, recruiterId) => 
		apiRequest(`/jobs?postedBy=${recruiterId}`, {
			method: 'POST',
			body: jobData,
		}),
	
	update: (id, jobData) => 
		apiRequest(`/jobs/${id}`, {
			method: 'PUT',
			body: jobData,
		}),
	
	delete: (id) => 
		apiRequest(`/jobs/${id}`, {
			method: 'DELETE',
		}),
};

// Applications API
export const applicationsAPI = {
	getByStudent: (studentId) => 
		apiRequest(`/applications?student=${studentId}`),
	
	getByJob: (jobId) => 
		apiRequest(`/applications?job=${jobId}`),
	
	create: (jobId, studentId, coverLetter) => 
		apiRequest('/applications', {
			method: 'POST',
			body: { jobId, studentId, coverLetter },
		}),
	
	updateStatus: (applicationId, jobId, status) => 
		apiRequest('/applications', {
			method: 'PUT',
			body: { applicationId, jobId, status },
		}),
};

// Users API
export const usersAPI = {
	getAll: () => 
		apiRequest('/users'),
	
	getById: (id) => 
		apiRequest(`/users/${id}`),
	
	update: (id, userData) => 
		apiRequest(`/users/${id}`, {
			method: 'PUT',
			body: userData,
		}),
};

