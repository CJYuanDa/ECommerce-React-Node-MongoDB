const User = require('../model/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('../model/Product');

// AGE OF COOKIE: 3 DAYS
const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    // CHECK INFORMATION
    if (!validator.isEmail(email)) return res.status(409).json({ message: 'Invalid email.' });
    if (password.length < 8) return res.status(400).json({ message: 'Minimun password is 8 characters.' });
   
    // HASH PASSWORD    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ name, email, password: hash });
        const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY);
        res.cookie('e-commerce_token', token, { httpOnly: true, maxAge });
        res.locals.user = name;
        return res.status(200).json({ message: 'success', name });
    } catch (error) {
        if (error.code == 11000) return res.status(400).json({ message: 'Invalid email.' });
        if (error.name == 'ValidationError') return res.status(400).json({ message: error.errors.name.message });
        return res.status(400).json(error);
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // CHECK EMAIL EXIST
        const user = await User.findOne({ email });

        // CHECK PASSWORD
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            const { name } = user;
            const token = jwt.sign({user_id: user._id}, process.env.SECRET_KEY);
            res.cookie('e-commerce_token', token, { httpOnly: true, maxAge });
            return res.status(200).json({ message: 'success', name });
        } else {
            throw new Error();
        }
    } catch (error) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
};

module.exports.logout = (req, res) => {
    return res.clearCookie('e-commerce_token').json({ message: 'User has logged out' });
};

module.exports.checkCart = async (req, res) => {
    try {
        const { cartData } = req.body;
        if (Object.keys(cartData).length != 0) {
            const items_id = [];
            for (let index in cartData) items_id.push(index);
            const data = await Product.find({ _id: { $in: items_id } });
            const cart_info = data.map((item) => {
                const plain_object = item.toObject();
                plain_object._id = item._id.toHexString();
                plain_object.quantity = cartData[plain_object._id];
                delete plain_object.old_price;
                delete plain_object.available;
                delete plain_object.date;
                delete plain_object.__v;
                return plain_object;
            });
            res.status(200).json(cart_info);
        } else {
            res.status(200).json({});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.addToCart = async (req, res) => {
    try {
        const { id: product_id, user_id, cartData } = req.body;
        if (cartData[product_id]) cartData[product_id] += 1;
        else cartData[product_id] = 1;
        const data = await User.findByIdAndUpdate(user_id, { cartData }, { new: true });
        if (data) return res.status(200).json({ message: 'Added to Cart' });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.removeFromCart = async (req, res) => {
    try {
        const { id: product_id, user_id, cartData } = req.body;
        cartData[product_id] -= 1;
        for (let index in cartData) {
            if (cartData[index] <= 0 || !cartData[index]) delete cartData[index];
        }
        const data = await User.findByIdAndUpdate(user_id, { cartData }, { new: true });
        if (data) return res.status(200).json({ message: 'remove From Cart' });
    } catch (error) {
        res.status(500).json(error);
    }
};