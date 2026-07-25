"use client";

import React, {useState, useMemo, useRef, useEffect} from "react";
import {Search, Sparkles, X, ArrowUpRight, Calendar, Tag} from "lucide-react";
import Link from "next/link";
import BlogHeader from "../components/blog/BlogHeader";

// 1. Define Searchable Blog Posts Index (Mocking your Django Data for the client side)
interface BlogPost {
	id: string;
	title: string;
	description: string;
	category: string;
	date: string;
	href: string;
	keywords: string[];
}

const blogPosts: BlogPost[] = [
	{
		id: "EndOfEra",
		title: "The End of Ten Blue Links: How to Optimize Your Startup for AI Search",
		description: "LLMs have fundamentally changed how people find information online. Here is how founders can ensure their websites are read, understood, and cited by AI.",
		category: "AI Strategy",
		date: "Jul 22, 2026",
		keywords: ["seo", "llm", "semantic", "entity", "future", "search"],
	},
];

export default function BlogIndexPage() {
	return (
		<main className="min-h-screen bg-gray-50/50 pt-24 md:pt-32 pb-24 md:pb-12 relative overflow-hidden z-0">
			{/* --- SMALL GRADIENT GLOW BEHIND HEADER (From original Blog) --- */}
			<div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />

			<div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
				{/* Vercel-Style Premium Header */}
				<BlogHeader blogPosts={blogPosts} />

				{/* PREMIUM GRID LAYOUT (From original Blog layout) */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
					{blogPosts.map((blog) => (
						<Link key={blog.id} href={`/blogs/${blog.id}`} className="group flex flex-col justify-between p-8 bg-white border border-gray-200/80 rounded-3xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 ease-out">
							<div>
								{/* Metadata Row */}
								<div className="flex items-center gap-4 mb-6">
									<span className="text-[11px] font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">{blog.category}</span>
									<div className="flex items-center text-xs text-gray-400 font-semibold uppercase tracking-wider">
										<Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
										{blog.date}
									</div>
								</div>

								{/* Title & Description */}
								<h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">{blog.title}</h3>
								<p className="text-base text-gray-500 leading-relaxed line-clamp-3">{blog.description}</p>
							</div>

							{/* Animated "Read Article" Button */}
							<div className="mt-8 flex items-center text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
								Read article
								<ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out" />
							</div>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}
