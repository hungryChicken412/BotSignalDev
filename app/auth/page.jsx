"use client";

import React, { createRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userService } from "../user.service";

const Login = () => {
	const [submitting, setSubmitting] = useState(false);

	const router = useRouter();

	const google_login_url = "http://localhost:8000/api/accounts/google/login";

	const username = createRef();
	const password = createRef();

	const onSubmit = (e) => {
		e.preventDefault();

		setSubmitting(true);

		userService
			.login(username.current.value, password.current.value)
			.then(() => {
				router.push("/");
			})
			.catch((err) => {
				console.log(err);
				setSubmitting(false);
			});
	};

	const googleLogin = () => {
		window.open(google_login_url, "google-login");
	};

	return (
		<div className="relative min-h-screen overflow-hidden bg-[#F7EFF5] flex items-center justify-center px-6">
			{/* Background Decorations */}

			<div className="absolute inset-0">
				<div className="absolute -top-32 left-10 h-96 w-96 rounded-full bg-white/40 blur-3xl"></div>

				<div className="absolute top-40 right-10 h-80 w-80 rounded-full bg-pink-100 blur-3xl opacity-70"></div>

				<div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-white blur-3xl opacity-60"></div>

				<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
			</div>

			{/* Card */}

			<div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.08)] p-10">
				{/* Logo */}
				<div className="flex justify-center">
					<div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 flex items-center justify-center shadow-lg">
						<span className="text-white text-2xl font-bold">✦</span>
					</div>
				</div>
				{/* Heading */}
				<div className="mt-8 text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900">
						One click Sign-in!
					</h1>

					<p className="mt-3 text-gray-500">
						Login/Register using google and get started in a second!
					</p>
				</div>
				{/* Google */}
				<button
					onClick={googleLogin}
					className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
				>
					<img src="/google.svg" className="h-5 w-5" alt="Google" />
					Continue with Google
				</button>
			</div>
		</div>
	);
};

export default Login;
