"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routable {
    constructor() {
        this.middlewares = [];
    }
    getPath() {
        return this.path;
    }
    getMiddlewares() {
        return this.middlewares;
    }
}
exports.default = Routable;
