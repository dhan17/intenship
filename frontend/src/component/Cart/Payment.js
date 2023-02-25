import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Payment.css";
import Metadata from "../layout/Metadata";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { Typography } from "@mui/material";
import CardIcon from "@mui/icons-material/CreditCard";
import ExpiryDateIcon from "@mui/icons-material/CalendarMonth";
import KeyIcon from "@mui/icons-material/Key";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearErrors, createOrder } from "../../actions/orderAction";

const Payment = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const stripe = useStripe();

  const elements = useElements();

  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const { error } = useSelector((state) => state.newOrder);

  // const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    items: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/process/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        window.alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            pay_id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          window.alert("There occurred a problem while processing payment!");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <Metadata title="Payment 💰" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <ExpiryDateIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <KeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
