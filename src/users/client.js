import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const USER_API = `${API_BASE}/api/users`;

export const findAllUsers = async () => {
	try {
		const response = await axios.get(USER_API);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const createUser = async (name, email, password) => {
	try {
		const response = await axios.post(`${USER_API}/register`, {
			name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const login = async (credentials) => {
	try {
		const response = await axios.post(`${USER_API}/login`, credentials);
		return response.data;
	} catch (error) {
		if (error.response) {
            console.log("Error data:", error.response.data);
            throw new Error(error.response.data || 'Login failed');
        } else {
            throw new Error(error.message);
        }
	}
};

export const account = async (userId) => {
    try {
        const response = await axios.get(`${USER_API}/account/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw new Error('Failed to fetch account details');
    }
};

export const signout = async () => {
	try {
		const response = await axios.post(`${USER_API}/signout`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
} 

export const register = async (user) => {
	const response = await axios.post(`${USER_API}/register`, user);
	return response.data;
};

export const changePassword = async ({ email, newPassword }) => {
    try {
        const response = await axios.post(`${USER_API}/change-password`, {
            email,
            newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to change password:', error);
        throw new Error('Failed to change password');
    }
};