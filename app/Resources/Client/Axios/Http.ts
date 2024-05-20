import axios, { AxiosInstance } from "axios";

/* eslint-disable  @typescript-eslint/no-explicit-any */

const http: AxiosInstance = axios.create({
	withCredentials: true,
	timeout: 20000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default http;
