import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    console.log('middleware ran hell yeah!');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "token not found!" });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ message: "token invalid!" });
        req.user = user;
        next();
    });
}