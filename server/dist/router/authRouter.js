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
exports.authRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../constants");
const datasource_1 = require("../datasource");
const User_1 = require("../entity/User");
const isAuth_1 = require("../middleware/isAuth");
const auth_1 = require("../utils/auth");
const sendRefreshToken_1 = require("../utils/sendRefreshToken");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/refresh_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies[constants_1.COOKIE_NAME];
    if (!token) {
        return res.send((0, auth_1.getErrorAuthResponse)());
    }
    let payload = null;
    try {
        payload = (0, jsonwebtoken_1.verify)(token, constants_1.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        console.log(err);
        return res.send((0, auth_1.getErrorAuthResponse)());
    }
    try {
        const user = yield datasource_1.appDataSource.getRepository(User_1.User).findOneBy({
            id: payload.userId,
        });
        if (!user || user.tokenVersion !== payload.tokenVersion) {
            return res.send((0, auth_1.getErrorAuthResponse)());
        }
        (0, sendRefreshToken_1.sendRefreshToken)(res, (0, auth_1.createRefreshToken)(user));
        return res.send({ ok: true, accessToken: (0, auth_1.createAccessToken)(user) });
    }
    catch (e) {
        console.log(e);
        return res.send((0, auth_1.getErrorAuthResponse)());
    }
}));
exports.authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const user = yield User_1.User.create({
            email,
            username,
            password,
        }).save();
        res.send({ ok: true, user });
    }
    catch (err) {
        res.send({ ok: false, error: err.message });
    }
}));
exports.authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield datasource_1.appDataSource.getRepository(User_1.User).findOneBy({
        username,
    });
    if (!user || user.password !== password) {
        return res.send({ ok: false, error: "Invalid username or password" });
    }
    (0, sendRefreshToken_1.sendRefreshToken)(res, (0, auth_1.createRefreshToken)(user));
    const accessToken = (0, auth_1.createAccessToken)(user);
    return res.send({ ok: true, accessToken });
}));
exports.authRouter.get("/me", isAuth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send({ ok: true, payload: req === null || req === void 0 ? void 0 : req.payload });
}));
//# sourceMappingURL=authRouter.js.map