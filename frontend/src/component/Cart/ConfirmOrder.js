import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import Metadata from "../layout/Metadata";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  let navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.food_price,
    0
  );

  const shippingCharges = subtotal > 10000 ? 0 : 100;

  const taxPrice = subtotal * 0.3;

  const totalPrice = subtotal + taxPrice + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <Metadata title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmPage">
        <div>
          <div className="confirmArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.contact_no}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.fooditem}>
                    <img src={item.food_image} alt="Product" />
                    <Link to={`/Menu/fooditem/${item.fooditem}`}>
                      {item.food_name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.food_price} ={" "}
                      <b>₹{item.food_price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Your Order Summary:</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>Tax:</p>
                <span>₹{taxPrice}</span>
              </div>
            </div>

            <div className="orderTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
