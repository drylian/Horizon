import express from "express";
import { EsbuildStarter } from "./Esbuild";
import { LanguageRequests } from "./Languages/i18AltRequests";
import { RootPATH } from "@/Structural";
import ApplicationRouter from "@/Http/Base/Application";
import { ClientEsbuild } from "./Esbuild/Client";

export class Express {
	public express: express.Application;
	constructor() {
		this.express = express();
		this.routes();
	}
	public routes() {
		new LanguageRequests(this.express)
		this.express.use(express.static(RootPATH + "/Assets"))
		this.express.use(express.json())
		this.express.use((req, res, next) => { req.core = {}, next() })
		ApplicationRouter.get(this.express)
	}
	public async react(app: express.Application) {
		return await new EsbuildStarter(ClientEsbuild(), "Client").runtime(app);
	}
}