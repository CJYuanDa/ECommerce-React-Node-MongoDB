const Product = require('../model/Product.js');

// GET: ALL PRODUCTS
module.exports.get_products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message});
    }
};

// GET: ONE PRODUCT
module.exports.get_product = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message});
    }
};

// GET: RELATED PRODUCTS
module.exports.get_related = async (req, res) => {
    try {
        const category = req.params.id;
        const products = await Product.find({ category }).limit(4);
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message});
    }
}

// GET: NEW COLLECTIONS
module.exports.get_new_collections = async (req, res) => {
    try {
        const new_collections = await Product.find().sort({ date: -1 }).limit(8).exec();
        res.status(200).json(new_collections);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// GET: POPULAR WOMEN
module.exports.get_popular_women = async (req, res) => {
    try {
        const women = await Product.find({ category: 'women' }).limit(4);
        res.status(200).json(women)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

// POST: ADD PRODUCT
module.exports.post_product = async (req, res) => {
    try {
        const { name, image, category, new_price, old_price } = req.body;
        const product = await Product.create({ name, image, category, new_price, old_price });
        res.status(200).json({ success: true, id: product._id, name });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message});
    }
};

// DELETE: DELETE PRODUCT
module.exports.delete_product = async(req, res) => {
    try {
        const { id } = req.body;
        const result = await Product.findByIdAndDelete({_id: id});
        if (result) return res.status(200).json({ message: 'Product has been deleted.'});
        throw new Error('Invalid ID')
    } catch (error) {
        return res.status(400).json({ message: `${error}` });
    }
}