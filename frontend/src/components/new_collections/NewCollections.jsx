import React, { useContext, useEffect, useState } from 'react';
import './NewCollections.css';
import Items from '../items/Items.jsx';

function NewCollections() {
    const [new_collections, setNew_Collections] = useState([]);

    useEffect(() => {
        async function fetch_data() {
            const res = await fetch('http://localhost:4000/api/products/new_collections', { method: 'GET' });
            const data = await res.json();
            setNew_Collections(data);
        }
        fetch_data();
    },[]);

    return(
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collections.map((item, index) => {
                    return (
                        <Items
                            key={index} 
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

export default NewCollections;