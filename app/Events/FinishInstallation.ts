import { Events } from "@/Classes/Events";
import { Server } from "@/Structural";
import { Envsv } from "@/Utils";

new Events({
	name: "FinishInstallation",
	run: async () => {
		console.log("Instalação completa, fechando servidor");
		if (Server.process) {
			Server.process.close();
			console.log("Servidor de instalação fechado, iniciando servidor completo.");
			Server.process = null;
			Envsv("CORE_INSTALLED", true);
			await Server.full();
		}
	},
});
