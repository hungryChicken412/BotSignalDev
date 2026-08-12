"use client";

import React, {useState, useMemo, useRef, useEffect} from "react";
import {Search, BookOpen, Code2, PieChart, CreditCard, ChevronRight, FileText, Sparkles, LifeBuoy, X, ArrowUpRight, Tag} from "lucide-react";
import Link from "next/link";

// 1. Define Searchable Documentation Topics Index
interface SearchableTopic {
	id: string;
	title: string;
	description: string;
	category: string;
	href: string;
	keywords: string[];
}

const docsIndex: SearchableTopic[] = [
	{
		id: "quickstart",
		title: "Quick Start Guide",
		description: "Run your first AI audit, interpret readiness scores, and fix critical blockers.",
		category: "Getting Started",
		href: "/docs/quickstart",
		keywords: ["audit", "run", "scan", "credits", "start", "first audit", "quickstart"],
	},
	{
		id: "overview",
		title: "Overview Dashboard",
		description: "Understand your top-level AI Readiness Score, dimensions, and top improvements.",
		category: "Understanding Metrics",
		href: "/docs/overview",
		keywords: ["score", "readiness", "dimensions", "improvements", "dashboard", "compatibility", "gptbot"],
	},
	{
		id: "insights",
		title: "AI Insights & Strategy",
		description: "Uncover LLM business comprehension, semantic blindspots, and content action plans.",
		category: "Audit Modules",
		href: "/docs/insights",
		keywords: ["comprehension", "blindspots", "strategy", "summary", "llm", "chatgpt", "faq"],
	},
	{
		id: "seo",
		title: "Technical SEO & Architecture",
		description: "Inspect DOM structure, JSON-LD schema markup, canonicals, and media health.",
		category: "Audit Modules",
		href: "/docs/seo",
		keywords: ["schema", "canonical", "broken links", "metadata", "title", "description", "images", "h1"],
	},
	{
		id: "density",
		title: "Information Density & RAG Optimization",
		description: "Structure content for LLM chunking, facts, definitions, tables, and lists.",
		category: "Audit Modules",
		href: "/docs/density",
		keywords: ["rag", "density", "facts", "tables", "lists", "chunking", "definitions", "statistics"],
	},
	{
		id: "discovery",
		title: "AI Discoverability & Web Crawlers",
		description: "Configure robots.txt, llms.txt, sitemaps, and firewall access for AI bots.",
		category: "Audit Modules",
		href: "/docs/discovery",
		keywords: ["robots.txt", "llms.txt", "gptbot", "claudebot", "perplexitybot", "crawlers", "waf", "sitemap"],
	},
	{
		id: "billing",
		title: "Understanding Credits & Billing",
		description: "Learn how scan credits work, pay-before-use pricing, and automated refunds.",
		category: "Billing & Account",
		href: "/docs/billing",
		keywords: ["credits", "refunds", "pricing", "stripe", "buy", "pay", "balance"],
	},
	{
		id: "api",
		title: "REST API Reference",
		description: "Programmatically trigger site audits, retrieve structured JSON, and set up webhooks.",
		category: "Developers",
		href: "/docs/api",
		keywords: ["api", "rest", "webhooks", "token", "json", "endpoints", "authorization"],
	},
];

// 2. Define Category Cards
const docCategories = [
	{
		title: "Getting Started",
		description: "Learn how to run your first audit and read the dashboard.",
		icon: BookOpen,
		color: "text-emerald-600",
		bgColor: "bg-emerald-50",
		borderColor: "border-emerald-100",
		href: "/docs/quickstart",
	},
	{
		title: "Understanding Metrics",
		description: "Deep dive into Information Density and AI Discoverability.",
		icon: PieChart,
		color: "text-indigo-600",
		bgColor: "bg-indigo-50",
		borderColor: "border-indigo-100",
		href: "/docs/overview",
	},
	{
		title: "Developer API",
		description: "Endpoints, webhooks, and JSON response schemas.",
		icon: Code2,
		color: "text-amber-600",
		bgColor: "bg-amber-50",
		borderColor: "border-amber-100",
		href: "/docs/api",
	},
	{
		title: "Billing & Account",
		description: "Manage your credits, subscriptions, and team access.",
		icon: CreditCard,
		color: "text-rose-600",
		bgColor: "bg-rose-50",
		borderColor: "border-rose-100",
		href: "/docs/billing",
	},
];

const popularSearches = ["robots.txt", "Schema Markup", "Information Density", "Credits", "REST API"];

