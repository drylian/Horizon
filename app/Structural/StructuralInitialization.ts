import http, { createServer } from "node:http";
import { Installer } from "@/Controllers/Installer";
import { Loggings } from "loggings";
import { CoreConfig } from "@/Configurations";
import { Express } from "@/Controllers/Express";
/**
 * Class for initialization web resources curl
 */
class StructuralInitialization {
	public process: ReturnType<typeof createServer> | null;
	private readonly core: InstanceType<typeof Loggings>;
	constructor() {
		this.process = null;
		this.core = new Loggings("Sistema", "cyan");
	}
	public async getIp() {
		const response = await fetch("https://ifconfig.me/ip");
		const ipAddress = (await response.text()).trim();
		return ipAddress;
	}
	/**
	 * Start Server in full Aplication and Database
	 */
	public async full(): Promise<void> {
		if (!this.process) {
			const express = new Express();
			await express.react(express.express)
			this.process = http.createServer(express.express);
			this.core.info(`Servidor iniciará em ${CoreConfig['url'].get}:${CoreConfig['port'].get}`);
			this.process.listen(CoreConfig['port'].get);
		}
	}
	/**
	 * Start Server in install mode, limited access and not have database
	 */
	public async installer(): Promise<void> {
		if (!this.process) {
			const express = new Installer();
			await express.react(express.express)
			this.process = http.createServer(express.express);
			const ip = await this.getIp();
			this.core.info(
				`Servidor iniciará em modo de instalação, no link http://${ip}:${CoreConfig['port'].get}`,
			);
			this.process.listen(CoreConfig['port'].get);
		}
	}
}

export const Server = new StructuralInitialization();
