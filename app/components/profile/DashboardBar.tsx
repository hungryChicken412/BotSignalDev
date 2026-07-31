"use client";
import {Suspense, useState} from "react";
// ADD usePathname HERE
import {useSearchParams, usePathname} from "next/navigation";
import {CreditCardIcon, DollarSignIcon, FileQuestion, LayoutDashboard, Notebook, Settings, Shield, Sparkles, type LucideIcon} from "lucide-react";
import Link from "next/link";
import SettingsModal from "./SettingsModal";
import LogoBrand from "../logo";

type NavItem = {label: string; href: string; icon: LucideIcon};

const navItems: NavItem[] = [
	{label: "Account", href: "/profile", icon: LayoutDashboard},

	{label: "Tutorials", href: "/docs", icon: FileQuestion},
	{label: "Security", href: "/docs", icon: Shield},
	{label: "Billing", href: "/docs", icon: CreditCardIcon},
	{label: "Documentation", href: "/docs ", icon: Notebook},
];

// 1. Create a component that handles the actual navigation rendering
function NavigationContent() {
	const searchParams = useSearchParams();
	const pathname = usePathname(); // GET CURRENT URL PATH
	const auditId = searchParams.get("id");
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	// Helper function to append the ID to the URL if it exists
	const getHref = (basePath: string) => {
		return auditId ? `${basePath}?id=${auditId}` : basePath;
	};

	return (
		<>
			{/* Desktop Sidebar */}
			<aside className="sticky left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white py-8 md:flex">
				<div className="mb-8 flex items-center gap-3 px-6">
					<LogoBrand />
				</div>

				<nav className="flex flex-1 flex-col px-3">
					<div className="space-y-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href; // CHECK IF ACTIVE

							return (
								<Link
									key={item.label}
									href={getHref(item.href)}
									// Apply active styling conditionally
									className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
										isActive
											? "bg-indigo-50 text-indigo-700" // ACTIVE STATE
											: "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // INACTIVE STATE
									}`}
								>
									<Icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : ""}`} />
									<span>{item.label}</span>
								</Link>
							);
						})}

						<button
							onClick={() => setIsSettingsOpen(true)}
							// Apply active styling conditionally
							className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 text-sm font-medium transition ${
								isSettingsOpen
									? "bg-indigo-50 text-indigo-700" // ACTIVE STATE
									: "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // INACTIVE STATE
							}`}
						>
							<Settings className={`h-5 w-5 ${isSettingsOpen ? "text-indigo-600" : ""}`} />
							<span>Settings</span>
						</button>
					</div>
				</nav>
			</aside>

			<SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

			{/* Mobile Bottom Bar */}
			<nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface/80 backdrop-blur-md border-t border-outline-variant shadow-lg flex justify-around items-center h-16 px-4">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href; // CHECK IF ACTIVE

					return (
						<Link
							className={`flex flex-col items-center justify-center transition-colors ${
								isActive
									? "text-indigo-600" // ACTIVE STATE
									: "text-secondary hover:text-primary" // INACTIVE STATE
							}`}
							href={getHref(item.href)}
							key={item.label}
						>
							<Icon className="h-5 w-5" />
						</Link>
					);
				})}

				<button
					onClick={() => setIsSettingsOpen(true)}
					// Apply active styling conditionally
					className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 text-sm font-medium transition ${
						isSettingsOpen
							? "bg-indigo-50 text-indigo-700" // ACTIVE STATE
							: "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // INACTIVE STATE
					}`}
				>
					<Settings className={`h-5 w-5 ${isSettingsOpen ? "text-indigo-600" : ""}`} />
				</button>
			</nav>
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
