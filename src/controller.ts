import { Router, Request, Response } from "express";
import Routable from "./routable";

type ControllerHandler = (request: Request, response : Response) => Promise<any>;

enum HTTPMethod {
    GET,
    POST
}

abstract class Controller extends Routable {
    public abstract handle : ControllerHandler;
    protected method : HTTPMethod = HTTPMethod.GET;

    public getMethod() : HTTPMethod {
        return this.method;
    }
}

export { ControllerHandler, HTTPMethod };
export default Controller;