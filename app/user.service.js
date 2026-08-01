import {BehaviorSubject} from "rxjs";

import Router from "next/router";

import {fetchWrapper} from "./fetch-wrapper";

import {useState} from "react";
import {useEffect} from "react";
import authheader from "./fetch-wrapper.js";


const baseHomeUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const baseUrl = baseHomeUrl + "/api";
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem("user")));

export const userService = {
	user: userSubject.asObservable(),
	get userValue() {
		return userSubject.value;
	},
	login,
	logout,
	register,
	getMyProfile,
	updateProfile,
	getApps,
	registerApp,
	getDashboardData,
	getBillingData,
	socialLogin,
	validateToken,
	delete: _delete,

	uploadFile,
	requestAudit,
	getAuditReportById,
	getAuditReports,
	deleteAuditReport,
};

// Add this inside user.service.js (and make sure to export it at the top!)

// Add this inside user.service.js

async function getAuditReportById(id) {
	const token = localStorage.getItem("token");
	//if (!token) throw new Error("No auth token found");

	const requestOptions = {
		method: "GET",
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
	};

	try {
		// Fetch the specific report by ID
		const response = await fetch(`${baseUrl}/audits/reports/${id}/`, requestOptions);

		if (!response.ok) {
			if (response.status === 404) return null; // Report not found
			throw new Error("Failed to fetch report");
		}

		const data = await response.json();
		return data; // Returns the single report object directly
	} catch (error) {
		console.error(`Error fetching audit report ${id}:`, error);
		return null;
	}
}

async function getAuditReports(url) {
	const token = localStorage.getItem("token");
	// if (!token) throw new Error("No auth token found");

	const requestOptions = {
		method: "GET",
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
	};

	try {
		// Assuming the list endpoint is the base of the detail endpoint
		const endpoint = url || `${baseUrl}/audits/reports/list/`;

		const response = await fetch(endpoint, requestOptions);

		if (!response.ok) {
			return response;
		}

		const data = await response.json();
		return data; // Returns the list of audit reports
	} catch (error) {
		console.error("Error fetching audits list:", error);
		return null;
	}
}

function login(username, password) {
	return fetchWrapper.post(baseHomeUrl + `/auth/`, {username, password}).then((user) => {
		// publish user to subscribers and store in local storage to stay logged in between page refreshes
		//userSubject.next(user);
		localStorage.setItem("token", user.token);
		return user;
	});
}

// Add this to your user.service.js exports
// deleteAuditReport,

async function deleteAuditReport(id) {
	const token = localStorage.getItem("token");
	const requestOptions = {
		method: "DELETE",
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(`${baseUrl}/audits/reports/delete/${id}/`, requestOptions);

		// A successful DELETE usually returns a 204 No Content status
		if (!response.ok) {
			throw new Error("Failed to delete report");
		}

		return true;
	} catch (error) {
		console.error(`Error deleting audit report ${id}:`, error);
		throw error;
	}
}

function requestAudit(url, email) {
	// Change this endpoint to match your actual backend URL for triggering audits
	return fetchWrapper.post(`${baseUrl}/audits/reports/start/`, {url, email});
}

function logout() {
	// remove user from local storage, publish null to user subscribers and redirect to login page
	localStorage.removeItem("token");
	//userSubject.next(null);
	Router.push("/");
}

function register(user) {
	return fetchWrapper.post(`${baseUrl}/register/`, user);
}
function registerApp(app) {
	var url = `${baseUrl}/register/app/`;

	//return fetch(url, requestOptions);
	return fetchWrapper.post(`${baseUrl}/register/app/`, app);
}

function socialLogin(cookie, router) {
	localStorage.setItem("token", cookie);
	Router.push("/");
}

// app/user.service.js

async function validateToken(token) {
	const requestOptions = {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		// Make sure Django expects the body in this format!
		body: JSON.stringify({token: token}),
	};

	try {
		const response = await fetch(baseUrl + "/validateToken/", requestOptions);
		const data = await response.json();

		// Return true if Django says it's valid, false otherwise
		if (data.status === "success") {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error validating token:", error);
		return false;
	}
}

function getMyProfile(cookie) {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const requestOptions = {
		method: "GET",
		headers: {Authorization: `Token ${cookie}`},
	};

	useEffect(() => {
		setLoading(true);
		fetch(baseUrl + "/account/", requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	return data;
}

function getApps(cookie) {
	const [dataa, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const requestOptions = {
		method: "GET",
		headers: {Authorization: `Token ${cookie}`},
	};

	useEffect(() => {
		fetch(baseUrl + "/tts/", requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, []);

	return dataa;
}

function updateProfile(data) {
	return fetchWrapper.post(`${baseUrl}/updateProfile/`, data);
}
function getDashboardData(cookie) {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const requestOptions = {
		method: "GET",
		headers: {Authorization: `Token ${cookie}`},
	};

	useEffect(() => {
		setLoading(true);
		fetch(baseUrl + "/dashboard/", requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	return data;
}

function getBillingData(cookie) {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const requestOptions = {
		method: "GET",
		headers: {Authorization: `Token ${cookie}`},
	};

	useEffect(() => {
		setLoading(true);
		fetch(baseUrl + "/billing/", requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	return data;
}

function uploadFile(data) {
	const [dataa, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const requestOptions = {
		method: "POST",
		headers: {Authorization: `Token ${cookie}`},
		body: data.file,
	};

	useEffect(() => {
		fetch(baseUrl + "/api-info/regster/tts/", requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, []);

	return dataa;
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
	return fetchWrapper.delete(`${baseUrl}/${id}`);
}
