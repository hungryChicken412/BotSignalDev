"use client"; // REQUIRED for App Router

import {useEffect, useState, Suspense} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {userService} from "@/app/user.service"; // Ensure path is correct

// 1. Extract the core logic into a separate component
function TokenVerificationContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Create a state to show the user what is happening
	const [authStatus, setAuthStatus] = useState("Verifying your secure login...");

	useEffect(() => {
		const token = searchParams.get("token");

		if (token) {
			// Send the token to Django to verify it actually exists
			userService
				.validateToken(token)
				.then((isValid) => {
					if (isValid) {
						// Token is real! Log them in and redirect.
						setAuthStatus("Login successful! Redirecting to dashboard...");
						userService.socialLogin(token, router);
					} else {
						// Token is fake/expired! Reject them.
						setAuthStatus("Invalid or expired session. Please log in again.");
						setTimeout(() => router.push("/auth"), 2500); // Send back to login
					}
				})
				.catch((err) => {
					console.error("Token Validation ERROR", err);
					setAuthStatus("An error occurred connecting to the server.");
					setTimeout(() => router.push("/auth"), 2500);
				});
		} else {
			// No token in the URL at all
			router.push("/auth");
		}
	}, [searchParams, router]);

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-slate-50">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
			<h2 className="font-bold text-xl text-slate-800">{authStatus}</h2>
		</div>
	);
}

// 2. Wrap the extracted component in a Suspense boundary
export default function TokenVerification() {
	return (
		<Suspense
			fallback={
				<div className="flex flex-col justify-center items-center h-screen bg-slate-50">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
					<h2 className="font-bold text-xl text-slate-800">Loading...</h2>
				</div>
			}
		>
			<TokenVerificationContent />
		</Suspense>
	);
}
