import { useState, useEffect, createContext, useContext } from "react";
import api from "../axiosConfig";
import checkToken from "../auth/checkToken";

const AuthContext = createContext({
	token: null, 
  login: () => {},
	logout: () => {},
});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	useEffect(() => {
		authUser();
	}, []);

	// Request user login
  const login = async (username, password) => {
		try {
			const response = await api.post(
				"http://127.0.0.1:5000/api/login", 
				{ username, password }
			);

			console.log(response);
			const { token } = response.data;
			// Store token in localStorage and set state
			localStorage.setItem("token", token);
			setToken(token);
			return { success: true };
		} catch (error) {
			// Return form validation error/s
			if (error.response?.status === 400) {
				return { success: false, error: error.response.data.details };
			};
			// Return unauthorized error message
			if (error.response?.status === 401) {
				return { success: false, error: [error.response.data.message] };
			};
			// Otherwise let the error boundary catch it
			throw error;
		};
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
	};
	// Check if user is authenticated
	const authUser = () => {
		const userAuth = checkToken();
		if (userAuth) {
			const token = localStorage.getItem("token");
			setToken(token);
			return true;
		} else {
			logout();
			return false;
		};
	};

	const value = {
		token,
		login,
		logout,
		authUser,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
