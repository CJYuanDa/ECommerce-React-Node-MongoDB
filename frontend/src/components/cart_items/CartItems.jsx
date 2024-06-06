import React, { useContext, useEffect, useState } from "react";
import './CartItems.css';
import { ShopContext } from "../../context/ShopContext";
import remove_icon from '../assets/cart_cross_icon.png';

function CartItems() {
    const { cartInfo, user, cartChange, getTotalCost } = useContext(ShopContext);

    async function removeFromCart(id) {
        const res = await fetch('http://localhost:4000/api/users/removeFromCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id, user })
        });
        if (!res.ok) alert('Operation Failed');
        else {
            cartChange();
        }
    }

    return(
        <div className="cartItems">
            <div className="cartItems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {Object.keys(cartInfo).length !== 0 ? (
                cartInfo.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="cartItems-format cartItems-format-main">
                                <img src={item.image} alt="" className="cartIcon-product-icon"/>
                                <p>{item.name}</p>
                                <p>${item.new_price}</p>
                                <button className="cartItems-quantity">{item.quantity}</button>
                                <p>${item.new_price * item.quantity}</p>
                                <img className='cartItems-remove-icon' src={remove_icon} onClick={() => {removeFromCart(item._id)}}alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                })
            ) : (
                null
            )}
            <div className="cartItems-down">
                <div className="cartItems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartItems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCost()}</p>
                        </div>
                        <hr />
                        <div className="cartItems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartItems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCost()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartItems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartItems-promobox">
                        <input type="text" placeholder="promo code"/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;