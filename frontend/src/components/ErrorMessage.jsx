// Display individual error without jumping to another page
export default function ErrorMessage({ error }) {
	// If error is missing display fallback message
	if (!error) {
    return <p>An unknown error occurred.</p>;
  };

	const status = error.status;
	const name = error.response?.data?.error || "An error occurred.";

	return (
		<div className="flex flex-col justify-center items-center text-red-500">
			<div>
				<h2 className="pr-1 text-center">
					{status}
				</h2>
				<p>{name}</p>
			</div>
		</div>
	);
};
