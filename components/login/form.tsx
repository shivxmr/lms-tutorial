"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const LoginForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const callbackUrl = "/";

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			setFormValues({ email: "", password: "" });

			const res = await signIn("credentials", {
				redirect: false,
				email: formValues.email,
				password: formValues.password,
				callbackUrl,
			});

			setLoading(false);

			if (!res?.error) {
				router.push(callbackUrl);
			} else {
				setError("invalid email or password");
			}
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			setError(error);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const input_style =
		"form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

	const handleGitHubSignUp = () => signIn("github", { callbackUrl });
	const handleGoogleSignUp = () => signIn("google", { callbackUrl });

	return (
		<div className="min-h-screen bg-white-100 text-gray-900 flex justify-center items-center">
			<div className="max-w-screen-xl m-0 sm:m-10 p-5 bg-white shadow-lg sm:rounded-lg flex justify-center flex-1">
				<div className="mt-2 flex flex-col w-full items-center">
					{error && (
						<p className="text-center bg-red-300 py-2 px-3 mb-6 rounded text-sm">
							{error}
						</p>
					)}
					<img
						src="intel.png"
						className="h-10 mb-5"
					/>
					<h1 className="text-2xl xl:text-3xl font-extrabold mt-0">Sign In</h1>
					<div className="w-full flex-1 mt-3">
						<div className="flex flex-col items-center">
							<button
								className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
								// onClick={handleGoogleSignUp} // Add your Google sign-up function
							>
								<div className="bg-white p-2 rounded-full">
									<img
										src="/google.png"
										className="w-5"
										alt="Intel Logo"
									/>
								</div>
								<span className="ml-4"> Sign In with Google </span>
							</button>

							<button
								className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-3"
								onClick={handleGitHubSignUp} // Add your GitHub sign-up function
							>
								<div className="bg-white p-1 rounded-full">
									<img
										src="/github.png"
										className="w-5"
										alt="GitHub Logo"
									/>
								</div>
								<span className="ml-4"> Sign In with GitHub </span>
							</button>
						</div>

						<div className="my-2 border-b text-center">
							<div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
								Or sign in with e-mail
							</div>
						</div>
						<form onSubmit={onSubmit}>
							{error && (
								<p className="text-center bg-red-300 py-4 mb-6 rounded">
									{error}
								</p>
							)}
							<div className="mb-6">
								<input
									required
									type="email"
									name="email"
									value={formValues.email}
									onChange={handleChange}
									placeholder="Email address"
									className={`${input_style}`}
								/>
							</div>
							<div className="mb-6">
								<input
									required
									type="password"
									name="password"
									value={formValues.password}
									onChange={handleChange}
									placeholder="Password"
									className={`${input_style}`}
								/>
							</div>
							<button
								type="submit"
								style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
								className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
								disabled={loading}>
								{loading ? "loading..." : "Sign In"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
