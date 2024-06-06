import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/breadcrums/Breadcrums';
import ProductDisplay from '../components/product_display/ProductDisplay';
import DescriptionBox from '../components/description_box/DescriptionBox';
import RelatedProducts from '../components/related_products/RelatedProducts';

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetch_data() {
            const res = await fetch(`http://localhost:4000/api/products/${productId}`, { method: 'GET' });
            const data = await res.json();
            setProduct(data)
        }
        fetch_data();
    },[productId]);

    return(
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product}/>
            <DescriptionBox />
            <RelatedProducts product={product}/>
        </div>
    )
}

export default Product;