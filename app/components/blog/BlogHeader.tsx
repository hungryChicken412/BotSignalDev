"use client";

import {PaintBucket, Sparkles, Zap, LayoutDashboard, ArrowUpRight, Calendar, Search, Tag, X} from "lucide-react";
import {useEffect, useMemo, useRef, useState, type ChangeEvent, type CSSProperties} from "react";
import Link from "next/link";

interface BlogPost {
	id: string;
	title: string;
	description: string;
	category: string;
	date: string;
	href: string;
	keywords: string[];
}
const popularSearches = ["llms.txt", "Product Updates", "RAG Optimization", "API", "SEO Strategy"];

export default function BlogHeader({blogPosts}: {blogPosts: BlogPost[]}) {
	// 2. Exact Search Functionality State from Docs Page
	const [searchQuery, setSearchQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

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
							color: "#750af8",
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

	// Filter topics based on title, description, category, or keywords
	const filteredResults = useMemo(() => {
		const q = searchQuery.toLowerCase().trim();
		if (!q) return [];

		return blogPosts.filter((post) => {
			const matchTitle = post.title.toLowerCase().includes(q);
			const matchDesc = post.description.toLowerCase().includes(q);
			const matchCategory = post.category.toLowerCase().includes(q);
			const matchKeywords = post.keywords.some((kw: any) => kw.toLowerCase().includes(q));

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
		<div className="mb-16 md:mb-24 flex flex-col items-center text-center">
			<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
				<Sparkles className="w-4 h-4 text-indigo-500" />
				<span className="text-xs font-bold uppercase tracking-widest text-gray-600">Changelog & Insights</span>
			</div>

			<h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6 leading-tight">
				Building the future of <br className="hidden md:block" />
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI compatibility.</span>
			</h1>
			<p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed mb-10">Discover our latest technical guides, product updates, and insights. Built for developers, by developers.</p>

			{/* INTERACTIVE SEARCH CONTAINER (Ported from Docs) */}
			<div className="relative max-w-xl mx-auto w-full z-30" ref={searchRef}>
				<div className="relative group shadow-sm rounded-2xl">
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
						className="block w-full pl-11 pr-10 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
						placeholder="Search articles, guides, or updates..."
					/>
					{searchQuery && (
						<button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
							<X className="w-5 h-5" />
						</button>
					)}
				</div>

				{/* Quick Keyword Pills */}
				<div className="flex flex-wrap items-center justify-center gap-2 mt-4">
					<span className="text-xs text-gray-400 font-medium flex items-center gap-1 w-full sm:w-auto mb-1 sm:mb-0">
						<Tag className="w-3 h-3" /> Popular:
					</span>
					{popularSearches.map((tag) => (
						<button
							key={tag}
							onClick={() => {
								setSearchQuery(tag);
								setIsFocused(true);
							}}
							className="text-[11px] sm:text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 px-3 py-1 sm:py-1 rounded-full transition-colors border border-gray-200/60"
						>
							{tag}
						</button>
					))}
				</div>

				{/* Floating Search Results Dropdown Overlay */}
				{isFocused && searchQuery.trim().length > 0 && (
					<div className="absolute top-[65px] left-0 right-0 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[50vh] md:max-h-[380px] overflow-y-auto">
						<div className="p-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center text-[11px] sm:text-xs text-gray-400 font-medium sticky top-0 z-10 backdrop-blur-md">
							<span>Search Results</span>
							<span>{filteredResults.length} articles</span>
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
											<div className="flex items-center gap-1.5 mt-2 text-[10px] font-medium text-gray-400 uppercase tracking-widest">
												<Calendar className="w-3 h-3" />
												{result.date}
											</div>
										</div>
										<ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 shrink-0 mt-1 transition-colors hidden sm:block" />
									</Link>
								))}
							</div>
						) : (
							<div className="p-6 sm:p-8 text-center">
								<p className="text-sm font-medium text-gray-700 mb-1">No matching articles found</p>
								<p className="text-xs text-gray-400">Try searching for broader terms like &quot;LLM&quot;, &quot;Engineering&quot;, or &quot;Update&quot;.</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
