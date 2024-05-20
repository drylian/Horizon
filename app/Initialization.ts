import "@/Structural";
import "@/Configurations";

import {
	Server,
	StructuralEvents,
	StructuralEnvWatcher,
	StructuralLanguageWatcher,
	StructuralCrons,
} from "@/Structural";
import { CoreConfig } from "./Configurations";
/**
 * Load Structural Configurations
 */
async function StartServer() {
	/**
     * Get All Events for panel
     */
	await StructuralEvents();
	/**
     * Env Watcher modifications
     */
	await StructuralEnvWatcher();
	/**
     * Language Watcher Modifications
     */
	await StructuralLanguageWatcher();
	/**
     * Cron Starter
     */
	await StructuralCrons();
}

StartServer().then(async () => {
	if (CoreConfig['installed'].get) {
		/**
         * Configurations for Models
         */
		await Server.full();
	} else {
		/**
         * StartUp in Install
         */
		await Server.installer();
	}
});
