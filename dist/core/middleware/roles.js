"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (roles) => {
    return (req, res, next) => {
        const user = req.body.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userRoles = user.role;
        // const hasRole = roles.some(role => userRoles.includes(role));
        const hasRole = roles.some((role => userRoles === role));
        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=roles.js.map