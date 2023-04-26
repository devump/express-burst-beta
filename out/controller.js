"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPMethod = void 0;
const routable_1 = __importDefault(require("./routable"));
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod[HTTPMethod["GET"] = 0] = "GET";
    HTTPMethod[HTTPMethod["POST"] = 1] = "POST";
})(HTTPMethod || (HTTPMethod = {}));
exports.HTTPMethod = HTTPMethod;
class Controller extends routable_1.default {
    constructor() {
        super(...arguments);
        this.method = HTTPMethod.GET;
    }
    getMethod() {
        return this.method;
    }
}
exports.default = Controller;
