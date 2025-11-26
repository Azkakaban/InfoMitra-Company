const jwt = require('jsonwebtoken');
const SECRET_KEY =  process.env.JWT_SECRET;;

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.status(401).json({ message: 'Token tidak ada' });

        const token = authHeader.split(' ')[1];
        if(!token) return res.status(401).json({ message: 'Token tidak ada' });

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;

            if(roles.length && !roles.includes(decoded.role))
                return res.status(403).json({ message: 'Akses ditolak' });

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }
    };
};

module.exports = authMiddleware;
