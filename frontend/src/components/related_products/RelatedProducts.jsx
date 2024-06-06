import React, { useEffect, useState } from "react";
import './RelatedProducts.css';
import Items from "../items/Items.jsx";

function RelatedProducts(props) {
    const { product } = props;
    const [related, setRelated] = useState([]);

    useEffect(() => {
        async function fetch_data() {
            const res = await fetch(`http://localhost:4000/api/products/related/${product.category}`, { method: 'GET' });
            const data = await res.json();
            setRelated(data);
        }
        fetch_data();
    },[product])

    return(
        <div className="relatedProducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedProducts-item">
                {related.map((item, index) => {
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

export default RelatedProducts;