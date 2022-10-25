"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Get_1 = require("../controllers/Get");
const ApiPaths_1 = require("./ApiPaths");
exports.router = express_1.default.Router();
exports.router.get("/" + ApiPaths_1.api.ALBUMS, Get_1.albums);
exports.router.get("/" + ApiPaths_1.api.SONGS, Get_1.songs);
