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
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = __importDefault(require("../models/products"));
const users_1 = __importDefault(require("../models/users"));
const orders_1 = __importDefault(require("../models/orders"));
const cars_1 = __importDefault(require("../models/cars"));
const databasePassword = process.env.DATABASEPASSWORD;
const databaseUser = process.env.DATABASEUSER;
const databaseUrl = process.env.URLDATABASE;
const databaseConnectionString = `mongodb+srv://${databaseUser}:${databasePassword}@${databaseUrl}`;
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Deshabilitar la creación automática de índices
        mongoose_1.default.set('autoIndex', false);
        mongoose_1.default.connection.on('connected', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Connected to the database Mongodb successfully');
        }));
        const connectedDatabase = yield mongoose_1.default.connect(databaseConnectionString);
        try {
            // Crear índices manualmente
            yield products_1.default.createIndexes();
            yield users_1.default.createIndexes();
            yield orders_1.default.createIndexes();
            yield cars_1.default.createIndexes();
            console.log('Índices creados');
        }
        catch (err) {
            console.error('Error al crear índices', err);
        }
        return connectedDatabase; // Devolverá el valor de connectedDatabase
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Lanza una excepción para que se maneje adecuadamente en otros lugares
    }
});
exports.default = connectDatabase;
//# sourceMappingURL=db.js.map