import { Application } from "express";
import installationStartingRouterPost from "./Starting/Post";
import installationStartingRouterPut from "./Starting/Put";
import installationDatabaseRouterPost from "./Database/Post";
import installationDatabaseRouterPut from "./Database/Put";
import InstallationFinishPut from "./Finish";

export function InstallationRouters(app: Application) {
    installationStartingRouterPost.get(app)
    installationStartingRouterPut.get(app)
    installationDatabaseRouterPost.get(app)
    installationDatabaseRouterPut.get(app)
    InstallationFinishPut.get(app)
}