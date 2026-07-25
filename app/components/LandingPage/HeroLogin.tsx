"use client";

import {useState, useEffect} from "react";
import {ArrowRight, Check, ArrowDown, MessageSquare, SlidersHorizontal, Globe, Sparkles, Lock} from "lucide-react";
import ShowCustomToast from "../CustomToast";
import {TypewriterText} from "./Typing"; // Assuming you saved the typewriter here

export default function HeroLogin() {
	// --- Form State ---
	const [url, setUrl] = useState("");

	// Sample URLs for users who just want to test the tool
	const sampleUrls = ["stripe.com", "linear.app", "vercel.com"];

	// --- Safely load heavy particles in the background ---
	useEffect(() => {
		const initParticles = async () => {
			try {
				// Dynamically import the heavy libraries only on the client
				const {tsParticles} = await import("@tsparticles/engine");
				const {loadSlim} = await import("@tsparticles/slim");

				await loadSlim(tsParticles);
				await tsParticles.load({
					id: "tsparticles",
					options: {
						background: {
							color: "#ff000000",
							opacity: 0,
						},
						particles: {
							number: {value: 40},
							links: {
								enable: true,
								distance: 200,
								opacity: 0.35,
							},
							move: {
								enable: true,
								speed: 1,
							},
						},
					},
				});
			} catch (error) {
				console.error("Failed to load particles:", error);
			}
		};

		initParticles();
	}, []);

	const handleGoogleLogin = (e?: React.FormEvent) => {
		if (e) e.preventDefault();

		// Basic validation for URL before prompting login
		if (!url.trim()) {
			ShowCustomToast({
				label: `URL Required`,
				info: `Please enter a website URL first!`,
				type: "error",
			});
			return;
		}

		// Dummy Login Action
		ShowCustomToast({
			label: `Authentication Required`,
			info: `Redirecting to Google Login to continue your audit...`,
			type: "info",
		});

		// TODO: Integrate NextAuth / Firebase / Supabase Google Login here
		console.log("Triggering Google OAuth for URL:", url);
	};

	// Derived state for the step indicators
	const isUrlEntered = url.trim().length > 0;

	return (
		<section className="relative pt-48 pb-section-gap px-container-padding min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
			{/* Background Gradients */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-tertiary/5 to-background -z-10"></div>

			{/* Particles Container */}
			<div id="tsparticles" className="absolute inset-0 pointer-events-none -z-10"></div>

			{/* Beta / Announcement Pill */}
			<div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full px-4 py-2 mb-8 shadow-sm">
				<span className="bg-primary-container font-bold bg-primary text-white text-on-primary-container font-label-caps text-[10px] px-2 py-1 rounded-full uppercase flex items-center gap-1">
					<Sparkles className="w-3 h-3" /> MVP Live
				</span>
				<span className="font-body-md text-body-md text-on-surface">Free AI compatibility audits</span>
			</div>

			{/* Core Value Proposition with Typewriter Effect */}
			<div className="min-h-[160px] md:min-h-[210px] flex items-center justify-center max-w-4xl mb-6">
				<TypewriterText />
			</div>

			<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">Scan your website for AI discoverability, LLM compatibility, structured data, citations and SEO issues—in under 60 seconds.</p>

			<div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-3 md:gap-5 animate-[fadeInUp_0.8s_ease-out_forwards] delay-300 w-full max-w-4xl mx-auto relative z-20">
				{/* Step 1: URL */}
				<div className={`flex items-center gap-3 backdrop-blur-xl border px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 ${isUrlEntered ? "bg-emerald-500/10 border-emerald-500/30" : "bg-surface-container-lowest/80 border-outline-variant/40"}`}>
					{isUrlEntered ? <Check size={16} className="text-emerald-500" /> : <SlidersHorizontal size={16} className="text-primary" />}
					<span className={`font-body-md text-[13px] font-medium whitespace-nowrap transition-colors ${isUrlEntered ? "text-emerald-700 dark:text-emerald-400" : "text-on-surface"}`}>1. Paste Your URL</span>
				</div>

				<ArrowRight size={18} className={`hidden md:block transition-colors ${isUrlEntered ? "text-emerald-500/50" : "text-outline-variant/60"}`} />
				<ArrowDown size={18} className={`block md:hidden transition-colors ${isUrlEntered ? "text-emerald-500/50" : "text-outline-variant/60"}`} />

				{/* Step 2: Login Required */}
				<div className="flex items-center gap-3 backdrop-blur-xl border px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 bg-surface-container-lowest/80 border-outline-variant/40">
					<Lock size={16} className="text-secondary" />
					<span className="font-body-md text-[13px] font-medium whitespace-nowrap text-on-surface">2. Sign in to Verify</span>
				</div>

				<ArrowRight size={18} className="hidden md:block text-outline-variant/60" />
				<ArrowDown size={18} className="block md:hidden text-outline-variant/60" />

				{/* Step 3: Success */}
				<div className="flex items-center gap-3 backdrop-blur-xl border px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 bg-surface-container-lowest/80 border-outline-variant/40">
					<MessageSquare size={16} className="text-tertiary" />
					<span className="font-body-md text-[13px] font-medium whitespace-nowrap text-on-surface">3. Get Your Report!</span>
				</div>
			</div>

			{/* Form Container */}
			<div className="w-full max-w-[700px] bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 mb-8 backdrop-blur-xl transition-all focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.08)] focus-within:border-white/80">
				<form className="flex flex-col gap-4">
					{/* URL Input */}
					<div className="flex items-center gap-3 bg-white/50 border border-white/60 rounded-xl px-4 py-3 focus-within:bg-white/70 transition-colors">
						<Globe className="w-5 h-5 text-on-surface-variant" />
						<input type="text" disabled value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-transparent border-none font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:ring-0 outline-none" placeholder="https://yourwebsite.com" required />
					</div>

					{/* Google Login Button */}
					<a target="_blank" rel="noopener noreferrer" href="http://localhost:8000/accounts/google/login" className="w-full bg-white cursor-pointer border border-gray-200 text-gray-700 hover:bg-gray-50 font-body-md font-medium rounded-xl px-8 py-3 flex items-center justify-center gap-3 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all active:scale-95 group">
						<svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
						</svg>
						Sign in with Google to Audit
					</a>

					<p className="text-xs text-on-surface-variant/70 mt-1">Secure authentication is required to prevent spam and save your audit history.</p>
				</form>
			</div>
		</section>
	);
}
