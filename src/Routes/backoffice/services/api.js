import axios from "axios";

const token = localStorage.getItem('access_token');
// console.log(token);

const api = axios.create({
	baseURL: "https://50cglb1j-4000.asse.devtunnels.ms",
	headers: {
		Authorization:
			`Bearer ${token}`,
	},
});

export default api;
