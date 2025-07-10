import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import getErrorMessage from "../utils/getErrorMessage";

export default function ErrorPage() {
	const error = useRouteError();
	console.log("ErrorPage:", error);

	const status = error?.status || error?.response?.status || null;
	const statusText = error?.statusText || error?.response?.statusText || null;
	const message = getErrorMessage(error);

	return (
		<div className="w-full h-dvh flex flex-col justify-center items-center">
			<h1 className="p-[1rem 0 0.5rem 0]">Oops! Something went wrong.</h1>
			<div className="flex">
				{status && <p className="pr-1">{status}</p>}
				{statusText && <p>{statusText}</p>}
			</div>
			{message && <p>{message}</p>}
			{/* Render login link if user is unauthorized */}
			{status === 401 && 
				<Link to="/login" className="font-semibold text-blue-500 hover:text-blue-600">
					Login
				</Link>
			}
		</div>
	)
};
