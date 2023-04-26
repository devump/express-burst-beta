"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routable_1 = __importDefault(require("./routable"));
class ControllerGroup extends routable_1.default {
    constructor() {
        super(...arguments);
        this.middlewares = [];
    }
    getControllers() {
        return this.controllers;
    }
}
exports.default = ControllerGroup;
