"use client"; // REQUIRED for App Router

import {useEffect, useState, Suspense, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {userService} from "@/app/user.service"; // Ensure path is correct

// 1. Extract the core logic into a separate component
function TokenVerificationContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Extract the token here so it can be a clean dependency
	const token = searchParams.get("token");

	// Create a state to show the user what is happening
	const [authStatus, setAuthStatus] = useState("Verifying your secure login...");

	// Add a ref to prevent React 18 Strict Mode from double-firing the API call
	const hasFetched = useRef(false);

	useEffect(() => {
		// Prevent the effect from running twice in development
		if (hasFetched.current) return;

		if (token) {
			hasFetched.current = true; // Mark as fetched so it doesn't run again

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
						setTimeout(() => router.push("/"), 2500); // Send back to login
					}
				})
				.catch((err) => {
					console.error("Token Validation ERROR", err);
					setAuthStatus("An error occurred connecting to the server.");
					setTimeout(() => router.push(), 2500);
				});
		} else {
			// No token in the URL at all
			router.push("/auth");
		}
	}, [token, router]); // Depend directly on the token, not the entire searchParams object

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
