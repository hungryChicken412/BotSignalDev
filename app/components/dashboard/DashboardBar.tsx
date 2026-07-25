"use client";

import {useState, useEffect, Suspense} from "react";
import {useSearchParams, usePathname} from "next/navigation";
import {Bot, Crown, LayoutDashboard, Quote, Search, ShieldCheck, Sparkles, Menu, X, type LucideIcon} from "lucide-react";
import Link from "next/link";
import {baseUrl} from "@/app/user.service";

type NavItem = {label: string; href: string; icon: LucideIcon};

const navItems: NavItem[] = [
	{label: "Overview", href: "/dashboard", icon: LayoutDashboard},
	{label: "SEO", href: "/dashboard/seo", icon: Search},
];

const proNavItems: NavItem[] = [
	{label: "AI Insights", href: "/dashboard/insights", icon: Sparkles},
	{label: "AI Discovery", href: "/dashboard/discovery", icon: Bot},
	{label: "Citation Potential", href: "/dashboard/citations", icon: Quote},
];

// 1. Create a component that handles the actual navigation rendering
function NavigationContent() {
	const searchParams = useSearchParams();
	const pathname = usePathname(); // GET CURRENT URL PATH
	const auditId = searchParams.get("id");
	const [isOpen, setIsOpen] = useState(false);

	// Helper function to append the ID to the URL if it exists
	const getHref = (basePath: string) => {
		return auditId ? `${basePath}?id=${auditId}` : basePath;
	};

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
			{/* Mobile Hamburger Button */}
			<button onClick={() => setIsOpen(true)} aria-label="Open dashboard menu" className="md:hidden fixed top-3 left-4 z-[60] p-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
				<Menu className="w-5 h-5" />
			</button>

			{/* Mobile Backdrop Overlay */}
			<div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

			{/* Sidebar Container (Slide-in on Mobile, Fixed on Desktop) */}
			<aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-[70] transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
				{/* Header */}
				<div className="flex-none py-8 px-6 flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="bg-primary text-on-primary p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300">
							<Sparkles className="w-5 h-5" />
						</div>
						<div>
							<Link className="font-display-xl text-xl tracking-tighter text-on-surface flex items-center gap-2 group" href="/">
								RoastMySite.AI
							</Link>
							<p className="text-xs uppercase tracking-wider text-gray-500">Technical Audit Pro</p>
						</div>
					</div>

					{/* Mobile Close Button */}
					<button onClick={() => setIsOpen(false)} className="md:hidden -mt-1 -mr-2 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
						<X className="w-5 h-5" />
					</button>
				</div>

				<nav className="flex flex-1 flex-col px-3 overflow-y-auto scrollbar-hide pb-8">
					<div className="mb-3 flex items-center justify-between px-4">
						<span className="text-xs font-semibold uppercase tracking-wider text-gray-500">AI Features</span>
						<span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">PRO</span>
					</div>

					<div className="space-y-1">
						{proNavItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Link key={item.label} href={getHref(item.href)} className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
									<div className="flex items-center gap-3">
										<Icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : ""}`} />
										<span>{item.label}</span>
									</div>
									<Crown className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-primary"}`} />
								</Link>
							);
						})}
					</div>

					<div className="my-6 border-t border-gray-200" />

					<div className="mb-3 flex items-center justify-between px-4">
						<span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Fundamentals</span>
					</div>

					<div className="space-y-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Link key={item.label} href={getHref(item.href)} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
									<Icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : ""}`} />
									<span>{item.label}</span>
								</Link>
							);
						})}

						<a href={`${baseUrl}/reports/${auditId}/download-pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition text-gray-600 hover:bg-gray-100 hover:text-gray-900">
							<ShieldCheck className="h-5 w-5 text-gray-400" />
							<span>Full Diagnostics Report</span>
						</a>
					</div>
				</nav>
			</aside>
		</>
	);
}

// 2. Wrap it in Suspense to keep Next.js App Router happy
export default function Navbar() {
	return (
		<Suspense fallback={<div className="w-64 bg-white border-r h-screen hidden md:block"></div>}>
			<NavigationContent />
		</Suspense>
	);
}
