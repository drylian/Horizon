import http from "../Http";

export const setFinish = (): Promise<{ complete: boolean }> => {
	return new Promise((resolve, reject) => {
		http.put(`/api/installation/finish`)
			.then((response) => {
				return resolve(response.data);
			})
			.catch(reject);
	});
};