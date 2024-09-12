import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <h2 className="logo">Food</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ex dolorum aliquid, harum ducimus nobis omnis quam, autem accusantium eos voluptatem facilis magnam architecto itaque fuga perferendis</p>
                    <div className="footer-social-icons">
                        <i class="fa-brands fa-tiktok"></i>
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>0376 348 456</li>
                        <li>contact@food.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2024 &copy; Food.com - All Right Reserved.
            </p>
        </div>
    )
}

export default Footer