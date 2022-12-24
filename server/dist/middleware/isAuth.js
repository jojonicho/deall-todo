"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../constants");
const isAuth = (req, res, next) => {
    const authorize = req.headers["authorization"];
    if (!authorize) {
        return res.send({ ok: false, message: "must be authenticated" });
    }
    try {
        const token = authorize.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, constants_1.ACCESS_TOKEN_SECRET);
        req.payload = payload;
    }
    catch (err) {
        console.log(err);
        return res.send({ ok: false, message: "must be authenticated" });
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map