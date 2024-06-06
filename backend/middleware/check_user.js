const jwt = require('jsonwebtoken');
const User = require('../model/User.js');

module.exports.check_user = async (req, res, next) => {
    const user_name = req.body.user;
    const token = req.cookies['e-commerce_token'];
    if (!user_name || !token) return res.status(400).json('Unauthorized');
    try {
        const { user_id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: user_id });
        if (user_name == user.name) {
            req.body.user_id = user.id;
            if (user.cartData) req.body.cartData = user.cartData;
            else req.body.cartData = {};
            return next();
        }
        res.status(400).json('Unauthorized');
    } catch (error) {
        res.status(400).json('Unauthorized');
    }
}