// Check if user is authenticated
export default function checkToken() {
	const token = localStorage.getItem("token");
	// If token doesn't exist return false
	if (!token) return false;
	return true;
};
