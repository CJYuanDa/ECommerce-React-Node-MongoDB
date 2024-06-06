import React, { useContext, useEffect } from "react";
import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from "../../context/ShopContext";


function ProductDisplay(props) {
    const { product } = props;
    const { cartChange, user } = useContext(ShopContext);
    
    async function handle_click() {
        if (!user) return location.assign('/login');
        const res = await fetch('http://localhost:4000/api/users/addToCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: product._id, user }),
            credentials: 'include'
        });
        if (res.ok) {
            cartChange();
            return alert('Add to Cart');
        }
        else return alert('Failed to Add');
    }

    return (
        <div className="productDisplay">
            <div className="productDisplay-left">
                <div className="productDisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productDisplay-img">
                    <img className='productDisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productDisplay-right">
                <h1>{product.name}</h1>
                <div className="productDisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productDisplay-right-prices">
                    <div className="productDisplay-right-price-old">${product.old_price}</div>
                    <div className="productDisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productDisplay-right-description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium neque voluptas id delectus odit voluptatem ipsa illum aliquam est debitis iste harum, animi nam cumque, adipisci minus quaerat vitae incidunt.
                </div>
                <div className="productDisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productDisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={handle_click}>ADD TO CART</button>
                <p className="productDisplay-right-category"><span>Category: </span>Women, T-Shirt, Crop Top</p>
                <p className="productDisplay-right-category"><span>Tags: </span>Modern, Latest</p>
            </div>
        </div>
    );
}

export default ProductDisplay;