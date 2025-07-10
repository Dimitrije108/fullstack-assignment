import { redirect } from "react-router-dom";
import checkToken from "./checkToken";

// Check if user is authenticated before initiating route's loader
export default function preFetchAuth(func) {
	// Return a function that will execute when route loader is accessed
	return (...args) => {
		const isAuth = checkToken();

		if (!isAuth) {
			return redirect("/login");
		};
		// Pass the default arguments onto loader
		return func(...args);
	};
};
