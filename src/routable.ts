import Middleware from "./middleware";

abstract class Routable {
    protected abstract path : string;
    protected middlewares : Middleware[] = [];
    
    public getPath() : string {
        return this.path;
    }

    public getMiddlewares() : Middleware[] {
        return this.middlewares;
    }
}

export default Routable;