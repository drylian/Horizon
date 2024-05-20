import { CoreConfig } from "@/Configurations";
import { HttpAPIController } from "../../Classes/HttpAPIController";
import I18alt from "@/Controllers/Languages";
import { NotHave } from "@/Utils/Checkers";

const installationStartingRouter = new HttpAPIController({
    dir: __filename,
    path: "/api/installation/starting",
    type: [HttpAPIController.Auths.FullAccess],
    method: HttpAPIController.Methods.Put,
    run: async (app, core) => {
        const { title, port, url, owner, lang } = app.req.body
        if (NotHave(title, port, url, owner, lang)) {
            app.res.json({ complete: false, message: "Not Have all Fields", langer: "AllInfoAsNecessary" })
            return;
        }
        CoreConfig['title'].set(title)
        CoreConfig['port'].set(port)
        CoreConfig['url'].set(url)
        CoreConfig['owner'].set(owner)
        CoreConfig['language'].set(lang)

        app.res.json({ complete: true})
    }
})
export default installationStartingRouter