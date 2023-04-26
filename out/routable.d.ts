import Middleware from "./middleware";
declare abstract class Routable {
    protected abstract path: string;
    protected middlewares: Middleware[];
    getPath(): string;
    getMiddlewares(): Middleware[];
}
export default Routable;
