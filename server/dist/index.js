"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const constants_1 = require("./constants");
const datasource_1 = require("./datasource");
const messageRouter_1 = require("./router/messageRouter");
const authRouter_1 = require("./router/authRouter");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.set("trust proxy", 1);
    datasource_1.appDataSource
        .initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    })
        .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
    app.use("/", authRouter_1.authRouter);
    app.use("/message", messageRouter_1.messageRouter);
    const httpServer = (0, http_1.createServer)(app);
    httpServer.listen(constants_1.PORT, () => {
        console.log(`🚀 Server ready at ${constants_1.BACKEND_URL}:${constants_1.PORT}`);
    });
}))();
//# sourceMappingURL=index.js.map