import express, { Application, Request, Response, NextFunction, Router } from "express";
import ServerConfig from "./config";
import Controller, { HTTPMethod } from "./controller";
import ControllerGroup from "./controller-group";
import Routable from "./routable";
import { MiddlewareHandler } from "./middleware";

class Server {

    private app : Application;
    private config : ServerConfig;
    private controllers : Routable[];

    constructor(config: ServerConfig, controllers: Routable[]) {
        this.app = express();
        this.config = config;
        this.controllers = controllers;
    }

    private extractMiddlewares(routable : Routable) : MiddlewareHandler[] {
        const middlewares = routable.getMiddlewares();
        const handlers = middlewares.map(middleware => middleware.getHandler());
        return handlers;
    }

    private processRoutables(routables : Routable[]) : Router {
        const router : Router = Router();

        routables.forEach((routable : Routable) => {    
            if (routable instanceof Controller) {
                const controller : Controller = routable as Controller;

                const middlewares = this.extractMiddlewares(controller);

                switch (controller.getMethod()) {
                    case HTTPMethod.GET:
                        router.get(controller.getPath(), ...middlewares, controller.handle);
                        break;
                    case HTTPMethod.POST:
                        router.post(controller.getPath(), ...middlewares, controller.handle);
                        break;
                }
            } else if (routable instanceof ControllerGroup) {
                const controllerGroup : ControllerGroup = routable as ControllerGroup;
                const childRoutables = controllerGroup.getControllers();
                const childRouter = this.processRoutables(childRoutables);
                const middlewares = this.extractMiddlewares(controllerGroup);
                router.use(controllerGroup.getPath(), ...middlewares, childRouter);
            }
        });

        return router;
    }

    private routeControllers() {
        const router : Router = this.processRoutables(this.controllers);
        this.app.use("/", router);
    }

    private listen() {
        const port = this.config.serverPort || 3000;
        
        this.app.listen(port, () => {
            console.log("Listening port " + port);
        });
    }

    public start() {
        this.routeControllers();
        this.listen();
    }

}

export default Server;