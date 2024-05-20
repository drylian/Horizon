import http from "../Http";

export interface StartingFormData {
	title: string;
	owner: string;
	lang: string;
	port: number;
	url: string;
}

export const setConfig = (options: StartingFormData): Promise<{ complete: boolean }> => {
	return new Promise((resolve, reject) => {
		http.put(`/api/installation/starting`, options)
			.then((response) => {
				return resolve(response.data);
			})
			.catch(reject);
	});
};
export const getConfig = ():Promise<Required<StartingFormData>> => {
	return new Promise((resolve, reject) => {
		http.post(`/api/installation/starting`)
			.then((response) => {
				return resolve(response.data);
			})
			.catch(reject);
	});
};