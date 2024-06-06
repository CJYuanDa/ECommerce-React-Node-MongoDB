const express = require('express');
const router = express.Router();
const { 
    get_products,
    get_product,
    post_product,
    delete_product,
    get_new_collections,
    get_popular_women,
    get_related 
} = require('../controllers/products.js');

router.get('/new_collections', get_new_collections);
router.get('/popular_women', get_popular_women);
router.get('/related/:id', get_related);
router.get('/:id', get_product);
router.get('/', get_products);
router.post('/', post_product);
router.delete('/', delete_product);

module.exports = router;