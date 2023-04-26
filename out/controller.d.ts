import { Request, Response } from "express";
import Routable from "./routable";
type ControllerHandler = (request: Request, response: Response) => Promise<any>;
declare enum HTTPMethod {
    GET = 0,
    POST = 1
}
declare abstract class Controller extends Routable {
    abstract handle: ControllerHandler;
    protected method: HTTPMethod;
    getMethod(): HTTPMethod;
}
export { ControllerHandler, HTTPMethod };
export default Controller;
