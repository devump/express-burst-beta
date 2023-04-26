import { Request, Response, NextFunction } from 'express';

type MiddlewareHandler = (request: Request, response : Response, next : NextFunction) => Promise<any>;

abstract class Middleware {
    protected abstract handle : MiddlewareHandler;

    public getHandler() : MiddlewareHandler {
        return this.handle;
    }
}

export { MiddlewareHandler };
export default Middleware;