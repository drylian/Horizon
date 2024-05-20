import { CoreConfig } from "./Core.conf";
import { DbConfig } from "./Database.conf";

export * from "./Core.conf";
export * from "./Database.conf";

export const Global = {
    ...CoreConfig,
    ...DbConfig
}