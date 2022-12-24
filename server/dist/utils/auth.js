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
exports.getErrorAuthResponse = exports.revokeRefreshTokens = exports.createRefreshToken = exports.createAccessToken = void 0;
const User_1 = require("../entity/User");
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../constants");
const datasource_1 = require("../datasource");
const createAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({
        userId: user.id,
    }, constants_1.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({
        userId: user.id,
        tokenVersion: user.tokenVersion,
    }, constants_1.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
exports.createRefreshToken = createRefreshToken;
const revokeRefreshTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield datasource_1.appDataSource.manager
        .getRepository(User_1.User)
        .increment({ id: userId }, "tokenVersion", 1);
});
exports.revokeRefreshTokens = revokeRefreshTokens;
const getErrorAuthResponse = () => ({ ok: false, accessToken: "" });
exports.getErrorAuthResponse = getErrorAuthResponse;
//# sourceMappingURL=auth.js.map