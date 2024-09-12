import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);
    const [curState, setCurState] = useState("Login");
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => {
            return {
                ...data,
                [name]: value
            }
        })
    };

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (curState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        console.log(newUrl);

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    }

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => document.body.classList.remove('no-scroll');
    }, []);

    const handleOutsideClick = (e) => {
        if (e.target.className === 'login-popup') {
            setShowLogin(false);
        }
    }

    return (
        <div className='login-popup' onClick={handleOutsideClick}>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curState}</h2>
                    <div
                        className='closeModel'
                        onClick={() => setShowLogin(false)}
                    >
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <div className="login-popup-inputs">
                    {curState === "Login"
                        ? <></>
                        : <input
                            type="text"
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder='Your name'
                            required
                        />
                    }
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your mail'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <button type='submit'>
                    {curState === "Sign Up"
                        ? "Create account"
                        : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {curState === "Login"
                    ? <p>
                        Create a new account?
                        <span onClick={() => setCurState("Sign Up")}>Click here</span>
                    </p>
                    : <p>
                        Already have an account?
                        <span onClick={() => setCurState("Login")}>Login here</span>
                    </p>
                }
            </form>
        </div>
    )
}

export default LoginPopup