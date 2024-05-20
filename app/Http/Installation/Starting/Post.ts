import { CoreConfig } from "@/Configurations";
import { HttpAPIController } from "../../Classes/HttpAPIController";

const installationStartingRouter = new HttpAPIController({
    dir: __filename,
    path: "/api/installation/starting",
    type: [HttpAPIController.Auths.FullAccess],
    method: HttpAPIController.Methods.Post,
    run: async (app, core) => {
        const configs = {
            title:CoreConfig['title'].get,
            url:CoreConfig['url'].get,
            port:CoreConfig['port'].get,
            owner:CoreConfig['owner'].get,
            lang:CoreConfig['language'].get
        }
        app.res.json(configs)
    }
})
export default installationStartingRouter