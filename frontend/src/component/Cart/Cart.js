import React, { Fragment } from "react";
import "./Cart.css";
import CartitemCard from "./CartitemCard.js";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeFromCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  // const item = {
  //   fooditem: "6258fd3b3b1185d875ab29ee",
  //   food_price: 50,
  //   food_name: "Noodles",
  //   food_quantity: 2,
  //   food_image: "https://picsum.photos/200",
  // };

  const increaseQuantity = (id, quantity, food_quantity) => {
    const qty = quantity + 1;

    if (food_quantity <= quantity) {
      window.alert("Not enough stock!");
      return;
    }

    dispatch(addItemsToCart(id, qty));
  };

  const decreaseQuantity = (id, quantity) => {
    const qty = quantity - 1;

    if (quantity <= 1) {
      return;
    }

    dispatch(addItemsToCart(id, qty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="empty">
          <RemoveShoppingCartIcon/>
          <Typography>Your Cart Is Empty</Typography>
          <Link to="/Menu" className="add-items">Add Items To Your Cart!</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Food Items</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.fooditem}>
                  <CartitemCard item={item} deleteCartItem={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.fooditem, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input readOnly type="number" value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.fooditem,
                          item.quantity,
                          item.food_quantity
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.food_price * item.quantity
                  }`}</p>
                </div>
              ))}

            {/* <div className="cartContainer">
          <CartitemCard item={item} />
          <div className="cartInput">
            <button>-</button>
            <input readOnly type="number" value={item.food_quantity} />
            <button>+</button>
          </div>
          <p className="cartSubtotal">{`₹${
            item.food_price * item.food_quantity
          }`}</p>
        </div> */}

            <div className="total">
              <div></div>
              <div className="totalBox">
                <p>Total Amount</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.food_price, 0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkoutBtn">
                <button onClick={checkoutHandler}>Checkout!</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
