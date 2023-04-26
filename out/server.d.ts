import ServerConfig from "./config";
import Routable from "./routable";
declare class Server {
    private app;
    private config;
    private controllers;
    constructor(config: ServerConfig, controllers: Routable[]);
    private extractMiddlewares;
    private processRoutables;
    private routeControllers;
    private listen;
    start(): void;
}
export default Server;
