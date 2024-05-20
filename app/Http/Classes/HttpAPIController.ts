import express, { NextFunction, Request, Response } from "express";

import { Permissions } from "@/Models/User.model";
import { Loggings } from "loggings";
import { CoreConfig } from "@/Configurations";
import I18alt from "@/Controllers/Languages";

/**
 * Types of Authenticator
 */
enum AuthenticateTypes {
    Cookie = "Cookie",
    Token = "Token",
    ClientToken = "ClientToken",
    FullAccess = "AllAccess",
}
/**
 * Methods of Express
 */
export enum ExpressMethods {
    Get = "get",
    Post = "post",
    Put = "put",
    Delete = "delete",
}

type ExpressConfigurations = {
    req: Request;
    res: Response;
    next: NextFunction;
};

export type RouterConfigurations = {
    /**
     * Locale file, for catch errors
     */
    dir: string;
    /**
     * Path of Router
     */
    path: string;
    /**
     * Permission required to access this route
     */
    permission?: Permissions;
    /**
     * Type of Access allowed [Cookie, Token, and ClientToken]
     */
    type: Array<AuthenticateTypes>;
    /**
     * Method Used in Route
     */
    method: ExpressMethods;
    /**
     * Router Function
     * @param express Request,Response,NextFunction of express
     * @param core Logs controller
     */
    run(Application: ExpressConfigurations, core: InstanceType<typeof Loggings>): Promise<void> | void;
};

export class HttpAPIController {
    public static readonly Auths = AuthenticateTypes;
    public static readonly Methods = ExpressMethods;
    public options: RouterConfigurations;
    constructor(options: RouterConfigurations) {
        let type;
        if (options.type.includes(AuthenticateTypes.FullAccess)) {
            type = [AuthenticateTypes.Cookie, AuthenticateTypes.Token, AuthenticateTypes.ClientToken];
        } else {
            type = options.type;
        }
        this.options = {
            ...options,
            type,
        };
    }
    public get(app: express.Application) {
        const options = this.options
        app[options.method](options.path, async (req, res, next) => {
            const core = new Loggings("HTTPController");
            try {
                req.core.route = {
                    path: options.path,
                    origin_path: req.originalUrl,
                    method: options.method,
                };
                await options.run({ req, res, next }, core);
            } catch (Err: unknown) {
                const Production = CoreConfig['mode'].get.startsWith("pro")
                const Erro = Err as TypeError
                core.error(`Err : [${options.dir}].red-b`);
                core.error(Erro.stack);
                if (!res.headersSent) {
                    res.status(500);
                    const message = Production ? new I18alt().t("http.InternalHttpError") : Erro.message
                    const stack = Production ? {} : { error:{
                        message:Erro.message,
                        stack:Erro.stack,
                        name:Erro.name,
                    }}
                    const error = {
                        status: "error",
                        timestamp: Date.now(),
                        message,
                        ...stack
                    };
                    res.json(error);
                }
            }
        });
    }
}
