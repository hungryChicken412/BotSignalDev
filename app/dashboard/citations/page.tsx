"use client";

import React from "react";
import {Loader2, Sparkles} from "lucide-react";
import {useReport} from "../reportContext"; // Global data memory hook
import CitationScore from "@/app/components/dashboard/citations/CitationScore";

import {CitationDiagnostics} from "@/app/components/dashboard/citations/CitationDiagnostics";
import {Quotable} from "@/app/components/dashboard/citations/Quotable";

import dynamic from "next/dynamic";

const AIReusability = dynamic(() => import("@/app/components/dashboard/citations/AIReusability"), {
	ssr: false,
	loading: () => (
		<div className="md:col-span-8 bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-between shadow-[0px_4px_20px_-4px_rgba(0,0,0,0.05)] h-[350px]">
			<div className="mb-10 animate-pulse">
				<div className="h-3 w-48 bg-gray-200 rounded mb-4"></div>
				<div className="flex items-baseline gap-2">
					<div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
					<div className="h-4 w-32 bg-gray-100 rounded"></div>
				</div>
			</div>
			{/* Fake Chart Bars */}
			<div className="w-full h-52 flex flex-col justify-around gap-2 animate-pulse">
				<div className="w-full h-8 bg-slate-50 rounded-full"></div>
				<div className="w-[85%] h-8 bg-slate-50 rounded-full"></div>
				<div className="w-[60%] h-8 bg-slate-50 rounded-full"></div>
			</div>
		</div>
	),
});

export default function CitationPotentialPage() {
	// 1. Grab global data
	const {reportData, isLoading, auditId} = useReport();
	console.log(reportData);

	// ---------------------------------------------------------
	// LOADING & EMPTY STATES
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
			</div>
		);
	}

	// 2. Extract Citation specific data
	const citationData = reportData.results.details?.citation || {};
	const citations = reportData.results.details.insights;
	console.log(citationData);

	return (
		<main className="md:ml-64 pt-8 md:pt-28 px-4 md:px-8 max-w-7xl mx-auto pb-24 md:pb-16 flex flex-col gap-6 text-neutral-900 bg-neutral-50/50">
			{/* Header Section */}
			<div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm transition-all hover:shadow-md">
				<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 blur-3xl opacity-70 pointer-events-none" />
				<div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
					<div className="max-w-2xl">
						<div className="flex items-center gap-3">
							<p className="text-xs font-bold uppercase tracking-widest text-indigo-500">AI Cites you!</p>
						</div>
						<h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">Highly Discoverable by AI</h2>
						<p className="mt-3 text-gray-500 leading-relaxed text-base">Your website contains high-quality factual content that AI assistants can confidently reference.</p>
					</div>
					<div className="flex shrink-0 items-start">
						<div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
							<Sparkles className="h-4 w-4" /> Excellent Health
						</div>
					</div>
				</div>
			</div>

			{/* Data Visualization Grid */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
				{/* Pass data to components */}
				<CitationScore score={citationData.density_score} />
				<AIReusability data={citationData.usability} />
			</div>

			<CitationDiagnostics data={citationData.diagnostics_llm} />
			<Quotable citations={reportData.results.details?.insights?.ai_predicted_citations || []} />
		</main>
	);
}
