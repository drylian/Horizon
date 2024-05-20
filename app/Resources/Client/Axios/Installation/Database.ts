import http from "../Http";

export interface DatabaseFormData {
	dialect: string;
	host: string;
	user: string;
	port: number;
	pass: string;
	database:string;
}

export const setDatabase = (options: DatabaseFormData): Promise<{ complete: boolean }> => {
	return new Promise((resolve, reject) => {
		http.put(`/api/installation/database`, options)
			.then((response) => {
				return resolve(response.data);
			})
			.catch(reject);
	});
};
export const getDatabase = ():Promise<Required<DatabaseFormData>> => {
	return new Promise((resolve, reject) => {
		http.post(`/api/installation/database`)
			.then((response) => {
				return resolve(response.data);
			})
			.catch(reject);
	});
};