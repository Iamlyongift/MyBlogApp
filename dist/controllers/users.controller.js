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
exports.loginUser = exports.RegisterUser = void 0;
const auth_service_1 = require("../services/auth.service");
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confirm_password, phone_number, country, role, } = req.body;
    const result = yield (0, auth_service_1.registerUserService)({
        username,
        email,
        password,
        confirm_password,
        phone_number,
        country,
        role,
    });
    if (result.status === 200) {
        return res.status(result.status).json({
            msg: result.message,
            newUser: result.user,
        });
    }
    else {
        return res.status(result.status).json({
            Error: result.error,
        });
    }
});
exports.RegisterUser = RegisterUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield (0, auth_service_1.loginUserService)({ email, password });
    if (result.status === 200) {
        return res.status(result.status).json({
            msg: result.message,
            user: result.user,
            token: result.token,
        });
    }
    else {
        return res.status(result.status).json({
            error: result.error,
        });
    }
});
exports.loginUser = loginUser;
