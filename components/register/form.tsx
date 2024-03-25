"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ name: "", email: "", password: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <>
      <div className="min-h-screen text-gray-900 flex justify-center items-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-lg sm:rounded-lg flex justify-center flex-1">
          <div className="">
            <div className="mt-1 flex flex-col items-center">
              {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded text-sm">
                  {error}
                </p>
              )}
              <img src="intel.png" className="h-10 mb-3" />
              <h1 className="text-2xl xl:text-3xl font-extrabold mt-4">
                Sign up
              </h1>
              <div className="w-full flex-1 mt-3">
                <div className="flex flex-col items-center">
                  <button
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    // onClick={handleGoogleSignUp} // Add your Google sign-up function
                  >
                    <div className="bg-white p-2 rounded-full">
                      <img src="google.png" className="w-6" alt="Google Logo" />
                    </div>
                    <span className="ml-4"> Sign Up with Google </span>
                  </button>

                  <button
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-3"
                    // onClick={handleGitHubSignUp} // Add your GitHub sign-up function
                  >
                    <div className="bg-white p-1 rounded-full">
                      <img src="github.png" className="w-6" alt="GitHub Logo" />
                    </div>
                    <span className="ml-4"> Sign Up with GitHub </span>
                  </button>
                </div>

                <div className="my-2 border-b text-center mb-5">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>
                <div className="mx-auto max-w-xs">
                  <input
                    required
                    className={`${input_style}`}
                    type="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                  <input
                    required
                    className={`${input_style} mt-5`}
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email"
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
                    style={{
                      backgroundColor: `${loading ? "#ccc" : "#2155bf"}`,
                    }}
                    disabled={loading}
                    onClick={onSubmit} // Add your form submit function
                  >
                    <span> Sign Up </span>
                  </button>
                  <div className="my-1 text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="underline underline-offset-4 text-sky-600"
                      >
                        Sign In
                      </a>
                    </div>
                  </div>
                  <p className="mt-6 text-xs text-gray-600 text-center mb-4">
                    I agree to abide by Intel's{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
