import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {

        const { token } = req.headers;
        if (!token) {
            return res.json({
                status: false,
                message: "Not Authorized Login Again"
            })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        return next();

    } catch (error) {
        res.json({
            success: false,
            message: "Error"
        })
    }
}

export default authMiddleware;