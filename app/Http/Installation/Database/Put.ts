import { DbConfig } from "@/Configurations";
import { HttpAPIController } from "../../Classes/HttpAPIController";
import { IsEqual, NotHave } from "@/Utils/Checkers";
import { Sequelize } from "sequelize";

const installationDatabaseRouterPut = new HttpAPIController({
    dir: __filename,
    path: "/api/installation/database",
    type: [HttpAPIController.Auths.FullAccess],
    method: HttpAPIController.Methods.Put,
    run: async (app, core) => {
        const { dialect, port, host, user, pass, database } = app.req.body
        if (IsEqual(dialect, ['sqlite', 'mysql'])) {
            app.res.json({ complete: false, message: "Dialect Is Invalid", langer: "DialectIsInvalid" })
            return;
        }

        if (dialect === "mysql" && NotHave(port, host, user, pass, database)) {
            app.res.json({ complete: false, message: "Not Have all Fields", langer: "AllInfoAsNecessary" })
            return;
        }
        if(dialect  === "mysql") {
            try {
				const connection = new Sequelize({
					dialect: "mysql",
					host,
					password: pass,
					port,
					username: user,
					database,
				});
				await connection.authenticate();
			} catch (e) {
                console.log(e)
                app.res.status(400).json({ complete: false, message: e.message, langer: e.message })
                return;
			}
        }

        DbConfig['dialect'].set(dialect)
        if (DbConfig['dialect'].get === "mysql") {
            DbConfig['port'].set(port)
            DbConfig['host'].set(host)
            DbConfig['user'].set(user)
            DbConfig['pass'].set(pass)
            DbConfig['database'].set(database)
        }
        app.res.json({ complete: true })
    }
})
export default installationDatabaseRouterPut