import { Sequelize } from "sequelize";
import { Loggings } from "loggings";
import { DbConfig } from "@/Configurations";

class SequelizeConnection {
	public sequelize: InstanceType<typeof Sequelize>;
	private core: InstanceType<typeof Loggings>;
	constructor() {
		this.core = new Loggings("Sequelize", "magenta");
		this.sequelize = new Sequelize({
			dialect: "sqlite",
		});
	}
	public async restart() {
		if (DbConfig['dialect'].get !== "sqlite") {
			this.sequelize = new Sequelize({
				dialect: "mysql",
				host: DbConfig['host'].get,
				password: DbConfig['pass'].get,
				port: DbConfig['port'].get,
				username: DbConfig['user'].get,
				database: DbConfig['database'].get,
				logging: (message: string) => {
					this.core.debug(message);
				},
			});
		} else {
			this.sequelize = new Sequelize({
				dialect: DbConfig['dialect'].get,
				host: DbConfig['host'].get,
				logging: (message: string) => {
					this.core.debug(message);
				},
			});
		}
	}
}
export const Connection = new SequelizeConnection();
