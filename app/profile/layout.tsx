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
			<DashboardBar />

			{children}
		</div>
	);
}
