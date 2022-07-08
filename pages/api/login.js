import bcrypt from 'bcrypt';
import UserModel from '../../models/UserModel';
import dbConnect from '../../utils/db';
import getJwtToken from '../../utils/getJwtToken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        dbConnect();

        const parsedBody = JSON.parse(req.body);
        const user = await UserModel.findOne({ email: parsedBody.email });

        if (user) {
            const { password } = parsedBody;
            const isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                // jwt token
                const token = await getJwtToken({ id: user._id, userName: user.userName });

                // response
                res.status(200).json({
                    message: 'You have successfully logged in',
                    token,
                });
            } else {
                res.status(400).json({
                    error: 'Invalid credentials!',
                });
            }
        } else {
            res.status(400).json({
                error: 'No user found! Please signup',
            });
        }
    } else {
        res.status(500).json({
            error: 'This request not allowed',
        });
    }
}
