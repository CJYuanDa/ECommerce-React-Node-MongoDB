import React from "react";
import './Admin.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { Routes, Route } from 'react-router-dom';
import AddProduct from "../../components/add_product/AddProduct";
import ListProduct from "../../components/list_product/ListProduct";

function Admin() {
    return(
        <div className="admin">
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<AddProduct />}/>
                <Route path='/listproduct' element={<ListProduct />}/>
            </Routes>
        </div>
    );
}

export default Admin;