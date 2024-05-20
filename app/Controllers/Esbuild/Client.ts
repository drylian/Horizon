import { ResourcesPATH, RootPATH } from "@/Structural";
import path from "node:path";
import * as esbuild from "esbuild";
import { ReacterLoaders } from "./Loader";
import { EsbuildLogger } from "./Plugins/Logger";
import { CoreConfig } from "@/Configurations";
export function ClientEsbuild(): esbuild.BuildOptions & { metafile: true } {
	const production = CoreConfig['mode'].get.startsWith("pro") ? true : false;
	return {
		assetNames: "[name]-[hash]",
		bundle: !production,
		chunkNames: "[name]-[hash]",
		entryNames: CoreConfig['mode'].get.startsWith("pro") ? "[name]-[hash]" : "development-bundle",
		format: "esm",
		logLevel: "silent",
		jsx: "automatic",
		metafile: true,
		platform: "browser",
		splitting: true,
		target: "es2021",
		entryPoints: {
			bundle: CoreConfig['mode'].get.startsWith("pro") ? path.join(ResourcesPATH + "/Client/Index.tsx") :  path.join(ResourcesPATH + "/Client/Development.tsx"),
		},
		sourcemap: !production,
		minify: production,
		outdir: path.join(ResourcesPATH, "Build", "Client"),
		loader: ReacterLoaders,
		plugins: [new EsbuildLogger("Client", "blue").init()],
	};
}
