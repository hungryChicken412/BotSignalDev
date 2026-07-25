import {CheckCircle2, Code2, AlertTriangle} from "lucide-react";

export type AuditData = {
	detected_types: string[];
	present_important_schemas: string[];
	missing_important_schemas: string[];
	extra_schemas: string[];
	validation_errors: string[];
	score: number;
	deductions: {
		reason: string;
		points: number;
	}[];
};

export function StructureData({data}: {data: AuditData}) {
	if (!data) return null;

	console.log(data);



	const {detected_types, present_important_schemas, missing_important_schemas, extra_schemas, validation_errors, deductions, score} = data;

	return (
		<section className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm h-fit">
			{/* Header */}
			<div className="p-5 border-b border-neutral-200 flex justify-between items-center bg-indigo-900/5">
				<div className="flex items-center gap-2">
					<Code2 className="w-4 h-4 text-indigo-700" />
					<h2 className="text-base font-semibold text-indigo-950">Schema Data</h2>
				</div>

				<span className="inline-flex items-center px-2 py-0.5 rounded-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10px]">Score {score}/100</span>
			</div>

			<div className="p-5 space-y-6">
				{/* Validation Errors */}
				{validation_errors.length > 0 && (
					<div>
						<h3 className="text-sm font-semibold text-neutral-900 mb-3">Validation Errors</h3>

						<div className="space-y-2">
							{validation_errors.map((error) => (
								<div key={error} className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3">
									<div className="w-2 h-2 rounded-full bg-rose-500" />
									<span className="text-sm text-rose-900">{error}</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Deductions */}
				{deductions.length > 0 && (
					<div>
						<h3 className="text-sm font-semibold text-neutral-900 mb-3">Score Deductions</h3>

						<div className="space-y-2">
							{deductions.map((deduction, idx) => (
								<div key={idx} className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-3">
									<div className="flex items-center gap-3">
										<AlertTriangle className="w-4 h-4 text-amber-600" />
										<span className="text-sm text-amber-900">{deduction.reason}</span>
									</div>

									<span className="font-semibold text-amber-700">{deduction.points}</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Detected Types */}
				<div>
					<h3 className="text-sm font-semibold text-neutral-900 mb-3">Detected Schema Types</h3>

					{detected_types.length ? (
						<div className="space-y-2">
							{detected_types.map((type) => (
								<div key={type} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 hover:bg-neutral-50 transition-colors">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-emerald-500" />
										<span className="text-sm font-medium text-neutral-900">{type}</span>
									</div>

									<CheckCircle2 className="w-4 h-4 text-emerald-600" />
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-neutral-500">No schema types detected.</p>
					)}
				</div>

				{/* Present Schemas */}
				<div>
					<h3 className="text-sm font-semibold text-neutral-900 mb-3">Important Schemas Found</h3>

					{present_important_schemas.length ? (
						<div className="flex flex-wrap gap-2">
							{present_important_schemas.map((schema) => (
								<span key={schema} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
									{schema}
								</span>
							))}
						</div>
					) : (
						<p className="text-sm text-neutral-500">No important schemas found.</p>
					)}
				</div>

				{/* Missing Schemas */}
				<div>
					<h3 className="text-sm font-semibold text-neutral-900 mb-3">Missing Important Schemas</h3>

					{missing_important_schemas.length ? (
						<div className="flex flex-wrap gap-2">
							{missing_important_schemas.map((schema) => (
								<span key={schema} className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800">
									{schema}
								</span>
							))}
						</div>
					) : (
						<p className="text-sm text-emerald-600">All important schemas are present.</p>
					)}
				</div>

				{/* Empty State */}
				{validation_errors.length === 0 && deductions.length === 0 && detected_types.length === 0 && present_important_schemas.length === 0 && missing_important_schemas.length === 0 && extra_schemas.length === 0 && <p className="py-6 text-center text-sm text-neutral-500">No structured data detected.</p>}
			</div>
		</section>
	);
}
