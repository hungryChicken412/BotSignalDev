"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useReport } from "../reportContext"; // Import global memory hook

import {ScrawlerFiles} from "@/app/components/dashboard/discovery/ScrawlerFiles";
import CrawlJourney from "@/app/components/dashboard/discovery/CrawlJourney";

import dynamic from "next/dynamic";

const CrawlerAccessGrid = dynamic(() => import("@/app/components/dashboard/discovery/CrawlerAccessGrid").then((mod) => mod.default), {
	ssr: false,
	loading: () => (
		<div className="flex flex-col gap-6 w-full md:w-[60%]">
			{/* Bots Grid Skeleton */}
			<div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-pulse">
				<div className="mb-6 border-b border-slate-200 pb-4">
					<div className="h-8 w-56 bg-slate-200 rounded-lg"></div>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-slate-50 h-[106px]">
							<div className="w-10 h-10 rounded-full bg-slate-200 mb-2"></div>
							<div className="h-3 w-16 bg-slate-200 rounded"></div>
						</div>
					))}
				</div>
			</div>
			{/* Metadata Section Skeleton */}
			<div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-pulse h-64">
				<div className="mb-6 border-b border-slate-200 pb-4">
					<div className="h-6 w-64 bg-slate-200 rounded-lg"></div>
				</div>
				<div className="space-y-4">
					<div className="h-10 w-full bg-slate-50 rounded-lg"></div>
					<div className="h-10 w-full bg-slate-50 rounded-lg"></div>
					<div className="h-10 w-full bg-slate-50 rounded-lg"></div>
				</div>
			</div>
		</div>
	),
});

export default function DiscoveryPage() {
	// 1. Instantly grab the global data from the provider
	const { reportData, isLoading, auditId } = useReport();

	// ---------------------------------------------------------
	// LOADING & EMPTY STATES
	// ---------------------------------------------------------
	if (isLoading) {
		return (
			<div className="ml-0  mt-16 flex h-[80vh] items-center justify-center">
				<Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
			</div>
		);
	}

	if (!auditId || !reportData || !reportData.results) {
		return (
			<div className="ml-0  mt-16 p-8 flex flex-col items-center justify-center text-center">
				<h2 className="text-2xl font-bold text-gray-800">
					No Audit Selected
				</h2>
				<p className="text-gray-500 mt-2">
					Please select an audit from your history to view its
					dashboard.
				</p>
			</div>
		);
	}

	// ---------------------------------------------------------
	// DATA MAPPING
	// ---------------------------------------------------------
	// Extract the discovery chunk from the JSON details
	const discoveryData =
		reportData.results.details?.discovery|| {};


	// ---------------------------------------------------------
	// RENDER UI
	// ---------------------------------------------------------
	return (
		<main className=" pt-16 md:pt-24 pb-24 md:pb-12 px-4 md:px-8 max-w-7xl">
			<div className="flex flex-col gap-6">
				{/* 1. Core Files (Robots, Sitemap, LLMs.txt) */}
				<ScrawlerFiles files={discoveryData.crawlability} />

				<div className="flex flex-col lg:flex-row gap-6">
					{/* 2. Bot Access Grid (GPTBot, Claude, etc.) */}
					<CrawlerAccessGrid botsData={discoveryData.botsData} />

					{/* 3. Crawl Timeline/Journey */}
					<CrawlJourney crawlSteps={discoveryData.crawlSteps} />
				</div>
			</div>
		</main>
	);
}
