"use client";

import {
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type CSSProperties,
} from "react";
import Link from "next/link";
import { Menu, X, Sparkles, PaintBucket } from "lucide-react";

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
		{ href: "#how-it-works", label: "How it works" , badge: ""},
		{ href: "/docs", label: "Documentation" , badge: ""},

		{ href: "#faq", label: "FAQ" ,badge: ""},


		// { href: "/dashboard", label: "Dashboard", badge: "Beta" },
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
			<nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/60 bg-white/40 dark:bg-surface-dim/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] z-50 flex justify-between items-center py-3 px-6 transition-all duration-300">
				{/* Logo & Brand */}
				<Link
					className="font-display-xl text-xl tracking-tighter text-on-surface dark:text-primary-fixed-dim flex items-center gap-2 group"
					href="/"
				>
					<div className="bg-primary text-on-primary p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300">
						<Sparkles className="w-5 h-5" />
					</div>
					BotSignal.dev
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="text-on-surface-variant font-medium hover:text-primary transition duration-300 font-body-md text-sm flex items-center gap-2"
						>
							{link.label}
							{link.badge && (
								<span className="bg-secondary-container bg-primary text-white font-bold text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full font-label-caps uppercase">
									✨{link.badge}
								</span>
							)}
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
								{link.badge && (
									<span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-1 rounded-full font-label-caps uppercase">
										{link.badge}
									</span>
								)}
							</Link>
						))}
					</div>
					<Link
						href="/"
						onClick={() => setIsOpen(false)}
						className="bg-primary text-on-primary font-body-md text-center text-lg font-medium px-6 py-3 rounded-full hover:bg-primary/90 transition duration-300 w-full"
					>
						Run Free Audit
					</Link>
				</div>
			)}
		</>
	);
}
