// app/dashboard/ReportContext.tsx
"use client";

import React, {createContext, useContext, useEffect, useState, Suspense} from "react";
import {useSearchParams} from "next/navigation";
import {userService} from "../user.service"; // Adjust path if needed
import {Loader2} from "lucide-react";

// 1. Create the Context
const ReportContext = createContext<any>(null);

// 2. Create the inner component that uses the search parameters
function ReportProviderContent({children}: {children: React.ReactNode}) {
	const searchParams = useSearchParams();
	const auditId = searchParams.get("id");

	const [reportData, setReportData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (auditId) {
			setIsLoading(true);
			userService.getAuditReportById(auditId).then((data) => {
				setReportData(data.results);
				setIsLoading(false);
			});
		} else {
			setReportData(null);
			setIsLoading(false);
		}
	}, [auditId]); // Only re-runs if the ID in the URL actually changes!

	return <ReportContext.Provider value={{reportData, isLoading, auditId}}>{children}</ReportContext.Provider>;
}

// 3. Wrap in Suspense to keep Next.js App Router happy
export function ReportProvider({children}: {children: React.ReactNode}) {
	return (
		<Suspense
			fallback={
				<div className="ml-0 md:ml-64 mt-16 flex h-[80vh] items-center justify-center">
					<Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
				</div>
			}
		>
			<ReportProviderContent>{children}</ReportProviderContent>
		</Suspense>
	);
}

// 4. Create a custom hook so your pages can easily grab the data
export const useReport = () => useContext(ReportContext);
