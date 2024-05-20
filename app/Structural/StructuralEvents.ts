import { glob } from "glob";
import path from "path";
import { RootPATH } from "@/Structural";
import { Events } from "@/Classes/Events";

/**
 * Configuration Events for panel
 */
export async function StructuralEvents() {
	const CoreDIR = path.join(RootPATH);
	const paths = await glob(["Events/**/*.{ts,js}"], { cwd: CoreDIR });

	for (const pather of paths) {
		await import(`${path.join("..", pather)}`);
	}

	for (const isolated of Events.all) {
		Events.set.on(isolated.name, isolated.run);
	}
}
