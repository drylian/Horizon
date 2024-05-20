import ReactDOMServer from "react-dom/server";
import React from "react";
import { CoreConfig } from "@/Configurations";
import { FileScanInfo } from "@/Utils";
import { NextFunction, Request, Response } from "express";
import { Metadata } from "./Extends/Metadata";
import { StaticRouter } from "react-router-dom/server";

export function ServerApplication(req: Request, res: Response, next: NextFunction) {
    const config = res.locals.coreConfig as typeof CoreConfig
    const { Head, Body } = Metadata(res.locals.resources as FileScanInfo[], config['mode'].get.startsWith("pro"))
    const icon = config["logo"].get;
    const owner = config["owner"].get;
    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={req.url}>
                <html>
                    <head>
                        <link rel="icon" type="image/png" href={icon} />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="author" content={owner} />
                        {Head}
                    </head>
                    <body className="bg-white dark:bg-black transition duration-500">
                        <div id="root" >

                        </div>
                        {Body}
                    </body>
                </html>
            </StaticRouter >
        </React.StrictMode>
    )
    res.status(200).send(html)
}