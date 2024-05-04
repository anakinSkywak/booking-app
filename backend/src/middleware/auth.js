"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var verifyToken = function (req, res, next) {
    var token = req.cookies["auth_token"];
    if (!token) {
        res.status(401).json({ message: "có lỗi xảy ra" });
    }
    ;
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "có lỗi xảy ra" });
    }
};
exports.default = verifyToken;
