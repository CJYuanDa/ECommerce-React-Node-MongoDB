import React, { useEffect, useState } from "react";
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

function ListProduct() {
    const [allProducts, setAllProducts] = useState([]);

    async function fetchInfo() {
        const res = await fetch('http://localhost:4000/api/products');
        const data = await res.json();
        setAllProducts(data);
    } 

    useEffect(() => {
        fetchInfo();
    },[]);

    async function remove_product(id) {
        const res = await fetch('http://localhost:4000/api/products', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        console.log(data.message);
        fetchInfo();
    }

    return(
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="list-product-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="list-product-all-products">
                <hr />
                {allProducts.map((product, index) => {
                    return(
                        <React.Fragment key={index}>
                            <div className="list-product-format-main list-product-format">
                                <img src={product.image} alt="" className="list-product-product-icon" />
                                <p>{product.name}</p>
                                <p>${product.old_price}</p>
                                <p>${product.new_price}</p>
                                <p>{product.category}</p>
                                <img onClick={() => remove_product(product._id)} src={cross_icon} alt="" className="list-product-remove-icon" />
                            </div>
                            <hr />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default ListProduct;