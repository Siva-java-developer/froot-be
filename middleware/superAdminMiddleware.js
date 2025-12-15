const superAdminMiddleware = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'Access denied. SuperAdmin only.' });
    }
    next();
};

module.exports = superAdminMiddleware;