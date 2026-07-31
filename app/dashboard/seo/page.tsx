"use client";

import React from "react";
import {Loader2} from "lucide-react";
import {useReport} from "../reportContext"; // This imports your global memory
import {SEOOVerview} from "../../components/dashboard/seo/SEOOverview";

import {MediaData} from "@/app/components/dashboard/seo/MediaData";
import {StructureData} from "@/app/components/dashboard/seo/StructureData";

import dynamic from "next/dynamic";

const SeoAnalysis = dynamic(() => import("@/app/components/dashboard/seo/SeoAnalysis"), {
	ssr: false,
	loading: () => (
		<div className="lg:col-span-2 flex flex-col gap-6">
			{/* Meta Card Skeleton */}
			<div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
				<div className="p-6 border-b border-neutral-200 flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-neutral-100"></div>
					<div className="h-6 w-48 bg-neutral-200 rounded"></div>
				</div>
				<div className="p-6 space-y-6">
					<div className="h-28 bg-neutral-50 rounded-2xl border border-neutral-100"></div>
					<div className="h-28 bg-neutral-50 rounded-2xl border border-neutral-100"></div>
					<div className="h-16 bg-neutral-50 rounded-2xl border border-neutral-100"></div>
				</div>
			</div>
			{/* Site Architecture Skeleton */}
			<div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
				<div className="p-6 border-b border-neutral-200 flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-neutral-100"></div>
					<div className="h-6 w-48 bg-neutral-200 rounded"></div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
					{[1, 2, 3].map((i) => (
						<div key={i} className="p-6 flex flex-col items-center text-center gap-2">
							<div className="w-12 h-12 rounded-2xl bg-neutral-100 mb-2"></div>
							<div className="h-10 w-16 bg-neutral-200 rounded-lg"></div>
							<div className="h-3 w-32 bg-neutral-200 rounded mt-2"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	),
});

export default function SeoAuditPage() {
	// 1. Instantly grab the global data from the provider
	const {reportData, isLoading, auditId} = useReport();
	

	// ---------------------------------------------------------
	// LOADING & EMPTY STATES (Same for every page)
	// ---------------------------------------------------------
	if (isLoading) {
		return (
			<div className="ml-0 md:ml-64 mt-16 flex h-[80vh] items-center justify-center">
				<Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
			</div>
		);
	}

	if (!auditId || !reportData || !reportData.results) {
		return (
			<div className="ml-0 md:ml-64 mt-16 p-8 flex flex-col items-center justify-center text-center">
				<h2 className="text-2xl font-bold text-gray-800">No Audit Selected</h2>
				<p className="text-gray-500 mt-2">Please select an audit from your history to view its dashboard.</p>
			</div>
		);
	}

	// ---------------------------------------------------------
	// DATA MAPPING
	// ---------------------------------------------------------
	// Extract just the SEO chunk from the massive JSON
	const seoCards = reportData.results.details?.seo.cards || [];
	const seoMetadata = reportData.results.details?.seo.metadata_analysis || [];
	const siteArchitecture = reportData.results.details?.seo.site_architecture;
	const mediaHealth = reportData.results.details?.seo.media_health;
	const schema = reportData.results.details?.discovery.extra_data.schema_analysis;


	// ---------------------------------------------------------
	// RENDER UI
	// ---------------------------------------------------------
	return (
		<main className=" pt-20 md:pt-24 pb-24 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col gap-6 text-neutral-900 bg-neutral-50/50">
			{/* 1. Overview Cards (Bento Grid) */}
			{/* Pass the main seoData down to render the top scores */}
			<SEOOVerview data={seoCards} />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content Area (Left 2 columns) */}
				<div className="lg:col-span-2 flex flex-col gap-6">
					{/* 2. Metadata Analysis & Architecture */}
					{/* Pass the specific nested objects down as props */}
					<SeoAnalysis metadata={seoMetadata} siteArchitecture={siteArchitecture} />
				</div>

				{/* Sidebar Content (Right Column) */}
				<div className="flex flex-col gap-6">
					{/* 3. Media Health & Schema */}
					<StructureData data={schema} />
					<MediaData data={mediaHealth} />
				</div>
			</div>
		</main>
	);
}
