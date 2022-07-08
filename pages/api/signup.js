import bcrypt from 'bcrypt';
import UserModel from '../../models/UserModel';
import dbConnect from '../../utils/db';
import getJwtToken from '../../utils/getJwtToken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        dbConnect();

        const parsedBody = JSON.parse(req.body);
        const findUser = await UserModel.findOne({ email: parsedBody.email });

        if (!findUser) {
            const { password } = parsedBody;
            const hashedPassword = await bcrypt.hash(password, 11);
            const newUser = await new UserModel({ ...parsedBody, password: hashedPassword });
            const { _id, userName } = await newUser.save();
            // jwt token
            const token = await getJwtToken({ id: _id, userName });

            // response
            res.status(200).json({
                message: 'You have successfully signup',
                token,
            });
        } else {
            res.status(400).json({
                error: 'Already have account with this email!',
            });
        }
    } else {
        res.status(500).json({
            error: 'This request not allowed',
        });
    }
}
