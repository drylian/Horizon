import { CoreConfig } from "@/Configurations";
import { ResourcesPATH, StoragePATH } from "@/Structural";
import { exec } from "child_process";
import esbuild from "esbuild";
import express from "express";
import path from "path";
import { dirSC } from "@/Utils";
import { EsbuildError } from "./Esbuild/Error";
import { GenericError } from "@/core";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ServerApplication } from "@/Resources/Server/Index";

export class EsbuildStarter {
    private cli: esbuild.BuildOptions & { metafile: true }
    private mode: boolean
    private type: string
    private context: esbuild.BuildContext

    constructor(cli: esbuild.BuildOptions & { metafile: true }, type: string) {
        this.type = type
        this.cli = cli
        this.mode = CoreConfig['mode'].get.startsWith("pro")
    }
    public async runtime(app: express.Application) {
        if (this.mode) {
            return await this.production(app);
        } else {
            return await this.development(app);
        }
    }
    public async production(app: express.Application) {
// to fazendo kkkk
    }
    public async development(app: express.Application) {
        
        const tailwind = `npx tailwindcss -i ${ResourcesPATH}/Server/main.css -o ${ResourcesPATH}/${this.type}/Assets/tailwind.css --watch`;
        exec(tailwind);

        this.context = await esbuild.context({
            ...this.cli,
            outdir: path.join(path.join(StoragePATH, "Esbuild", this.type)),
        });
        await this.context.watch();

        let { port } = await this.context.serve({
            servedir: path.join(path.join(StoragePATH, "Esbuild", this.type)),
        })
        app.use('/proxy', createProxyMiddleware({ 
            target: 'http://localhost:' + port, 
            changeOrigin: true,
            pathRewrite: {
                '^/proxy': '',
              },
        }));

        app.use("*", (req, res, next) => {
            res.locals.resources = dirSC(path.join(StoragePATH, "Esbuild", this.type));
            res.locals.coreConfig = CoreConfig;
            next();
        })
        app.get("*", async (req, res, next) => {
            try {
                ServerApplication(req, res, next)
            } catch (e) {
                if (!res.headersSent) return res.send(EsbuildError(e as GenericError, this.mode, false));
                console.error(
                    "Reacter Server ERROR:" + `${(e as GenericError).message}\n ${(e as GenericError).stack}`,
                );
            }
        })
    }
}