export default function DocumentationPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	// Filter topics based on title, description, category, or keywords
	const filteredResults = useMemo(() => {
		const q = searchQuery.toLowerCase().trim();
		if (!q) return [];

		return docsIndex.filter((topic) => {
			const matchTitle = topic.title.toLowerCase().includes(q);
			const matchDesc = topic.description.toLowerCase().includes(q);
			const matchCategory = topic.category.toLowerCase().includes(q);
			const matchKeywords = topic.keywords.some((kw) => kw.toLowerCase().includes(q));

			return matchTitle || matchDesc || matchCategory || matchKeywords;
		});
	}, [searchQuery]);

	// Handle clicking outside the search dropdown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsFocused(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<main className=" overflow-x-hidden pt-24 md:pt-24 pb-24 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto min-h-screen text-gray-900 bg-gray-50/50">
			{/* Header & Search Section */}
			<div className="relative overflow-visible rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 md:p-12 shadow-sm mb-8">
				{/* Decorative blur - scaled down on mobile to prevent stretching/performance hits */}
				<div className="absolute -right-10 -top-10 md:-right-20 md:-top-20 h-40 w-40 md:h-64 md:w-64 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 blur-3xl opacity-70 pointer-events-none" />

				<div className="relative z-10 max-w-2xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-6">
						<Sparkles className="w-3 h-3" />
						Help Center
					</div>

					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3 md:mb-4">How can we help you today?</h1>
					<p className="text-sm sm:text-base text-gray-500 mb-6 md:mb-8">Search our guides and documentation to get the most out of your AI audits.</p>

					{/* Interactive Search Container */}
					<div className="relative max-w-xl mx-auto z-30" ref={searchRef}>
						<div className="relative group">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
							</div>
							<input
								type="text"
								value={searchQuery}
								onFocus={() => setIsFocused(true)}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setIsFocused(true);
								}}
								className="block w-full pl-11 pr-10 py-3.5 md:py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-sm text-sm"
								placeholder="Search queries (e.g. 'schema', 'credits')..."
							/>
							{searchQuery && (
								<button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
									<X className="w-4 h-4" />
								</button>
							)}
						</div>

						{/* Quick Keyword Pills */}
						<div className="flex flex-wrap items-center justify-center gap-2 mt-4">
							<span className="text-[11px] text-gray-400 font-medium flex items-center gap-1 w-full sm:w-auto mb-1 sm:mb-0">
								<Tag className="w-3 h-3" /> Popular:
							</span>
							{popularSearches.map((tag) => (
								<button
									key={tag}
									onClick={() => {
										setSearchQuery(tag);
										setIsFocused(true);
									}}
									className="text-[11px] sm:text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 px-2.5 py-1 sm:py-0.5 rounded-full transition-colors border border-gray-200/60"
								>
									{tag}
								</button>
							))}
						</div>

						{/* Floating Search Results Dropdown Overlay */}
						{isFocused && searchQuery.trim().length > 0 && (
							<div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[50vh] md:max-h-[380px] overflow-y-auto">
								<div className="p-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center text-[11px] sm:text-xs text-gray-400 font-medium sticky top-0 z-10 backdrop-blur-md">
									<span>Search Results</span>
									<span>{filteredResults.length} found</span>
								</div>

								{filteredResults.length > 0 ? (
									<div className="divide-y divide-gray-50">
										{filteredResults.map((result) => (
											<Link key={result.id} href={result.href} onClick={() => setIsFocused(false)} className="p-3 sm:p-4 flex items-start justify-between gap-3 sm:gap-4 hover:bg-indigo-50/50 transition-colors group">
												<div>
													<div className="flex flex-wrap items-center gap-2 mb-1">
														<span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{result.category}</span>
														<h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{result.title}</h4>
													</div>
													<p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-1">{result.description}</p>
												</div>
												<ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 shrink-0 mt-1 transition-colors hidden sm:block" />
											</Link>
										))}
									</div>
								) : (
									<div className="p-6 sm:p-8 text-center">
										<p className="text-sm font-medium text-gray-700 mb-1">No matching topics found</p>
										<p className="text-xs text-gray-400">Try searching for broader terms like &quot;schema&quot;, &quot;robots&quot;, or &quot;credits&quot;.</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
				{/* Left Column: Categories */}
				<div className="lg:col-span-2">
					<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Browse by Category</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{docCategories.map((category) => {
							const Icon = category.icon;
							return (
								<Link href={category.href} key={category.title} className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:shadow-md hover:-translate-y-1 hover:border-gray-300 transition-all duration-300">
									<div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border ${category.bgColor} ${category.color} ${category.borderColor}`}>
										<Icon className="w-5 h-5 sm:w-6 sm:h-6" />
									</div>
									<h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-indigo-600 transition-colors">{category.title}</h3>
									<p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{category.description}</p>
								</Link>
							);
						})}
					</div>
				</div>

				{/* Right Column: Quick Links & Support */}
				<div className="flex flex-col gap-6 mt-2 lg:mt-0">
					{/* Support Card */}
					<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
						<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
						<LifeBuoy className="w-8 h-8 text-indigo-300 mb-3 sm:mb-4" />
						<h3 className="text-base sm:text-lg font-semibold mb-2">Still need help?</h3>
						<p className="text-xs sm:text-sm text-gray-300 mb-5 sm:mb-6 leading-relaxed">Our support team is available 24/7 to help you resolve auditing issues.</p>
						<a href="mailto:hello@BotSignal.dev" className="block text-center w-full py-2.5 px-4 bg-white text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
							Contact Support
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
