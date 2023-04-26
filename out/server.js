"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const controller_1 = __importStar(require("./controller"));
const controller_group_1 = __importDefault(require("./controller-group"));
class Server {
    constructor(config, controllers) {
        this.app = (0, express_1.default)();
        this.config = config;
        this.controllers = controllers;
    }
    extractMiddlewares(routable) {
        const middlewares = routable.getMiddlewares();
        const handlers = middlewares.map(middleware => middleware.getHandler());
        return handlers;
    }
    processRoutables(routables) {
        const router = (0, express_1.Router)();
        routables.forEach((routable) => {
            if (routable instanceof controller_1.default) {
                const controller = routable;
                const middlewares = this.extractMiddlewares(controller);
                switch (controller.getMethod()) {
                    case controller_1.HTTPMethod.GET:
                        router.get(controller.getPath(), ...middlewares, controller.handle);
                        break;
                    case controller_1.HTTPMethod.POST:
                        router.post(controller.getPath(), ...middlewares, controller.handle);
                        break;
                }
            }
            else if (routable instanceof controller_group_1.default) {
                const controllerGroup = routable;
                const childRoutables = controllerGroup.getControllers();
                const childRouter = this.processRoutables(childRoutables);
                const middlewares = this.extractMiddlewares(controllerGroup);
                router.use(controllerGroup.getPath(), ...middlewares, childRouter);
            }
        });
        return router;
    }
    routeControllers() {
        const router = this.processRoutables(this.controllers);
        this.app.use("/", router);
    }
    listen() {
        const port = this.config.serverPort || 3000;
        this.app.listen(port, () => {
            console.log("Listening port " + port);
        });
    }
    start() {
        this.routeControllers();
        this.listen();
    }
}
exports.default = Server;
