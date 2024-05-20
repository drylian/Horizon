import { Loggings, LoggingsColor, Uptimer } from "loggings";
import { ResourcesPATH } from "@/Structural";
import * as esbuild from "esbuild";
import path from "path";
export class EsbuildLogger {
	private core: InstanceType<typeof Loggings>;

	constructor(title: string, color: LoggingsColor) {
		this.core = new Loggings(title, color, {
			format: `[Esbuild].green-b {status} [{hours}:{minutes}:{seconds}].gray {message}`,
		});
	}
	init(): esbuild.Plugin {
		const core = this.core;
		return {
			name: "reacter-logger",
			setup(build) {
				let startTime = Date.now() / 1000;
				build.onStart(() => {
					startTime = Date.now() / 1000
					core.log(
						`Compilando:[${path.basename(build.initialOptions.outdir ? build.initialOptions.outdir : "idk")}].magenta-b`,
					);
				});
				build.onLoad({ filter: /\.?$/ }, async (args) => {
					const locale = path.relative(path.join(process.cwd(), ResourcesPATH), args.path);
					core.log(`[${locale.includes("node_modules") ? locale.replace(`..\\..\\node_modules\\`, "Modules:") : locale}].magenta-b`);
					return null;
				});
				build.onEnd((result) => {
					if (result.warnings.length) {
						for (const warning of result.warnings) {
							core.warn(warning.text);
						}
						core.warn(`Compilação [concluída].green com [${result.warnings.length} avisos].yellow.`);
					}
					const elapsedTime = Uptimer(Date.now() / 1000 - startTime, true);
					if (result.errors.length) {
						for (const error of result.errors) {
							core.error(error.text);
						}
						core.warn(
							`Compilação [concluída].green com [${result.errors.length} errors].yellow em [${elapsedTime}].red.`,
						);
					}
					core.log(`[Finalizado].cyan-b em [${elapsedTime}].red`);
				});
			},
		};
	}
}
