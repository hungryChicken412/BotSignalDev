"use client";

import {PaintBucket, Sparkles, Zap, LayoutDashboard} from "lucide-react";
import {useEffect, useRef, useState, type ChangeEvent, type CSSProperties} from "react";
import Link from "next/link";

export default function DocsNavbar() {
	const themeColor = useRef<HTMLInputElement>(null);
	const [theme, setTheme] = useState("#750af8");

	// Auth and Hydration States
	const [isMounted, setIsMounted] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Persist and load theme customizations + Auth Check
	useEffect(() => {
		setIsMounted(true);

		// Check if the user has an active token
		const token = window.localStorage.getItem("token");
		setIsAuthenticated(!!token);

		// Load saved theme
		const savedTheme = window.localStorage.getItem("accent-color");
		const initialTheme = savedTheme || getComputedStyle(document.documentElement).getPropertyValue("--orange-base").trim() || "#750af8";

		setTheme(initialTheme);
		document.documentElement.style.setProperty("--orange-base", initialTheme);
		document.documentElement.style.setProperty("--primary-base", initialTheme);
	}, []);

	const manageTheme = (event?: ChangeEvent<HTMLInputElement>) => {
		const nextTheme = event?.target.value ?? themeColor.current?.value ?? theme;
		if (nextTheme) {
			setTheme(nextTheme);
			document.documentElement.style.setProperty("--orange-base", nextTheme);
			document.documentElement.style.setProperty("--primary-base", nextTheme);
			window.localStorage.setItem("accent-color", nextTheme);
		}
	};

	return (
		<header className="fixed top-0 left-0 right-0 md:left-64 z-40 h-16 flex items-center justify-between border-b border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-sm px-4 md:px-8 transition-all duration-300">
			{/* Left Side: Logo & Docs Breadcrumb */}
			<div className="flex items-end gap-4 md:gap-6">
				<Link href="/profile" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 w-fit transition-colors">
					&larr; Back to Dashboard
				</Link>
			</div>

			{/* Right Side: Actions & Profile */}
			<div className="flex items-center gap-3 md:gap-5">
				{/* Custom Theme Toggler */}
				<div className="flex relative items-center justify-center">
					<label style={{backgroundColor: theme} as CSSProperties} htmlFor="theme-button" className="cursor-pointer rounded-full p-2 text-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-transform hover:scale-105 active:scale-95" title="Customize Theme">
						<PaintBucket className="w-4 h-4" />
					</label>
					<input type="color" id="theme-button" value={theme} onChange={manageTheme} ref={themeColor} className="absolute opacity-0 w-0 h-0 pointer-events-none" />
				</div>

				<div className="w-px h-6 bg-gray-200 hidden md:block"></div>

				{/* Dynamic Auth Rendering */}
				{!isMounted ? (
					<div className="w-24 h-8 bg-gray-100 animate-pulse rounded-full"></div>
				) : isAuthenticated ? (
					// --- LOGGED IN STATE ---
					<>
						{/* Quick link back to the main app */}
						<Link href="/profile" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mr-2">
							<LayoutDashboard className="w-4 h-4" />
							Dashboard
						</Link>

						<div className="flex items-center p-1.5 rounded-full bg-white border border-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-shadow hover:shadow-sm">
							<div className="flex items-center gap-2.5 px-3 md:px-5 py-2 rounded-full bg-indigo-50/50">
								<Zap className="h-4 w-4 text-indigo-600 fill-indigo-600/20" />
								<span className="text-sm md:text-base font-medium text-indigo-900">
									<strong className="font-semibold text-indigo-700">12</strong> <span className="hidden sm:inline">credits</span>
								</span>
							</div>
							<button className="ml-1.5 px-4 md:px-6 py-2 text-sm md:text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">Upgrade</button>
						</div>
					</>
				) : (
					// --- LOGGED OUT STATE ---
					<>
						<a href="http://localhost:8000/accounts/google/login" className="flex items-center gap-2 pl-2 md:pl-0 focus:outline-none group">
							<div className="h-9 w-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shadow-sm group-hover:bg-indigo-100 transition-colors">
								<svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
									<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
									<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
									<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
									<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
								</svg>
							</div>
							<div className="hidden md:flex items-center gap-1">
								<span className="text-sm font-semibold text-gray-700">Sign In</span>
							</div>
						</a>
					</>
				)}
			</div>
		</header>
	);
}
