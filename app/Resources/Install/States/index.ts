import { createStore } from "easy-peasy";
import website, { WebsiteStore } from "./website";

export interface ApplicationStore {
    website: WebsiteStore;
}
/**
 * States usados
 */
const state: ApplicationStore = {
    website,
};

export const store = createStore(state);
