import React from "react";
import { Link } from "react-router-dom";

const Food = ({ food }) => {
  return (
    <div>
      <Link className="foodCard" to={`/Menu/fooditem/${food._id}`}>
        <img src={food.food_images[0].url} alt="food-image" />
        <p>{food.food_name}</p>

        <div>
          <p>{food.food_description}</p>
        </div>
        <span>{`₹${food.food_price}`}</span>
      </Link>
    </div>
  );
};

export default Food;
