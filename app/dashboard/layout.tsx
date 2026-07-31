import DashboardBar from "@/app/components/dashboard/DashboardBar";
import Navbar from "@/app/components/profile/Navbar";
import {ReportProvider} from "./reportContext";





export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		  <div className="min-h-full flex flex-col relative z-0">
				<Navbar /> {/* Assuming this is your top fixed nav */}
				{/* Side-by-side flex container for Desktop */}
				<div className="flex flex-col md:flex-row flex-1 w-full">
					<DashboardBar />
	
					{/* Main Content Area - takes up remaining width */}
					<div className="flex-1 min-w-0">
						<ReportProvider>{children}</ReportProvider>
					</div>
				</div>
			</div>
	);
}
