import { DbConfig } from "@/Configurations";
import { HttpAPIController } from "../../Classes/HttpAPIController";

const installationDatabaseRouterPost = new HttpAPIController({
    dir: __filename,
    path: "/api/installation/database",
    type: [HttpAPIController.Auths.FullAccess],
    method: HttpAPIController.Methods.Post,
    run: async (app, core) => {
        const configs: Record<string, string> = {}
        for (const key in DbConfig) {
            const config = DbConfig[key]
            configs[key] = config.get
        }
        app.res.json(configs)
    }
})
export default installationDatabaseRouterPost