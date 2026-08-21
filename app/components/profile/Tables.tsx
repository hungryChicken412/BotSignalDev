"use client";

import React, {useState, useEffect} from "react";
import {Loader2, Download, Eye, Filter, Globe, Minus, MoreHorizontal, Trash2, Shield, ExternalLink} from "lucide-react";
import {ShieldCheck, ShieldAlert, ShieldX} from "lucide-react"; // ... inside your render

import {useRouter} from "next/navigation";



import {userService} from "@/app/user.service";
import ShowCustomToast from "@/app/components/CustomToast";
import {baseUrl} from "@/app/user.service";
import Link from "next/link";




// Define our expected data shapes
export interface Report {
	date?: string | Date;
	id: string | number;
	url: string;
	created_at: string | Date;
	status: string;
	score: number;
}

export interface PaginatedResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Report[];
	statusText?: string;
}

export default function Tables() {
	const [reports, setReports] = useState<Report[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();




	// Pagination states
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [prevPage, setPrevPage] = useState<string | null>(null);
	const [totalCount, setTotalCount] = useState<number>(0);

	const fetchReports = async (url?: string | null) => {
		try {
			setIsLoading(true);
			const data: Report[] | PaginatedResponse = await userService.getAuditReports(url);

			if (!data) {
				throw new Error("No data received from the server.");
			}

			if (Array.isArray(data)) {
				setReports(data);
				setTotalCount(data.length);
				setNextPage(null);
				setPrevPage(null);
			} else if (data.results && Array.isArray(data.results)) {
				setReports(data.results);
				setTotalCount(data.count);
				setNextPage(data.next);
				setPrevPage(data.previous);
			} else {
				// throw new Error((data as any).statusText || "Invalid data format received.");
				console.log("Log in First");
			}
		} catch (error) {
			console.error("Failed to fetch reports", error);
			const errorMessage = typeof error === "string" ? error : (error as Error).message || "Please login First!";

			ShowCustomToast({
				label: `Action Failed `,
				info: errorMessage,
				type: "error",
			});
			localStorage.removeItem("token");

			router.push("/")


		} finally {
			setIsLoading(false);
		}
	};

	// The new delete handler
	const handleDelete = async (id: string | number) => {
		const confirmDelete = window.confirm("Are you sure you want to delete this scan? This action cannot be undone.");
		if (!confirmDelete) return;

		try {
			// Send request to backend
			await userService.deleteAuditReport(id);

			// Optimistically update the UI by filtering out the deleted report
			setReports((prev) => prev.filter((report) => report.id !== id));
			setTotalCount((prev) => prev - 1);

			ShowCustomToast({
				label: "Success",
				info: "Scan deleted successfully.",
				// type: "success" // Uncomment if your toast component supports types
			});

			fetchReports();
		} catch (error) {
			ShowCustomToast({
				label: "Action Failed",
				info: "Failed to delete the scan. Please try again.",
				type: "error",
			});

		}
	};

	useEffect(() => {
		fetchReports();
	}, []);

	const getDomain = (url: string) => {
		if (!url) return "Unknown Website";
		return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
	};

	const formatDate = (dateString: string | Date) => {
		if (!dateString) return "N/A";
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
			<div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
				<h3 className="text-lg font-bold text-gray-900">Recent Scans</h3>
				<button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
					<Filter className="w-4 h-4" />
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm whitespace-nowrap">
					<thead className="text-[11px] uppercase text-gray-400 font-semibold border-b border-gray-100 bg-white">
						<tr>
							<th className="px-6 py-4 tracking-wider">Website</th>
							<th className="px-6 py-4 tracking-wider">Date</th>
							<th className="px-6 py-4 tracking-wider">AI Readiness</th>
							<th className="px-6 py-4 tracking-wider">Status</th>
							<th className="px-6 py-4 tracking-wider text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-50 bg-white">
						{isLoading ? (
							<tr>
								<td colSpan={5} className="px-6 py-12 text-center text-gray-500">
									<Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
									<p>Loading scans...</p>
								</td>
							</tr>
						) : reports.length === 0 ? (
							<tr>
								<td colSpan={5} className="px-6 py-12 text-center text-gray-500">
									<p>No scans found.</p>
								</td>
							</tr>
						) : (
							reports.map((report: Report) => {
								const isProcessing = report.status?.toLowerCase() === "processing" || report.status?.toLowerCase() === "pending";

								return (
									<tr key={report.id} className="hover:bg-gray-50/50 transition-colors group">
										<td className="px-6 py-4">
											<div className="flex items-center gap-4">
												<div className="w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">{isProcessing ? <Loader2 className="w-5 h-5 text-gray-400 animate-spin" /> : <Globe className="w-5 h-5 text-gray-400" />}</div>
												<div>

													<Link href={`/dashboard?id=${report.id}`}><p className="font-bold text-blue-900 cursor-pointer text-base">{getDomain(report.url)} <ExternalLink/> </p></Link>
													<p className="text-xs text-gray-400 mt-0.5">{report.url}</p>
												</div>
											</div>
										</td>

										<td className="px-6 py-4 text-gray-500">{formatDate(report.created_at || report.date || "")}</td>

										<td className="px-6 py-4">
											{isProcessing ? (
												<span className="text-gray-400 italic text-sm">Analyzing semantics...</span>
											) : (
												<div className="flex items-center gap-2 text-gray-900">
													<span className="text-xl font-bold text-gray-900">{report.score || 0}</span>
													<span className="text-xs font-semibold text-amber-500 flex items-center">{report.score >= 90 ? <ShieldCheck className="w-4 h-4 text-emerald-500" /> : report.score >= 80 ? <ShieldAlert className="w-4 h-4 text-amber-500" /> : <ShieldX className="w-4 h-4 text-rose-500" />}</span>
												</div>
											)}
										</td>

										<td className="px-6 py-4">
											<span className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${isProcessing ? "bg-purple-50 text-purple-600" : "bg-emerald-200 text-emerald-800"}`}>{report.status || "Complete"}</span>
										</td>

										<td className="px-6 py-4 text-right">
											{isProcessing ? (
												<div className="flex items-center justify-end">
													<Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
												</div>
											) : (
												<div className="flex items-center justify-end gap-4 text-gray-400  transition-opacity">
													
													{/* <a href={`${baseUrl}/audits/reports/${report.id}/download-pdf`}>
														<Download className="w-4 h-4 cursor-pointer hover:text-gray-900 transition-colors" />{" "}
													</a> */}
													<Link href={`/dashboard?id=${report.id}`}>
														<Eye className="w-4 h-4 cursor-pointer hover:text-gray-900 transition-colors" />{" "}
													</Link>
													{/* Added onClick handler to Trash2 */}
													<Trash2 onClick={() => handleDelete(report.id)} className="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors" />
												</div>
											)}
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{!isLoading && totalCount > 0 && (
				<div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-white">
					<p>
						Showing {reports.length} of {totalCount} scans
					</p>
					<div className="flex gap-2">
						<button onClick={() => prevPage && fetchReports(prevPage)} disabled={!prevPage} className={`w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg transition-colors ${!prevPage ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-gray-100 cursor-pointer text-gray-900"}`}>
							&lt;
						</button>
						<button onClick={() => nextPage && fetchReports(nextPage)} disabled={!nextPage} className={`w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg transition-colors ${!nextPage ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-gray-100 cursor-pointer text-gray-900"}`}>
							&gt;
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
