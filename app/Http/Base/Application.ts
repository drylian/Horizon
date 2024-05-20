import { CoreConfig } from "@/Configurations";
import { HttpAPIController } from "../Classes/HttpAPIController";
import I18alt from "@/Controllers/Languages";

const Router = new HttpAPIController({
    dir: __filename,
    path: "/api/application",
    type: [HttpAPIController.Auths.FullAccess],
    method: HttpAPIController.Methods.Post,
    run: async (app, core) => {
        const Application = {
            title: CoreConfig['title'].get,
            mode: CoreConfig['mode'].get.startsWith("pro"),
            port: CoreConfig['port'].get,
            domain: CoreConfig['domain'].get,
            lang: CoreConfig['language'].get,
            installed: CoreConfig['installed'].get,
            langs: new I18alt().meta(),
        }
        app.res.json(Application)
    }
})
export default Router