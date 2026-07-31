import Link from "next/link";

import {Sparkles} from "lucide-react";
// Import the brand icons from react-icons/si (Simple Icons)
import {SiGithub, SiX, SiLinkerd} from "react-icons/si";
import LogoBrand from "./logo";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className=" border-t border-gray-200/60 bg-white/50  pt-16 pb-8 px-4 md:px-8 overflow-hidden " >
			{/* Subtle background glow */}

			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16">
				{/* Left Side: Brand, Tagline & Status */}
				<div className="flex flex-col gap-5 max-w-sm">
					<LogoBrand />

					<p className="text-sm text-gray-500 leading-relaxed">Analyze your website for AI discoverability, technical SEO, and structured data in under 60 seconds.</p>

					{/* Premium Status Indicator */}
					<a href="#status" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors w-fit mt-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
						</span>
						All systems operational
					</a>
				</div>

				{/* Right Side: Categorized Links */}
				<div className="grid grid-cols-2 gap-12 md:gap-24">
					{/* Column 1: Legal */}
					<div className="flex flex-col gap-4">
						<h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">Legal</h3>
						<Link href="/docs/privacy" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
							Privacy Policy
						</Link>
						<Link href="/docs/terms" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
							Terms of Service
						</Link>
						<Link href="/docs/security" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
							Security
						</Link>
					</div>

					{/* Column 2: Support */}
					<div className="flex flex-col gap-4">
						<h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">Support</h3>
						<Link href="/docs" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
							Documentation
						</Link>
						<a href="mailto:hello@BotSignal.dev" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
							Contact Us
						</a>
					</div>
				</div>
			</div>

			{/* Bottom Row: Copyright & Socials */}
			<div className="max-w-7xl mx-auto pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="text-sm font-medium text-gray-400">&copy; {currentYear} BotSignal.dev. All rights reserved.</div>

				{/* Social Icons */}
				{/* Social Icons */}
				<div className="flex items-center gap-4">
					<a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="X (Twitter)">
						<SiX className="w-4 h-4" /> {/* Updated to the new X logo */}
					</a>
					<a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="GitHub">
						<SiGithub className="w-4 h-4" />
					</a>
					<a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="LinkedIn">
						<SiLinkerd className="w-4 h-4" />
					</a>
				</div>
			</div>
		</footer>
	);
}
