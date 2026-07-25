"use client";

import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";
import {BookOpen, Code2, Cpu, LayoutDashboard, Sparkles, Menu, X, type LucideIcon} from "lucide-react";
import Link from "next/link";

// 1. Nested Data Structure for Documentation
type DocLink = {label: string; href: string};
type DocSection = {title: string; icon: LucideIcon; links: DocLink[]};

const docSections: DocSection[] = [
	{
		title: "Getting Started",
		icon: BookOpen,
		links: [
			{label: "Introduction", href: "/docs"},
			{label: "Quick Start Guide", href: "/docs/quickstart"},
			{label: "Understanding Credits", href: "/docs/billing"},
		],
	},
	{
		title: "Audit Modules",
		icon: Cpu,
		links: [
			{label: "AI Discoverability", href: "/docs/discovery"},
			{label: "Information Density", href: "/docs/density"},
			{label: "Technical SEO", href: "/docs/seo"},
		],
	},
	{
		title: "Developers",
		icon: Code2,
		links: [
			{label: "REST API Reference", href: "/docs/api"},
			{label: "Authentication", href: "/docs/api/auth"},
			{label: "Webhooks", href: "/docs/api/webhooks"},
		],
	},
];

export default function DocsSidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	// Close mobile sidebar automatically when a route changes
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<>
			{/* Mobile Hamburger Button (Sits perfectly in the empty left space of DocsNavbar) */}
			<button onClick={() => setIsOpen(true)} aria-label="Open documentation menu" className="md:hidden fixed top-3 left-4 z-[60] p-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
				<Menu className="w-5 h-5" />
			</button>

			{/* Mobile Backdrop Overlay */}
			<div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

			{/* Sidebar Container (Slide-in on Mobile, Fixed on Desktop) */}
			<aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-[70] transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
				{/* Header */}
				<div className="flex-none py-8 px-6 flex items-start justify-between">
					<div>
						<div className="flex items-center gap-3 mb-1">
							<div className="bg-gray-900 text-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
								<Sparkles className="w-4 h-4" />
							</div>
							<Link className="font-bold text-xl tracking-tight text-gray-900" href="/">
								RoastMySite
							</Link>
						</div>
						<p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 ml-11">Documentation</p>
					</div>

					{/* Mobile Close Button */}
					<button onClick={() => setIsOpen(false)} className="md:hidden -mt-1 -mr-2 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Scrollable Index */}
				<nav className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-hide">
					<div className="space-y-8">
						{docSections.map((section) => {
							const SectionIcon = section.icon;
							return (
								<div key={section.title} className="space-y-3">
									{/* Section Header */}
									<div className="flex items-center gap-2 px-2 text-gray-900">
										<SectionIcon className="w-4 h-4 text-gray-400" />
										<h3 className="text-sm font-semibold tracking-tight">{section.title}</h3>
									</div>

									{/* Section Links */}
									<div className="flex flex-col space-y-0.5 border-l border-gray-200 ml-4 pl-3">
										{section.links.map((link) => {
											const isActive = pathname === link.href;
											return (
												<Link key={link.label} href={link.href} className={`relative py-1.5 px-3 text-sm transition-colors rounded-r-md ${isActive ? "text-indigo-700 font-medium bg-indigo-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"}`}>
													{/* Active Indicator Line */}
													{isActive && <div className="absolute left-[-13px] top-0 bottom-0 w-[2px] bg-indigo-600 rounded-full" />}
													{link.label}
												</Link>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>

					{/* Back to App Button - Moved directly beneath the sections */}
					<div className="mt-8 pt-6 border-t border-gray-100">
						<Link href="/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50/50 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200">
							<LayoutDashboard className="h-5 w-5 text-gray-400" />
							<span>Back to App</span>
						</Link>
					</div>
				</nav>
			</aside>
		</>
	);
}
