"use client";

import {useState, useEffect} from "react";
import {ArrowRight, Check, ArrowDown, Code, MessageSquare, SlidersHorizontal, Loader2, Globe, Mail, Sparkles} from "lucide-react";
import {userService} from "@/app/user.service";
import ShowCustomToast from "../CustomToast";
import {TypewriterText} from "./Typing"; // Assuming you saved the typewriter here

export default function Hero() {
	// --- Form State ---
	const [url, setUrl] = useState("");
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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

	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();

		// Basic validation
		if (!url.trim() || !email.trim()) return;

		setIsSubmitting(true);
		setStatus("idle");
		ShowCustomToast({
			label: `Processing!`,
			info: `Kindly wait!`,
			type: "info",
		});

		try {
			// Send the actual API request to the backend
			const q = await userService.requestAudit([url], email);

			console.log("AuditReport requested for:", url, email, q);
			ShowCustomToast({
				label: `Generating your report!`,
				info: `Report will be sent to your email: ${email} when it is ready!`,
				type: "success",
			});
			setStatus("success");
		} catch (error: any) {
			// 'error' will now be exactly what Django sent
			console.error("Failed to submit audit:", error);

			const errorMessage = typeof error === "string" ? error : "An unexpected error occurred.";

			ShowCustomToast({
				label: `Action Failed`,
				info: errorMessage,
				type: "error",
			});
			setStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Derived state for the step indicators
	const isUrlEntered = url.trim().length > 0;
	const isEmailEntered = email.trim().length > 0;
	const isReportSent = status === "success";

	return (
		<section className="relative pt-48 pb-section-gap px-2 md:px-container-padding min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
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

			<div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-3 md:gap-5 animate-[fadeInUp_0.8s_ease-out_forwards] delay-300 w-full max-w-4xl mx-auto relative z-20 ">
				{/* Step 1: URL */}
				<div className={`flex items-center gap-3 backdrop-blur-xl border px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 ${isUrlEntered ? "bg-emerald-500/10 border-emerald-500/30" : "bg-surface-container-lowest/80 border-outline-variant/40"}`}>
					{isUrlEntered ? <Check size={16} className="text-emerald-500" /> : <SlidersHorizontal size={16} className="text-primary" />}
					<span className={`font-body-md text-[13px] font-medium whitespace-nowrap transition-colors ${isUrlEntered ? "text-emerald-700 dark:text-emerald-400" : "text-on-surface"}`}>1. Paste Your URL</span>
				</div>

				<ArrowRight size={18} className={`hidden md:block transition-colors ${isUrlEntered ? "text-emerald-500/50" : "text-outline-variant/60"}`} />
				<ArrowDown size={18} className={`block md:hidden transition-colors ${isUrlEntered ? "text-emerald-500/50" : "text-outline-variant/60"}`} />

				{/* Step 2: Email */}
				<div className={`flex items-center gap-3 backdrop-blur-xl border px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 ${isEmailEntered ? "bg-emerald-500/10 border-emerald-500/30" : "bg-surface-container-lowest/80 border-outline-variant/40"}`}>
					{isEmailEntered ? <Check size={16} className="text-emerald-500" /> : <Code size={16} className="text-secondary" />}
					<span className={`font-body-md text-[13px] font-medium whitespace-nowrap transition-colors ${isEmailEntered ? "text-emerald-700 dark:text-emerald-400" : "text-on-surface"}`}>2. Enter Your Email</span>
				</div>

				<ArrowRight size={18} className={`hidden md:block transition-colors ${isEmailEntered ? "text-emerald-500/50" : "text-outline-variant/60"}`} />
				<ArrowDown size={18} className={`block md:hidden transition-colors ${isEmailEntered ? "text-emerald-500/50" : "text-outline-variant/60"}`} />

				{/* Step 3: Success */}
				<div className={`flex items-center gap-3 backdrop-blur-xl border px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 ${isReportSent ? "bg-emerald-500/10 border-emerald-500/30" : "bg-surface-container-lowest/80 border-outline-variant/40"}`}>
					{isReportSent ? <Check size={16} className="text-emerald-500" /> : <MessageSquare size={16} className="text-tertiary" />}
					<span className={`font-body-md text-[13px] font-medium whitespace-nowrap transition-colors ${isReportSent ? "text-emerald-700 dark:text-emerald-400" : "text-on-surface"}`}>3. Get Your Report!</span>
				</div>
			</div>

			{/* Form Container */}
			<div className="w-full max-w-[700px] bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 mb-8 backdrop-blur-xl transition-all focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.08)] focus-within:border-white/80">
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{/* URL Input */}
					<div className="flex items-center gap-3 bg-white/50 border border-white/60 rounded-xl px-4 py-3 focus-within:bg-white/70 transition-colors">
						<Globe className="w-5 h-5 text-on-surface-variant" />
						<input type="text" value={url} onChange={(e) => setUrl(e.target.value)} disabled={isSubmitting || status === "success"} className="w-full bg-transparent border-none font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:ring-0 outline-none disabled:opacity-50" placeholder="https://yourwebsite.com" required />
					</div>

					{/* Email Input & Submit Row */}
					<div className="flex flex-col sm:flex-row items-center gap-3">
						<div className="flex-1 w-full flex items-center gap-3 bg-white/50 border border-white/60 rounded-xl px-4 py-3 focus-within:bg-white/70 transition-colors">
							<Mail className="w-5 h-5 text-on-surface-variant" />
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting || status === "success"} className="w-full bg-transparent border-none font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:ring-0 outline-none disabled:opacity-50" placeholder="you@company.com" required />
						</div>

						<button type="submit" disabled={!url.trim() || !email.trim() || isSubmitting || status === "success"} className="w-full sm:w-auto bg-primary cursor-pointer hover:scale-105 text-white font-body-md font-medium rounded-xl px-8 py-3 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_6px_20px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed">
							{isSubmitting ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									Scanning...
								</>
							) : status === "success" ? (
								"Report Sent!"
							) : (
								<>
									Audit Site
									<ArrowRight className="h-5 w-5" />
								</>
							)}
						</button>
					</div>
				</form>
			</div>

			{/* Interactive Sample URLs */}
			<div className="flex flex-wrap items-center justify-center gap-3">
				<span className="font-label-caps text-on-surface-variant/70 text-[11px] font-bold uppercase tracking-widest mr-2">Try a sample:</span>
				{sampleUrls.map((sample) => (
					<button key={sample} onClick={() => setUrl(`https://${sample}`)} disabled={isSubmitting || status === "success"} className="bg-white/40 text-on-surface border border-white/60 shadow-sm rounded-full px-4 py-1.5 font-body-md text-sm hover:bg-white/70 hover:-translate-y-0.5 transition-all backdrop-blur-md disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed">
						{sample}
					</button>
				))}
			</div>
		</section>
	);
}
