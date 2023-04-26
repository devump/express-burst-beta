import Middleware from "./middleware";
import Routable from "./routable";
declare abstract class ControllerGroup extends Routable {
    protected abstract controllers: Routable[];
    protected middlewares: Middleware[];
    getControllers(): Routable[];
}
export default ControllerGroup;
