"use client";

import {useEffect, useRef, useState, type ChangeEvent, type CSSProperties} from "react";
import Link from "next/link";
import {Menu, X, Sparkles, PaintBucket} from "lucide-react";
import Image from "next/image";
import LogoBrand from "./logo";

interface CustomStyles extends CSSProperties {
	"--orange-base"?: string;
	"--orange-light"?: string;
}

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const themeColor = useRef<HTMLInputElement>(null);
	const [theme, setTheme] = useState("#750af8");

	// Centralized navigation links relevant to your MVP
	const navLinks = [
		{href: "#how-it-works", label: "How it works", badge: ""},
		{href: "/docs", label: "Documentation", badge: ""},
		{href: "/blogs", label: "Blogs", badge: ""},

		{href: "#faq", label: "FAQ", badge: ""},

		// { href: "/dashboard", label: "Dashboard", badge: "Beta" },
	];

	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
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
		<>
			<nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/60 bg-white/40 dark:bg-surface-dim/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] z-50 flex justify-between items-center py-3 px-6 transition-all duration-300">
				{/* Logo & Brand */}
				<LogoBrand />

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link key={link.label} href={link.href} className="text-on-surface-variant font-medium hover:text-primary transition duration-300 font-body-md text-sm flex items-center gap-2">
							{link.label}
							{link.badge && <span className="bg-secondary-container bg-primary text-white font-bold text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full font-label-caps uppercase">✨{link.badge}</span>}
						</Link>
					))}
				</div>

				{/* Desktop CTA */}
				<div className="hidden md:flex items-center gap-4">
					<div className="flex flex-row">
						<label style={{backgroundColor: theme} as CSSProperties} htmlFor="theme-button" className="cursor-pointer rounded-full p-2 text-white">
							<PaintBucket />
						</label>
						<input type="color" id="theme-button" value={theme} onChange={manageTheme} ref={themeColor} className="opacity-0 w-0 m-0 p-0" />
					</div>
					<a href="https://api.botsignal.dev/accounts/google/login" className="flex items-center gap-2 pl-2 md:pl-0 focus:outline-none group">
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
				</div>

				{/* Mobile Menu Toggle */}
				<button className="md:hidden text-on-surface-variant hover:text-primary transition-colors p-2" onClick={toggleMenu} aria-label="Toggle Menu">
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</nav>

			{/* Mobile Menu Dropdown */}
			{isOpen && (
				<div className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white/80 dark:bg-surface-dim/90 backdrop-blur-xl border border-white/60 rounded-3xl p-6 flex flex-col gap-6 shadow-lg z-40 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
					<div className="flex flex-col gap-4">
						{navLinks.map((link) => (
							<Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="text-on-surface text-lg font-medium hover:text-primary transition-colors flex items-center justify-between border-b border-outline-variant/30 pb-3">
								{link.label}
								{link.badge && <span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-1 rounded-full font-label-caps uppercase">{link.badge}</span>}
							</Link>
						))}
					</div>
					<Link href="/#hero" onClick={() => setIsOpen(false)} className="bg-primary text-on-primary font-body-md text-center text-lg font-medium px-6 py-3 rounded-full hover:bg-primary/90 transition duration-300 w-full">
						Run Free Audit
					</Link>
				</div>
			)}
		</>
	);
}
