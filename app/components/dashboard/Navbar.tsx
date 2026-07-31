"use client";

import {
	Download,
	Share2,
	Bell,
	PaintBucket,
	Menu,
	Sparkles,
	X,
} from "lucide-react";
import {
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type CSSProperties,
} from "react";
import Link from "next/link";
import LogoBrand from "../logo";

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
		{ href: "/", label: "Home" },
		{ href: "#faq", label: "FAQ" },
	];

	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		const savedTheme = window.localStorage.getItem("accent-color");
		const initialTheme =
			savedTheme ||
			getComputedStyle(document.documentElement)
				.getPropertyValue("--orange-base")
				.trim() ||
			"#750af8";

		setTheme(initialTheme);
		document.documentElement.style.setProperty(
			"--orange-base",
			initialTheme,
		);
		document.documentElement.style.setProperty(
			"--primary-base",
			initialTheme,
		);
	}, []);

	const manageTheme = (event?: ChangeEvent<HTMLInputElement>) => {
		const nextTheme =
			event?.target.value ?? themeColor.current?.value ?? theme;

		if (nextTheme) {
			setTheme(nextTheme);
			document.documentElement.style.setProperty(
				"--orange-base",
				nextTheme,
			);
			document.documentElement.style.setProperty(
				"--primary-base",
				nextTheme,
			);
			window.localStorage.setItem("accent-color", nextTheme);
		}
	};

	return (
		<>
			<header className="hidden md:flex fixed top-0 left-64 right-0 z-40 h-16 items-center justify-between border-b border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] px-6 transition-all duration-300">
				<div className="flex items-center gap-4">
					<span className="rounded-full border border-white/60 bg-white/50 px-3 py-1 text-sm font-medium text-gray-600 backdrop-blur-md">
						Last scan: 2 mins ago
					</span>
				</div>

				<div className="flex items-center gap-4">
					<nav className="flex items-center gap-5">
						<a
							href="#"
							className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600"
						>
							<Download className="h-4 w-4" />
							Export PDF
						</a>

						<a
							href="#"
							className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600"
						>
							<Share2 className="h-4 w-4" />
							Share Report
						</a>
					</nav>

					<button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-95">
						Scan Again
					</button>

					<div className="flex">
						<label
							style={{ backgroundColor: theme } as CSSProperties}
							htmlFor="theme-button"
							className="cursor-pointer rounded-full p-2 text-white shadow-sm transition hover:scale-105"
						>
							<PaintBucket className="h-4 w-4" />
						</label>

						<input
							type="color"
							id="theme-button"
							value={theme}
							onChange={manageTheme}
							ref={themeColor}
							className="m-0 h-0 w-0 opacity-0"
						/>
					</div>
				</div>
			</header>
			<nav className="md:hidden fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/60 bg-white/40 dark:bg-surface-dim/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] z-50 flex justify-between items-center py-3 px-6 transition-all duration-300">
				{/* Logo & Brand */}
				 <LogoBrand/> 

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="text-on-surface-variant font-medium hover:text-primary transition duration-300 font-body-md text-sm flex items-center gap-2"
						>
							{link.label}
							
						</Link>
					))}
				</div>

				{/* Desktop CTA */}
				<div className="hidden md:flex items-center gap-4">
					<div className="flex flex-row">
						<label
							style={{ backgroundColor: theme } as CSSProperties}
							htmlFor="theme-button"
							className="cursor-pointer rounded-full p-2 text-white"
						>
							<PaintBucket />
						</label>
						<input
							type="color"
							id="theme-button"
							value={theme}
							onChange={manageTheme}
							ref={themeColor}
							className="opacity-0 w-0 m-0 p-0"
						/>
					</div>
					<Link
						className="bg-primary text-on-primary font-body-md text-sm font-medium px-6 py-2.5 rounded-full hover:bg-primary/90 transition duration-300 shadow-sm active:scale-95"
						href="/"
					>
						Run Free Audit
					</Link>
				</div>

				{/* Mobile Menu Toggle */}
				<button
					className="md:hidden text-on-surface-variant hover:text-primary transition-colors p-2"
					onClick={toggleMenu}
					aria-label="Toggle Menu"
				>
					{isOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</nav>

			{/* Mobile Menu Dropdown */}
			{isOpen && (
				<div className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white/80 dark:bg-surface-dim/90 backdrop-blur-xl border border-white/60 rounded-3xl p-6 flex flex-col gap-6 shadow-lg z-40 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
					<div className="flex flex-col gap-4">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className="text-on-surface text-lg font-medium hover:text-primary transition-colors flex items-center justify-between border-b border-outline-variant/30 pb-3"
							>
								{link.label}
							</Link>
						))}
					</div>
					<Link
						href="/"
						onClick={() => setIsOpen(false)}
						className="bg-primary text-on-primary font-body-md text-center text-lg font-medium px-6 py-3 rounded-full hover:bg-primary/90 transition duration-300 w-full"
					>
						Export PDF
					</Link>
				</div>
			)}
		</>
	);
}
