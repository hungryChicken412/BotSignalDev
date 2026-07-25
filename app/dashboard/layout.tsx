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
			<Navbar />
			<DashboardBar />

			<ReportProvider>{children}</ReportProvider>
		</div>
	);
}
