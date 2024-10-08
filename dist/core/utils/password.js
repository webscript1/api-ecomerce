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
exports.compare = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * encryptar password
 * @param {*} passwordPlain
 * @returns
 */
const encrypt = (passwordPlain) => __awaiter(void 0, void 0, void 0, function* () {
    //encriptar contrase#a
    //passwordPlain: contrase#a aencriptar
    const hast = yield bcrypt_1.default.hash(passwordPlain, 10);
    return hast;
});
exports.encrypt = encrypt;
//comprar password con hash
/**
 *
 * @param {*} passwordPlain
 * @param {*} hashPassword
 * @returns
 */
const compare = (passwordPlain, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(passwordPlain, hashPassword);
});
exports.compare = compare;
//# sourceMappingURL=password.js.map