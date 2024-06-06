import React, { useEffect, useState } from 'react';
import './Popular.css';
import Items from '../items/Items.jsx';

function Popular() {
    const [data_product, setData_Product] = useState([]);
    
    useEffect(() => {
        async function fetch_data() {
            const res = await fetch('http://localhost:4000/api/products/popular_women', { method: 'GET' });
            const data = await res.json();
            setData_Product(data);
        }
        fetch_data();
    },[]);

    return(
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {data_product.map((item, i) => {
                    return (
                        <Items 
                            key={i} 
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Popular;