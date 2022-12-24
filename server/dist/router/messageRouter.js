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
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const datasource_1 = require("../datasource");
const Message_1 = require("../entity/Message");
const User_1 = require("../entity/User");
const isAuth_1 = require("../middleware/isAuth");
exports.messageRouter = (0, express_1.Router)();
exports.messageRouter.get("/message", isAuth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.userId;
    const user = yield datasource_1.appDataSource.getRepository(User_1.User).findOneBy({
        id: userId,
    });
    if (!user) {
        return res.send({ ok: false, message: "auth error" });
    }
    if (user.isAdmin) {
        const posts = yield datasource_1.appDataSource.getRepository(Message_1.Message).find();
        return res.send({ ok: true, posts });
    }
    const posts = yield datasource_1.appDataSource.getRepository(Message_1.Message).find({
        where: {
            user: {
                id: userId,
            },
        },
    });
    return res.send({ ok: true, posts });
}));
exports.messageRouter.post("/message", isAuth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.payload) === null || _b === void 0 ? void 0 : _b.userId;
    const { title, content } = req.body;
    const message = yield Message_1.Message.create({
        title,
        content,
        user: {
            id: userId,
        },
    }).save();
    return res.send({ ok: true, message });
}));
exports.messageRouter.post("/message/:id", isAuth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    const message = yield datasource_1.appDataSource.getRepository(Message_1.Message).update({
        id,
    }, {
        title,
        content,
    });
    return res.send({ ok: true, message });
}));
exports.messageRouter.delete("/message/:id", isAuth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield datasource_1.appDataSource.getRepository(Message_1.Message).delete({
        id,
    });
    return res.send({ ok: true });
}));
//# sourceMappingURL=messageRouter.js.map