import axios from "axios";
import { WebsiteConf } from "../States/website";

const ApplicationRequest = (): Promise<WebsiteConf> => {
	return new Promise((resolve, reject) => {
		axios.post("/api/application")
			.then((response) => {
				return resolve(response.data);
			})
			.catch(reject);
	});
};

export default ApplicationRequest;
