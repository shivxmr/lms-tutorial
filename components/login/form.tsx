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
		// <form onSubmit={onSubmit}>
		//   {error && (
		//     <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
		//   )}
		//   <div className="mb-6">
		//     <input
		//       required
		//       type="email"
		//       name="email"
		//       value={formValues.email}
		//       onChange={handleChange}
		//       placeholder="Email address"
		//       className={`${input_style}`}
		//     />
		//   </div>
		//   <div className="mb-6">
		//     <input
		//       required
		//       type="password"
		//       name="password"
		//       value={formValues.password}
		//       onChange={handleChange}
		//       placeholder="Password"
		//       className={`${input_style}`}
		//     />
		//   </div>
		//   <button
		//     type="submit"
		//     style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
		//     className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
		//     disabled={loading}
		//   >
		//     {loading ? "loading..." : "Sign In"}
		//   </button>

		//   <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
		//     <p className="text-center font-semibold mx-4 mb-0">OR</p>
		//   </div>

		//   <a
		//     className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
		//     style={{ backgroundColor: "#3b5998" }}
		//     onClick={() => signIn("google", { callbackUrl })}
		//     role="button"
		//   >
		//     <img
		//       className="pr-2"
		//       src="/images/google.svg"
		//       alt=""
		//       style={{ height: "2rem" }}
		//     />
		//     Continue with Google
		//   </a>
		//   <a
		//     className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
		//     style={{ backgroundColor: "#55acee" }}
		//     onClick={() => signIn("github", { callbackUrl })}
		//     role="button"
		//   >
		//     <img
		//       className="pr-2"
		//       src="/images/github.svg"
		//       alt=""
		//       style={{ height: "2.2rem" }}
		//     />
		//     Continue with GitHub
		//   </a>
		// </form>
		<div className="min-h-screen bg-white-100 text-gray-900 flex justify-center items-center">
			<div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-lg sm:rounded-lg flex justify-center flex-1">
				<div className="">
					<div className="mt- flex flex-col items-center">
						<img
							src="intel.png"
							className="h-10 mb-5"
						/>
						<h1 className="text-2xl xl:text-3xl font-extrabold mt-0">
							Sign In
						</h1>
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
							<div className="mx-auto max-w-xs">
								<input
									required
									className={`${input_style} mt-5`}
									type="email"
									name="email"
									value={formValues.email}
									onChange={handleChange}
									placeholder="Email address"
								/>
								<input
									required
									className={`${input_style} mt-5`}
									type="password"
									name="password"
									value={formValues.password}
									onChange={handleChange}
									placeholder="Password"
								/>
								<button
									className="mt-4 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
									type="submit"
									style={{ backgroundColor: `${loading ? "#ccc" : "#2155bf"}` }}
									disabled={loading}
									onClick={onSubmit} // Add your form submit function
								>
									<span> {loading ? "loading..." : "Sign In"} </span>
								</button>
								<div className="my-1 text-center">
									<div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
										Don&apos;t have an account?
										<a
											href="/register"
											className="underline underline-offset-4 text-sky-600">
											Sign Up
										</a>
									</div>
								</div>
								<p className="mt-6 text-xs text-gray-600 text-center mb-4">
									I agree to abide by Intel&apos;s
									<a
										href="#"
										className="border-b border-gray-500 border-dotted">
										Terms of Service
									</a>
									and its
									<a
										href="#"
										className="border-b border-gray-500 border-dotted">
										Privacy Policy
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
