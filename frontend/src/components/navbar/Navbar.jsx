import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../assets/nav_dropdown.png';

function Navbar() {
    const [menu, setMenu] = useState('shop');
    const { user, getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    function dropdown_toggle(e) {
        menuRef.current.classList.toggle('navbar-menu-visible');
        e.target.classList.toggle('open')
    }

    async function handle_logout() {
        localStorage.removeItem('user_e-commerce');
        const res = await fetch('http://localhost:4000/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        location.assign('/');
    }

    return(
        <div className='navbar'>
            <div className="navbar-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <img src={nav_dropdown} className='navbar-dropdown' onClick={dropdown_toggle} alt="" />
            <ul ref={menuRef} className="navbar-menu">
                <li onClick={() => setMenu('shop')}><Link className='navbar-link' to='/'>Shop</Link>{menu == 'shop' ? <hr/> : <></>}</li>
                <li onClick={() => setMenu('men')}><Link className='navbar-link' to='/men'>Men</Link>{menu == 'men' ? <hr/> : <></>}</li>
                <li onClick={() => setMenu('women')}><Link className='navbar-link' to='/women'>Women</Link>{menu == 'women' ? <hr/> : <></>}</li>
                <li onClick={() => setMenu('kids')}><Link className='navbar-link' to='/kids'>Kids</Link>{menu == 'kids' ? <hr/> : <></>}</li>
            </ul>
            <div className="navbar-login-cart">
                {user ? (
                    <>
                        <button id='navbar-username'>{user}</button>
                        <button onClick={handle_logout}>Logout</button>
                    </>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="navbar-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;
