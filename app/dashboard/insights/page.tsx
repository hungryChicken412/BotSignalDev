"use client";

import React from "react";
import {FileCode, FileJson, Network, Loader2} from "lucide-react";
import {useReport} from "../reportContext"; // Import global memory hook
import {ActionPlanSection} from "../../components/dashboard/insights/ActionPlanSection";
import {ExecutiveSummarySection} from "../../components/dashboard/insights/ExecutiveSummarySection";
import {StrengthsSection} from "../../components/dashboard/insights/StrengthsSection";
import {WeaknessesSection} from "../../components/dashboard/insights/WeaknessesSection";

export default function AIRecommendationsPage() {
	// 1. Instantly grab the global data from the provider
	const {reportData, isLoading, auditId} = useReport();

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
				<p className="text-gray-500 mt-2">Please select an audit from your history to view its dashboard.</p>
			</div>
		);
	}

	// ---------------------------------------------------------
	// DATA MAPPING
	// ---------------------------------------------------------
	const insights = reportData.results.details?.insights || {};
	const ExecutiveSummary = insights.ExecutiveSummary || "";
	const actionPlan = insights.action_plan || {};

	// Map AI Can Answer (Strengths)
	const strengthItems = (insights.ai_can_answer || []).map((item: any, index: number) => ({
		title: `"${item.question}"`,
		description: item.why_it_succeeded,
		// Cycle through the Lucide icons to keep the UI looking varied
		icon: index % 3 === 0 ? FileCode : index % 3 === 1 ? Network : FileJson,
		fullWidth: index % 3 === 2,
	}));

	// Map AI Cannot Answer (Weaknesses)
	const weaknessItems = (insights.ai_cannot_answer || []).map((item: any) => ({
		title: `"${item.question}"`,
		indicatorColor: item.impact?.toLowerCase().includes("lost") ? "bg-red-500" : "bg-amber-500",
		impactText: item.impact || "Missed Opportunity",
		whyItMatters: item.why_it_matters,
		fix: item.fix,
	}));

	// Determine the tone mapping for your ExecutiveSummary component
	const priorityLevel = insights.action_priority?.level || "Medium";
	const priorityTone = priorityLevel === "High" ? "high" : priorityLevel === "Low" ? "low" : "medium";

	// ---------------------------------------------------------
	// RENDER UI
	// ---------------------------------------------------------
	return (
		<main className="md:ml-64 pt-16 md:pt-24 pb-24 md:pb-12 px-4 md:px-8 max-w-7xl">
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<ExecutiveSummarySection data={ExecutiveSummary} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 mt-12">
					<StrengthsSection items={strengthItems} />
					<WeaknessesSection items={weaknessItems} />
				</div>

				<ActionPlanSection data={actionPlan} />
			</div>
		</main>
	);
}
