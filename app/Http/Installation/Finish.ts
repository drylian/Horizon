import { HttpAPIController } from "../Classes/HttpAPIController";
import { Events } from "@/Classes/Events";

const InstallationFinishPut = new HttpAPIController({
    dir: __filename,
    path: "/api/installation/finish",
    type: [HttpAPIController.Auths.FullAccess],
    method: HttpAPIController.Methods.Put,
    run: async (app, core) => {
        Events.set.emit("FinishInstallation");
        app.res.json({ complete: true })
    }
})
export default InstallationFinishPut