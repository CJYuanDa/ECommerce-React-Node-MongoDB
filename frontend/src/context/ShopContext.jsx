import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_product, setAll_Prodcut] = useState([]);
    const [cart_trigger, setCart_Trigger] = useState(true);
    const [cartInfo, setCartInfo] = useState([]);
    const user = localStorage.getItem('user_e-commerce');

    useEffect(() => {
        async function fetch_products() {
            const res = await fetch('http://localhost:4000/api/products', { method: 'GET' });
            const data = await res.json();
            setAll_Prodcut(data);
        }
        fetch_products();
    },[]);
    
    if (user) {
        useEffect(() => {
            async function fetch_cart() {
                const res = await fetch('http://localhost:4000/api/users/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user }),
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setCartInfo(data);
                }
            }
            fetch_cart();
        },[cart_trigger])
    }


    function cartChange() {
        setCart_Trigger((prev) => prev ? false : true);
    }

    function getTotalCartItems() {
        let total_item = 0;
        if (Object.keys(cartInfo).length !== 0) {
            for (let item of cartInfo) {
                total_item += item.quantity;
            }
        }
        return total_item;
    }

    function getTotalCost() {
        let total_cost = 0;
        if (Object.keys(cartInfo).length !== 0) {
            for (let item of cartInfo) {
                total_cost += item.quantity * item.new_price;
            }
        }
        return total_cost
    }

    const contextValue = { all_product, user, cart_trigger, cartInfo, cartChange, getTotalCartItems, getTotalCost };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;