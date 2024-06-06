import React, { useState } from "react";
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

function AddProduct() {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: ''
    });

    function image_handler(e) {
        setImage(() => e.target.files[0]);
    }

    function change_handler(e) {
        setProductDetails((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    async function add_product() {
        // UPLOAD IMAGE
        const formData = new FormData();
        formData.append('product', image);
        const img_res = await fetch('http://localhost:4000/api/upload', {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData
        });
        const img_data = await img_res.json();
        if (img_data.message != 'Upload success') {
            alert(img_data.message);
            return;
        }
        productDetails['image'] = img_data.image_url;
        // SEND TO DATABASE
        const res = await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productDetails)
        });
        const data = await res.json();
        if (data.success) {
            alert('Product Added');
            window.location.reload();
        } else {
            alert('Failed');
        }
    }

    return(
        <div className="add-product">
            <div className="add-product-item-field">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={change_handler} type="text" name='name' placeholder="Type Here" />
            </div>
            <div className="add-product-price">
                <div className="add-product-item-field">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={change_handler} type="number" name="old_price" placeholder="Type Here"/>
                </div>
                <div className="add-product-item-field">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={change_handler} type="number" name="new_price" placeholder="Type Here"/>
                </div>
            </div>
            <div className="add-product-item-field">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={change_handler} name="category" id="" className="add-product-selector">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className="add-product-item-field">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area}  className='add-product-thumbnail-img' alt="" />
                </label>
                <input type="file" name="image" id='file-input' onChange={image_handler} hidden />
            </div>
            <button className="add-product-btn" onClick={add_product}>Submit</button>
        </div>
    );
}

export default AddProduct;