import { Configuration, DataTypes } from "@/Classes/Configuration";
import { Env } from "@/Utils";

export const DbConfig = {
    /**
     * Dialect of Database
     */
    dialect: new Configuration({
        env: "DB_DIALECT",
        def: "sqlite",
        chk: (env, def) => {
            const Data = Env(env)
            if (Data !== undefined) {
                if (Data === "mysql") return Data
                if (Data === "sqlite") return Data
            }
            return def
        },
        type: DataTypes.str
    }),
    /**
     * Host of Database
     */
    host: new Configuration({
        env: "DB_HOSTNAME",
        def: Env("DB_DIALECT") == "mysql" ? (Env("DB_HOSTNAME") ? Env("DB_HOSTNAME") : undefined) : undefined,
        type: DataTypes.str
    }),
    /**
     * Port of Database
     */
    port: new Configuration({
        env: "DB_PORT",
        def: Env("DB_DIALECT") == "mysql" ? (Env("DB_PORT") ? Env("DB_PORT") : 3306) : 3306,
        type: DataTypes.num
    }),
    /**
     * User of Database
     */
    user: new Configuration({
        env: "DB_USERNAME",
        def: Env("DB_DIALECT") == "mysql" ? (Env("DB_USERNAME") ? Env("DB_USERNAME") : undefined) : undefined,
        type: DataTypes.str
    }),
    /**
     * Pass of Database
     */
    pass: new Configuration({
        env: "DB_PASSWORD",
        def: Env("DB_DIALECT") == "mysql" ? (Env("DB_PASSWORD") ? Env("DB_PASSWORD") : undefined) : undefined,
        type: DataTypes.str
    }),
    /**
     * Database of Database
     */
    database: new Configuration({
        env: "DB_DATABASE",
        def: Env("DB_DIALECT") == "mysql" ? (Env("DB_DATABASE") ? Env("DB_DATABASE") : undefined) : undefined,
        type: DataTypes.str
    }),
}