import { Configuration, DataTypes } from "@/Classes/Configuration";
import { Env, Envsv, gen } from "@/Utils";

export const CoreConfig = {
	/**
	 * Installed Status
	 */
	installed: new Configuration({
		env: "CORE_INSTALLED",
		def: false,
		type: DataTypes.bool
	}),
	/**
	 * Domains Locales
	 */
	domain: new Configuration({
		env: "CORE_DOMAIN_URL",
		def: "",
		type: DataTypes.str
	}),
	/**
	 * Node mode
	 */
	mode: new Configuration({
		env: "NODE_DEV",
		def: "development",
		type: DataTypes.str
	}),
	/**
	 * Core key, for crypt sensive values
	 */
	key: new Configuration({
		env: "CORE_KEY",
		def: "development",
		type: DataTypes.str
	}),
	/**
	 * Core default lang
	 */
	language: new Configuration({
		env: "CORE_LANGUAGE",
		def: Env("CORE_LANGUAGE") ? Env("CORE_LANGUAGE") : Envsv("CORE_LANGUAGE", "pt-BR", "Linguagem do painel"),
		type: DataTypes.str
	}),
	/**
	 * Core owner name
	 */
	owner: new Configuration({
		env: "CORE_OWNER",
		def: "Horizon",
		type: DataTypes.str
	}),
	/**
	 * Core logotipo locale, http/https:// as supported
	 */
	logo: new Configuration({
		env: "CORE_LOGO",
		def: "/img/logo.jpg",
		type: DataTypes.str
	}),
	/**
	 * Core default port
	 */
	port: new Configuration({
		env: "CORE_PORT",
		def: 3000,
		type: DataTypes.num
	}),
	/**
	 * Core default lang ["http", "https", "http/https"]
	 */ 
	protocol: new Configuration({
		env: "CORE_PROTOCOL",
		def: "http/https",
		chk: (env, def) => {
			if (["http", "https", "http/https"].includes(Env(env))) {
				return Env(env);
			}
			return def;
		},
		type: DataTypes.str
	}),
	/**
	 * Core default Signature, used in cookies
	 */ 
	signature: new Configuration({
		env: "CORE_SIGNATURE",
		def: gen(128),
		type: DataTypes.str
	}),
	/**
	 * Core default Title, application title
	 */ 
	title: new Configuration({
		env: "CORE_TITLE",
		def: "Core-ATS",
		type: DataTypes.str
	}),
	/**
	 * Core default Url, application url
	 */ 
	url: new Configuration({
		env: "CORE_URL",
		def: "http://localhost",
		type: DataTypes.str
	}),
}