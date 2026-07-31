import DashboardBar from "@/app/components/profile/DashboardBar";
import Navbar from "@/app/components/profile/Navbar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-full flex flex-col relative z-0">
			<Navbar />
			<div className="flex flex-col md:flex-row flex-1 w-full">
				<DashboardBar />

				{/* Main Content Area - takes up remaining width */}
				<div className="flex-1 min-w-0">{children}</div>
			</div>
		</div>
	);
}
