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
exports.User = exports.User_service = void 0;
const users_1 = __importDefault(require("../../models/users"));
exports.User = users_1.default;
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const orders_1 = __importDefault(require("../../models/orders"));
const errorHandler_1 = require("../errors/errorHandler");
class User_service {
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'test user',
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 201,
                    message: 'usuario creado',
                };
                const user = new users_1.default(req.body);
                user.role = 'user';
                console.log('user ', user);
                const user_save = yield user.save();
                data.data = user_save;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'usuario',
                };
                const { id, page, sort, limit = 10, email } = req.query;
                let users;
                const options = {
                    limit: limit,
                    page: page || 1,
                    // Proyección: solo las propiedades 'result' y 'profit'
                    sort: { createdAt: Number(sort) || -1 }, //-1 : desendente 1:asendente
                    select: '-password',
                };
                if (id) {
                    users = yield users_1.default.findById(id).select('-password');
                    if (!users) {
                        throw new errorHandler_1.NotFoundError('usuario no encontrado');
                    }
                    data.data = users;
                    return data;
                }
                if (email) {
                    users = yield users_1.default.findOne({ email: email }).select('-password');
                    if (!users) {
                        throw new errorHandler_1.NotFoundError('usuario no encontrado');
                    }
                    data.data = users;
                    return data;
                }
                users = yield users_1.default.paginate({}, options);
                data.data = users;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'usuario actualizado',
                };
                const { id } = req.params;
                const user_update = yield users_1.default.findByIdAndUpdate(id, req.body, {
                    new: true,
                }).select('-password');
                if (!user_update) {
                    throw new errorHandler_1.NotFoundError('usuario no encontrado para actualizar');
                }
                data.data = user_update;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'usuario eliminado',
                };
                const { id } = req.params;
                const user_delete = yield users_1.default.findByIdAndDelete(id).select('-password');
                if (!user_delete) {
                    throw new errorHandler_1.NotFoundError('usuario no encontrado para eliminar');
                }
                data.data = user_delete;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'todos los usuarios eliminados',
                };
                const user_delete = yield users_1.default.deleteMany();
                if (!user_delete) {
                    throw new errorHandler_1.NotFoundError('no hay usuarios para eliminar');
                }
                data.data = user_delete;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    sing_in(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                let token;
                const data = {
                    code: 0,
                    message: '',
                };
                // Buscar el usuario por su correo electrónico
                const user = yield users_1.default.findOne({ email });
                // Verificar si el usuario existe
                if (!user) {
                    throw new errorHandler_1.NotFoundError('Email no existe');
                }
                // Verificar la contraseña
                const passwordMatch = yield (0, password_1.compare)(password, user.password);
                if (!passwordMatch) {
                    throw new errorHandler_1.UnauthorizedError('contraseña incorrecta.');
                }
                // Generar token de acceso (JWT) para el usuario
                token = yield (0, jwt_1.tokenSing)(user);
                data.code = 200;
                data.message = 'sesion iniciada';
                data.data = { token: token };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    detailUserAndOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'detalle user y orders',
                };
                const userId = req.body.user._id;
                let user;
                let orders;
                let detailUser = {
                    user: undefined,
                    orders: undefined,
                };
                const { page = 1, sort = -1 } = req.query;
                let products;
                const options = {
                    limit: 10,
                    page: Number(page) || 1,
                    // Proyección: solo las propiedades 'result' y 'profit'
                    sort: { createdAt: Number(sort) || -1 }, //-1 : desendente 1:asendente
                };
                if (userId) {
                    user = yield users_1.default.findById(userId).select('firstName lastName email ');
                    if (!user) {
                        data.code = 404;
                        data.message = 'usuario no encontrado ';
                        return data;
                    }
                    detailUser.user = user;
                }
                orders = yield orders_1.default.paginate({ userId: userId }, options);
                detailUser.orders = orders;
                data.data = detailUser;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.User_service = User_service;
//# sourceMappingURL=user.js.map