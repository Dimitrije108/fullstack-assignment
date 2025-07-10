import axios from "axios";
// Create axios instance
const api = axios.create();

// If token exists pass it inside header on every request
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
}, 
	(error) => Promise.reject(error)
);
// If server returns 401 Unauthorized clear localStorage and redirect user to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
