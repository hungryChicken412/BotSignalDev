import {CheckCircle2, X, AlertCircle, Info, AlertTriangle} from "lucide-react";
import {toast} from "react-toastify";

// Define the allowed toast types
export type ToastType = "success" | "error" | "info" | "warning";

// Configuration for colors and icons based on the toast type
const toastVariants = {
	success: {
		icon: CheckCircle2,
		theme: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
	},
	error: {
		icon: AlertCircle,
		theme: "bg-rose-500/10 text-rose-600 border-rose-500/30",
	},
	info: {
		icon: Info,
		theme: "bg-sky-500/10 text-sky-600 border-sky-500/30",
	},
	warning: {
		icon: AlertTriangle,
		theme: "bg-amber-500/10 text-amber-600 border-amber-500/30",
	},
};

export const CustomToast = ({closeToast, title, message, type}: {title: string; message: string; type: ToastType; closeToast: () => void}) => {
	// Fallback to 'info' if an invalid type is somehow passed
	const activeVariant = toastVariants[type] || toastVariants.info;
	const IconComponent = activeVariant.icon;

	return (
		<div className="flex flex-col gap-3 w-full max-w-sm bg-white backdrop-blur-xl border border-white/80 p-5 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
			<div className="flex items-start gap-4">
				{/* Dynamic Themed Icon Container */}
				<div className={`rounded-2xl h-11 w-11 flex items-center justify-center shrink-0 border shadow-sm ${activeVariant.theme}`}>
					<IconComponent className="w-5 h-5" strokeWidth={2.5} />
				</div>

				{/* Themed Typography */}
				<div className="flex-1 pt-1">
					<h4 className="font-headline-md font-semibold text-on-surface text-[15px] tracking-tight mb-1">{title}</h4>
					<p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{message}</p>
				</div>

				{/* Dismiss X icon at top right */}
				<button onClick={closeToast} className="text-on-surface-variant/60 hover:text-on-surface transition-colors p-1.5 rounded-full hover:bg-black/5 active:scale-95">
					<X className="w-4 h-4" />
				</button>
			</div>

			{/* Themed Buttons */}
			<div className="flex gap-2 mt-1 justify-end">
				<button className="px-5 py-2 bg-transparent hover:bg-black/5 cursor-pointer text-on-surface-variant hover:text-primary rounded-xl text-sm font-medium transition-all active:scale-95" onClick={closeToast}>
					Dismiss
				</button>
			</div>
		</div>
	);
};

export default function ShowCustomToast({
	label,
	info,
	type = "success", // Defaults to success if not provided
}: {
	label: string;
	info: string;
	type?: ToastType;
}) {
	toast(
		// 1. Pass the type down to the CustomToast component
		({closeToast}) => <CustomToast title={label} message={info} type={type} closeToast={closeToast} />,
		{
			position: "top-right",
			autoClose: 5000,
			style: {background: "transparent", boxShadow: "none", padding: 0},
			closeButton: false,
			hideProgressBar: true,
		},
	);
}
