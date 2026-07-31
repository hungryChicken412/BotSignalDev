import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
	// Keeping links in an array makes it easy to update or add new ones later
	const footerLinks = [
		{ href: "/privacy", label: "Privacy Policy" },
		{ href: "/terms", label: "Terms of Service" },
		{ href: "/security", label: "Security" },
		{ href: "#status", label: "Status" },
		{ href: "mailto:hello@botsignal.com", label: "Contact" },
	];

	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-transparent w-full py-8  px-4 md:px-container-padding text-on-surface-variant font-body-md text-sm relative z-20">
			{/* Added a subtle top border to separate it cleanly from the section above */}
			<div className="max-w-[1516px] mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-8 border-t border-outline-variant/30 pt-8">
				{/* Brand / Logo (Matches the Navbar) */}
				<Link className="font-display-xl text-xl tracking-tighter text-on-surface flex items-center gap-2 group" href="/">
					<div className="bg-primary text-on-primary p-1 rounded-full group-hover:rotate-12 transition-transform duration-300">
						<Sparkles className="w-4 h-4" />
					</div>
					RoastMySite
				</Link>

				{/* Footer Links */}
				<div className="flex flex-wrap items-center justify-center gap-6">
					{footerLinks.map((link) => (
						<Link key={link.label} href={link.href} className="hover:text-primary transition duration-300">
							{link.label}
						</Link>
					))}
				</div>

				{/* Dynamic Copyright */}
				<div>© {currentYear} RoastMySite AI. All rights reserved.</div>
			</div>
		</footer>
	);
}
