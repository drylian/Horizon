import chokidar from "chokidar";
import fs from "fs";
import dotenv from "dotenv";
import { Global } from "@/Configurations";
import { Configuration } from "@/Classes/Configuration";
import { Loggings } from "loggings";
const core = new Loggings("Env", "blue", { register: false })
/**
 * Structural Env updates
 */
export async function StructuralEnvWatcher() {
	const configWatcher = chokidar.watch("./.env");

	configWatcher.on("change", () => {
		const envFileContent = fs.readFileSync(".env", "utf8");
		const envConfig = dotenv.parse(envFileContent);
		for (const key in Global) {
			const config: InstanceType<typeof Configuration<string>> = Global[key]
			if (envConfig[config.options.env] !== undefined && String(config.get) !== envConfig[config.options.env]) {
				config.set(envConfig[config.options.env])
				core.log(`[${config.options.env}].green-b Atualizado`)
			}
		}
	});
}
