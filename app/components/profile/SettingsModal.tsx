"use client";

import React, {useState} from "react";
import {X, User, CreditCard, Bell, Shield, Check} from "lucide-react";
import ShowCustomToast from "@/app/components/CustomToast";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SettingsModal({isOpen, onClose}: SettingsModalProps) {
	const [activeTab, setActiveTab] = useState("profile");
	const [isSaving, setIsSaving] = useState(false);

	// Prevent rendering if modal is closed
	if (!isOpen) return null;

	const handleSave = () => {
		setIsSaving(true);
		// Simulate API call
		setTimeout(() => {
			setIsSaving(false);
			ShowCustomToast({
				label: "Success",
				info: "Settings saved successfully.",
			});
		}, 800);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
			{/* Modal Container */}
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
				{/* Header */}
				<div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10 shrink-0">
					<h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
					<button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Body - Changed to flex-col on mobile, flex-row on desktop */}
				<div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-white">
					{/* Sidebar Navigation - Horizontally scrollable on mobile */}
					<div className="md:w-56 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/30 p-3 md:p-4 gap-2 md:gap-0 md:space-y-1 shrink-0 scrollbar-hide">
						<TabButton icon={<User className="w-4 h-4" />} label="Profile" isActive={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
						<TabButton icon={<CreditCard className="w-4 h-4" />} label="Billing" isActive={activeTab === "billing"} onClick={() => setActiveTab("billing")} />
						<TabButton icon={<Bell className="w-4 h-4" />} label="Notifications" isActive={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
						<TabButton icon={<Shield className="w-4 h-4" />} label="Security" isActive={activeTab === "security"} onClick={() => setActiveTab("security")} />
					</div>

					{/* Content Area */}
					<div className="flex-1 p-5 md:p-8 overflow-y-auto">
						{/* Profile Tab */}
						{activeTab === "profile" && (
							<div className="max-w-md space-y-6 animate-in fade-in duration-300">
								<div>
									<h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
									<p className="text-sm text-gray-500 mt-1">Update your basic profile details.</p>
								</div>

								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
										<input type="email" disabled defaultValue="user@example.com" className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm focus:outline-none cursor-not-allowed" />
										<p className="text-[11px] text-gray-400 mt-1">Contact support to change your email.</p>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
										<input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
									</div>
								</div>
							</div>
						)}

						{/* Billing Tab */}
						{activeTab === "billing" && (
							<div className="max-w-md space-y-6 animate-in fade-in duration-300">
								<div>
									<h3 className="text-lg font-bold text-gray-900">Credits & Plan</h3>
									<p className="text-sm text-gray-500 mt-1">Manage your scan credits and subscription.</p>
								</div>

								<div className="p-5 border border-purple-100 bg-purple-50 rounded-2xl">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-semibold text-purple-900">Available Credits</p>
											<p className="text-3xl font-bold text-purple-700 mt-1">Unlimited</p>
										</div>
										<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
											<CreditCard className="w-6 h-6 text-purple-500" />
										</div>
									</div>
									<button className="ml-1.5 px-6 py-2 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">Preview</button>
								</div>
							</div>
						)}

						{/* Notifications Tab */}
						{activeTab === "notifications" && (
							<div className="max-w-md space-y-6 animate-in fade-in duration-300">
								<div>
									<h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
									<p className="text-sm text-gray-500 mt-1">Control when and how we contact you.</p>
								</div>

								<div className="space-y-4">
									<ToggleRow title="Scan Completions" description="Get notified when an AI audit finishes processing." defaultChecked />
									<ToggleRow title="Weekly Reports" description="Receive a summary of your website's performance." />
									<ToggleRow title="Marketing Updates" description="Hear about new features and promotions." />
								</div>
							</div>
						)}

						{/* Security Tab */}
						{activeTab === "security" && (
							<div className="max-w-md space-y-6 animate-in fade-in duration-300">
								<div>
									<h3 className="text-lg font-bold text-gray-900">Security</h3>
									<p className="text-sm text-gray-500 mt-1">Manage your password and security settings.</p>
								</div>
								<button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Change Password</button>
							</div>
						)}
					</div>
				</div>

				{/* Footer - Allowed buttons to stretch on very small screens */}
				<div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">
					<button onClick={onClose} className="px-5 py-2 w-full sm:w-auto text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-center">
						Cancel
					</button>
					<button onClick={handleSave} disabled={isSaving} className="px-5 py-2 w-full sm:w-auto text-sm font-medium bg-gray-900 hover:bg-black text-white rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
						{isSaving ? "Saving..." : "Save Changes"}
						{!isSaving && <Check className="w-4 h-4" />}
					</button>
				</div>
			</div>
		</div>
	);
}

// Helper component for Tabs
function TabButton({icon, label, isActive, onClick}: {icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void}) {
	return (
		<button
			onClick={onClick}
			// Added shrink-0 and whitespace-nowrap so tabs don't compress on mobile
			className={`shrink-0 whitespace-nowrap md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-white shadow-sm border border-gray-200 text-gray-900" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent"}`}
		>
			<span className={isActive ? "text-purple-600" : "text-gray-400"}>{icon}</span>
			{label}
		</button>
	);
}

// Helper component for Settings Toggles
function ToggleRow({title, description, defaultChecked = false}: {title: string; description: string; defaultChecked?: boolean}) {
	const [isChecked, setIsChecked] = useState(defaultChecked);

	return (
		<div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm gap-4">
			<div>
				<p className="text-sm font-semibold text-gray-900">{title}</p>
				<p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{description}</p>
			</div>
			<button onClick={() => setIsChecked(!isChecked)} className={`shrink-0 w-11 h-6 rounded-full transition-colors relative ${isChecked ? "bg-purple-600" : "bg-gray-200"}`}>
				<div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${isChecked ? "left-6" : "left-1"}`} />
			</button>
		</div>
	);
}
