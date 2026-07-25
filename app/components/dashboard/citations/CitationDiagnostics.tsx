"use client";
import {BarChart3, BookOpen, ListOrdered, MessageSquare, Network, TableProperties, type LucideIcon} from "lucide-react";
import DiagnosticCard from "./Diagnostic";

const diagnosticIcons = {
	"Clear Definitions": BookOpen,
	"How-to Content": ListOrdered,
	"Tables & Data": TableProperties,
	FAQs: MessageSquare,
	"Original Statistics": BarChart3,
	"Entity Coverage": Network,
};

const badgeStyles = {
	high: "bg-neutral-900 text-white",
	medium: "bg-neutral-100 text-neutral-900",
	low: "border border-neutral-200 text-neutral-900",
};

type DiagnosticDataItem = {
	title: keyof typeof diagnosticIcons;
	description: string;
	badge: string;
	badgeTone?: "high" | "medium" | "low";
};

export function CitationDiagnostics({data}: {data: DiagnosticDataItem[]}) {
	console.log(data);
	return (
		<section className="flex flex-col gap-4">
			<h3 className="text-xl md:text-2xl font-semibold text-neutral-900">Citation Diagnostics</h3>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{data.map((item) => (
					<DiagnosticCard key={item.title} title={item.title} description={item.description} icon={ListOrdered} badge={item.badge} badgeTone={"default"} />
				))}
			</div>
		</section>
	);
}
