import { EventEmitter } from "node:events";
import { Console, LoggingsMessage } from "loggings";
import esbuild from "esbuild";

function Core(type: string, ...args: LoggingsMessage[]) {
	return Console(type, "cyan", ...args);
}

// Mapeia os nomes dos eventos para as assinaturas de suas funções `run`
export type EventsList = {
    FinishInstallation: () => void;
    DatabaseUpdateSet: (key: string, value: object | number | string) => void;
    UpdateInternalSet: (key: string, value: object | number | string) => void;
	EsbuildRebuild: (esbuild: esbuild.BuildContext) => void;
};

// Define um tipo que representa todas as possíveis configurações de eventos
export type AllEventConfigurations = {
    [K in keyof EventsList]: { name: K; run: EventsList[K] };
};

export class Events {
	public static all: Array<AllEventConfigurations[keyof EventsList]> = [];
	public static set = new EventEmitter();

	constructor(public data: AllEventConfigurations[keyof EventsList]) {
		Core("Event", `[${data.name}].green-b Configurado.`);
		Events.all.push(data);
	}
}
