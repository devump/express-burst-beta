import { Request, Response, NextFunction } from 'express';
type MiddlewareHandler = (request: Request, response: Response, next: NextFunction) => Promise<any>;
declare abstract class Middleware {
    protected abstract handle: MiddlewareHandler;
    getHandler(): MiddlewareHandler;
}
export { MiddlewareHandler };
export default Middleware;
