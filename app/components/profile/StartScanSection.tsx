"use client";

import React, {useState} from "react";
import {ArrowRight, Plus, X, Layers, ChevronDown, Loader2} from "lucide-react";
import {userService} from "@/app/user.service";
import ShowCustomToast from "@/app/components/CustomToast";

export default function StartScanSection() {
	const [urls, setUrls] = useState([""]);
	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

	// Submission state
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getProtocol = (url: string) => (url.startsWith("http://") ? "http://" : "https://");
	const getDomain = (url: string) => url.replace(/^(https?:\/\/)/, "");

	const addUrl = () => {
		const lastUrl = urls[urls.length - 1];
		let nextBaseUrl = "";

		if (lastUrl && getDomain(lastUrl).trim() !== "") {
			try {
				const urlToParse = lastUrl.startsWith("http") ? lastUrl : `https://${lastUrl}`;
				const parsedUrl = new URL(urlToParse);
				nextBaseUrl = parsedUrl.origin;
			} catch (error) {
				nextBaseUrl = getProtocol(lastUrl);
			}
		} else if (lastUrl) {
			nextBaseUrl = getProtocol(lastUrl);
		}

		setUrls([...urls, nextBaseUrl]);
	};

	const removeUrl = (indexToRemove: number) => {
		setUrls(urls.filter((_, index) => index !== indexToRemove));
		if (openDropdownIndex === indexToRemove) setOpenDropdownIndex(null);
	};

	const updateUrl = (index: number, value: string) => {
		const newUrls = [...urls];
		newUrls[index] = value;
		setUrls(newUrls);
	};

	const handleProtocolChange = (index: number, newProtocol: string) => {
		const currentDomain = getDomain(urls[index]);
		updateUrl(index, newProtocol + currentDomain);
		setOpenDropdownIndex(null);
	};

	const handleDomainChange = (index: number, newDomain: string) => {
		let protocol = getProtocol(urls[index]);
		let domain = newDomain;

		if (newDomain.startsWith("http://")) {
			protocol = "http://";
			domain = newDomain.replace("http://", "");
		} else if (newDomain.startsWith("https://")) {
			protocol = "https://";
			domain = newDomain.replace("https://", "");
		}

		updateUrl(index, protocol + domain);
	};

	// Implemented submission handler
	const handleAuditSubmit = async () => {
		// Filter out completely empty rows
		const validUrls = urls.filter((u) => getDomain(u).trim() !== "");

		if (validUrls.length === 0) {
			ShowCustomToast({
				label: "URL Required",
				info: "Please enter at least one valid website URL to scan.",
				type: "error",
			});
			return;
		}

		setIsSubmitting(true);

		ShowCustomToast({
			label: "Processing!",
			info: `Initiating multi-page audit for ${validUrls.length} URL(s)...`,
			type: "info",
		});

		try {
			// Sending the array of valid URLs via the existing requestAudit service
			// Passing an empty string for the email since the user is already authenticated in the dashboard
			await userService.requestAudit(validUrls, "");

			ShowCustomToast({
				label: "Scan Started!",
				info: "Your audit has been queued successfully. Check your recent scans.",
				type: "success",
			});

			// Optionally clear the inputs upon success
			// setUrls([""]);
		} catch (error: any) {
			console.error("Failed to submit audit:", error);
			const errorMessage = typeof error === "string" ? error : "An unexpected error occurred.";
			ShowCustomToast({
				label: "Action Failed",
				info: errorMessage,
				type: "error",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="relative z-10">
			<div className="bg-white p-3 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-200 flex flex-col gap-3 transition-all">
				{/* Header for multi-page */}
				<div className="px-3 pt-2 pb-2 flex items-center justify-between border-b border-gray-100">
					<span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
						<Layers className="w-4 h-4 text-indigo-500" />
						Multiple URLs
					</span>
					<span className="text-xs font-medium bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{urls.length} added</span>
				</div>

				{/* Scrollable list of inputs */}
				<div className="flex flex-col gap-2 max-h-[320px] p-1 pr-3 ">
					{urls.map((url, index) => (
						<div key={index} className="flex items-center gap-2 relative">
							{/* Combined Input Field */}
							<div className="flex-1 relative flex items-center bg-gray-50/80 border border-gray-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all group">
								{/* Protocol Dropdown */}
								<div className="relative h-full flex items-center">
									<button type="button" onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)} className="h-full flex items-center gap-1.5 py-2.5 pl-3.5 pr-2.5 bg-transparent hover:bg-gray-100/70 border-r border-gray-200 text-sm font-semibold text-gray-600 transition-colors focus:outline-none rounded-l-xl">
										{getProtocol(url)}
										<ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${openDropdownIndex === index ? "rotate-180" : ""}`} />
									</button>

									{/* Dropdown Menu & Invisible Backdrop */}
									{openDropdownIndex === index && (
										<div className="absolute z-50">
											<div className="fixed inset-0 z-40" onClick={() => setOpenDropdownIndex(null)} />
											<div className="absolute top-[calc(100%+12px)] left-0 w-24 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
												<button type="button" onClick={() => handleProtocolChange(index, "https://")} className={`w-full text-left px-3.5 py-2 text-sm font-medium transition-colors ${getProtocol(url) === "https://" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}>
													https://
												</button>
												<button type="button" onClick={() => handleProtocolChange(index, "http://")} className={`w-full text-left px-3.5 py-2 text-sm font-medium transition-colors ${getProtocol(url) === "http://" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}>
													http://
												</button>
											</div>
										</div>
									)}
								</div>

								{/* Domain Text Input */}
								<input type="text" value={getDomain(url)} onChange={(e) => handleDomainChange(index, e.target.value)} disabled={isSubmitting} placeholder={`yourwebsite.com/page-${index + 1}`} className="flex-1 min-w-0 pl-3 pr-4 py-2.5 text-sm w-full text-gray-700 bg-transparent border-none focus:ring-0 outline-none placeholder-gray-400 disabled:opacity-50" />

								{urls.length > 1 && (
									<button onClick={() => removeUrl(index)} disabled={isSubmitting} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0 disabled:opacity-50" title="Remove URL">
										<X className="w-4 h-4" />
									</button>
								)}
							</div>

							{/* Delete button */}
						</div>
					))}
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-3 pt-2">
					<button onClick={addUrl} disabled={isSubmitting} className="flex-1 py-3 border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 text-indigo-600 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
						<Plus className="w-4 h-4" /> Add Another URL
					</button>

					<button onClick={handleAuditSubmit} disabled={isSubmitting} className="cursor-pointer flex-[2] bg-[#c678bb] hover:bg-[#b569aa] text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
						{isSubmitting ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" /> Scanning...
							</>
						) : (
							<>
								Audit {urls.length} Page{urls.length !== 1 ? "s" : ""} <ArrowRight className="w-4 h-4" />
							</>
						)}
					</button>
				</div>

				{/* Info Text */}
				<div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 pb-2">
					<span className="font-bold tracking-widest text-[11px] uppercase text-gray-900">Enter multiple URLs to run a batch analysis.</span>
				</div>
			</div>
		</div>
	);
}
