// Tạo 1 middleware role base access control (rbac) để kiểm tra quyền truy cập dựa trên vai trò người dùng
// src/common/middleware/rbac.js
import jwt from 'jsonwebtoken';

// Có 1 danh sách tất cả các vai trò và danh sách tất cả các quyền
const rolesPermissions = {
    admin: ['read:any', 'write:any', 'delete:any'],
    user: ['read:own', 'write:own'],
    guest: ['read:own'],
};

// Middleware kiểm tra quyền truy cập dựa trên vai trò
function rbac(requiredPermission) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'Authorization header missing' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token missing' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userRole = decoded.role;
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const permissions = rolesPermissions[userRole] || [];
        if (!permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
}

export default rbac;
