// components/FirebaseAnalytics.tsx
"use client";

import {useEffect} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {logEvent} from "firebase/analytics";
import {getAnalyticsIfSupported} from "../firebase"; // Update the import

export default function FirebaseAnalytics() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
		const trackPageView = async () => {
			
			// Safely initialize analytics
			const analytics = await getAnalyticsIfSupported();

			if (analytics && pathname) {
				const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

				// Explicitly log the page view for Next.js SPA routing
				logEvent(analytics, "page_view", {
					page_path: pathname,
					page_location: url,
				});
			}
		};

		trackPageView();
	}, [pathname, searchParams]);

	// Return null instead of <>2</> so it stays invisible
	return null;
}
