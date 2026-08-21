import React from "react";
import {Globe, Mail, ArrowRight, Filter, MoreHorizontal, Download, Eye, Trash2, Loader2, TrendingUp, Minus, Zap} from "lucide-react";
import StartScanSection from "../components/profile/StartScanSection";
import Tables from "../components/profile/Tables";

import {useEffect, useState, Suspense, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {userService} from "@/app/user.service"; // Ensure path is correct

export default function Dashboard() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	const hasFetched = useRef(false);

	useEffect(() => {
		if (token) {
			hasFetched.current = true; // Mark as fetched so it doesn't run again

			// Send the token to Django to verify it actually exists
			userService
				.validateToken(token)
				.then((isValid) => {
					if (isValid) {
						userService.socialLogin(token, router);
					} else {
						setTimeout(() => router.push("/"), 2500); // Send back to login
					}
				})
				.catch((err) => {
					console.error("Token Validation ERROR", err);
					setTimeout(() => router.push("/"), 2500);
				});
		} else {
			// No token in the URL at all
			router.push("/");
		}
	}, [token, router]); // Depend directly on the token, not the entire searchParams object

	return (
		<main className="ml-0  mt-26 md:mt-16 p-4 md:p-8 min-h-screen bg-gray-50/50">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header & Credits Section */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
					{/* Title Section */}
					<div className="space-y-1">
						<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">Dashboard</h1>
						<p className="text-sm text-gray-500">Manage your website audits and AI compatibility reports.</p>
					</div>

					{/* Credits & Upgrade Pill */}
				</div>

				{/* Start New Scan Section (Based on image_3e5a9c.png) */}
				<StartScanSection />

				{/* Previous Reports / Recent Scans Table (Based on image_3e5a46.png) */}
				<Tables />
			</div>
		</main>
	);
}
