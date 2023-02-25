import React from 'react';
import "./CartitemCard.css";
import {Link} from "react-router-dom";

const CartitemCard = ({item, deleteCartItem}) => {
  return (
    <div className='cartitemCard'>
        <img src={item.food_image} alt="food-image" />
        <div>
            <Link to={`/Menu/fooditem/${item.fooditem}`}>{item.food_name}</Link>
            <span>{`Price: ₹${item.food_price}`}</span>
            <p onClick={() => deleteCartItem(item.fooditem)}>Remove</p>
        </div>
    </div>
  )
}

export default CartitemCard;