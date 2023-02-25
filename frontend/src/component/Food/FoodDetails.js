import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./FoodDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getFooditemDetails } from "../../actions/foodAction.js";
import { Link, useParams } from "react-router-dom";
import Loading from "../layout/Loading/Loading";
import Metadata from "../layout/Metadata";
import { addItemsToCart } from "../../actions/cartAction";

const FooditemDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { fooditem, loading, error } = useSelector(
    (state) => state.foodDetails
  );

  //console.log(id);

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const increaseQuantity = () => {
    if (fooditem.food_quantity <= quantity) {
      window.alert("Oops! You cannot add more than that!");
      return;
    }

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    //alert("here");
    dispatch(addItemsToCart(id, quantity));
    //alert("now here");
    window.alert(`${fooditem.food_name} added to your cart!`);
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors);
    }
    dispatch(getFooditemDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title={`${fooditem.food_name}🍴`} />
          <div className="FoodDetails">
            <div>
              {fooditem.food_images &&
                fooditem.food_images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
              {/* <Carousel>
                {fooditem.food_images &&
                  fooditem.food_images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel> */}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h1>{fooditem.food_name}</h1>
                <p>Fooditem #{fooditem._id}</p>
              </div>
              <div className="detailsBlock-2">
                <h1>{`₹${fooditem.food_price}`}</h1>
                <div className="detailsBlock-2-1">
                  <div className="detailsBlock-2-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button
                    disabled={fooditem.food_quantity < 1}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:{" "}
                  <b
                    className={
                      fooditem.food_quantity < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {fooditem.food_quantity < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-3">
                Description: <p>{fooditem.food_description}</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FooditemDetails;
