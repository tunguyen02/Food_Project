import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={url + "/images/" + image} alt="" className="food-item-image" />
                {!cartItems[id]
                    ? <div className='add' onClick={() => addToCart(id)}>+</div>
                    : <div className="food-item-counter">
                        <div className='setMinus' onClick={() => removeFromCart(id)}>-</div>
                        <p>{cartItems[id]}</p>
                        <div className='setAdd' onClick={() => addToCart(id)}>+</div>
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem