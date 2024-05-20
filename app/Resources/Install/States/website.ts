import { Action, action } from "easy-peasy";

export interface LangsConf {
    /**
     * Translators of lang
     */
    translators: string[];
    /**
     * Image of lang
     */
    logo: string;
    /**
     * Lang acronym
     */
    lang: string;
    /**
     * Lang name
     */
    language:string;
}
export interface WebsiteConf {
    installed:boolean;
    title: string;
    mode:boolean;
    port: number;
    domain: string;
    lang: string;
    langs: LangsConf[];
}
export interface WebsiteStore {
    data?: WebsiteConf;
    setWebsite: Action<WebsiteStore, WebsiteConf>;
}

const website: WebsiteStore = {
    data: undefined,
    setWebsite: action((state, payload) => {
        state.data = { ...payload };
    }),
};

export default website;
