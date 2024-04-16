import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const USER_API = `${API_BASE}/api/users`;


export const account = async () => {
	try {
		const response = await axios.post(`${USER_API}/account`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}
