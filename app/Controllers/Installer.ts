import express from "express";
import { EsbuildStarter } from "./Esbuild";
import { InstallerEsbuild } from "./Esbuild/Install";
import { LanguageRequests } from "./Languages/i18AltRequests";
import { RootPATH } from "@/Structural";
import ApplicationRouter from "@/Http/Base/Application";
import { CoreConfig } from "@/Configurations";
import { InstallationRouters } from "@/Http/Installation/Router";

export class Installer {
	public express: express.Application;

	constructor() {
		this.express = express();
		this.routes();
	}
	public routes() {
		new LanguageRequests(this.express)
		this.express.use(express.static(RootPATH + "/Assets"))
		this.express.use(express.json())

		this.express.use((req, res, next) => {
			req.core = {}
			next();
		})
		ApplicationRouter.get(this.express)
		InstallationRouters(this.express)
	}
	public async react(app: express.Application) {
		return await new EsbuildStarter(InstallerEsbuild(), "Install").runtime(app);
	}
}