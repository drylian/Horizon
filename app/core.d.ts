import { Internal } from "./Controllers/Storage";
import { AuthenticateTypes, ExpressMethods, Router } from "./Http/Structures/Route";

/**
 * Core Aplication Declares
 */
declare global {
    namespace Core_ATS {
        interface SettingsAttributes {
            key: string;
            type: "number" | "string" | "boolean" | "object" | "string[]" | "number[]" | "object[]";
            value: string;
            description: string;
        }
        interface GenericError {
            message?: string;
            stack?: string;
            code?: string | number;
        }
    }
    namespace JSX {
        interface IntrinsicElements {
            /**
             * Core SSR special args
             */
            coreapplicationrender: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            coreapplicationtitlerender: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLHeadingElement>,
                HTMLHeadingElement
            >;
            coreapplicationtitle: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        }
    }
    namespace Express {
        interface Request {
            access: {
                /**
                 * Core Arguments storage
                 */
            };
            /**
             * Core Request Arguments
             */
            core: {
                internal?: typeof Internal;
                ping?: number;
                /**
                 * Requested Route info
                 * Used for React Response
                 */
                route?: {
                    /**
                     * virtual requested path exemple /valor/:teste, not /valor/algo;
                     */
                    path: string;
                    /**
                     * Request Original Path
                     */
                    origin_path: string;
                    /**
                     * Request Method used for generic Requesters
                     */
                    method: ExpressMethods;
                };
                /**
                 * Type Request, is User,Token or User token etc...
                 */
                type?: AuthenticateTypes;
                /**
                 * Nonce of request, for helmet
                 */
                nonce?: string;
            };
        }
        interface Response {
            core: {
                /**
                 * Passed through Responser, for errors
                 */
                responser: boolean;
            };
        }
    }
}

export = Core_ATS;
