import Controller from "./controller";
import Middleware from "./middleware";
import Routable from "./routable";

abstract class ControllerGroup extends Routable {
    protected abstract controllers : Routable[];
    protected middlewares : Middleware[] = [];

    public getControllers() : Routable[] {
        return this.controllers;
    }
}

export default ControllerGroup;