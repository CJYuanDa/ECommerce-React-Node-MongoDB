import React, { useState } from 'react';
import './css/LoginSignup.css';

function LoginSignup() {
    const [state, setState] = useState('Login');
    const [information, setInformation] = useState({});
    const [error, setError] = useState('');

    function handle_change(e) {
        setInformation((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    async function handle_submit() {
        if (state == 'Login') {
            const res = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(information),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.message == 'success') {
                localStorage.setItem('user_e-commerce', data.name);
                location.assign('/');
            } else {
                console.log(data);
                setError(data.message);
            }
        } else {
            const res = await fetch('http://localhost:4000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(information),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.message == 'success') {
                localStorage.setItem('user_e-commerce', data.name);
                location.assign('/');
            } else {
                setError(data.message);
            }
        }
    }

    return(
        <div className='loginSignup'>
            <div className="loginSignup-container">
                <h1>{state}</h1>
                <div className="loginSignup-fields">
                    {state == 'Sign Up' ? <input name='name' type="text" placeholder='Your Name' onChange={handle_change}/> : <></>}
                    <input name='email' type="email" placeholder='Email Address' onChange={handle_change}/>
                    <input name='password' type="password" placeholder='Password' onChange={handle_change}/>
                </div>
                <button onClick={handle_submit} >Continue</button>
                {error && <p className='error-message'>{error}</p>}
                {state == 'Sign Up' ? (
                    <p className="loginSignup-login">Already have an account? <span onClick={() => setState('Login')}>Login here</span></p>
                ) : (
                <p className="loginSignup-login">Creat an account? <span onClick={() => setState('Sign Up')}>Click here</span></p>
                )}
                <div className="loginSignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>

        </div>
    )
}

export default LoginSignup;