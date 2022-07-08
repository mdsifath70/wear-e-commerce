import jwt from 'jsonwebtoken';

export default async function getJwtToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.JWT_EXPIRE),
    });
    return token;
}
