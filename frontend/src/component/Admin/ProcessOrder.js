import React, { Fragment, useEffect, useState } from "react";
import "./ProcessOrder.css";
import Metadata from "../layout/Metadata";
import Loading from "../layout/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const { id } = useParams();

  const processOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("orderStatus", orderStatus);

    dispatch(updateOrder(id, myForm));
  };

  const [orderStatus, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      window.alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      window.alert("Order Status Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError, navigate]);

  return (
    <Fragment>
      <Metadata title="Update Order Status" />

      <div className="dashboard">
        <Sidebar />

        <div className="newFooditemContainer">
          <Fragment>
            {loading ? (
              <Loading />
            ) : (
              <Fragment>
                <div className="confirmPage">
                  <div className="confirmSidecontainer">
                    <div className="confirmArea">
                      <Typography>Shipping Info</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <p>Name:</p>
                          <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                          <p>Phone:</p>
                          <span>
                            {order.shippingInfo &&
                              order.shippingInfo.contact_no}
                          </span>
                        </div>
                        <div>
                          <p>Address:</p>
                          <span>
                            {order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                          </span>
                        </div>
                      </div>

                      <Typography>Payment</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <b>
                            <p
                              className={
                                order.paymentInfo &&
                                order.paymentInfo.status === "succeeded"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              {order.paymentInfo &&
                              order.paymentInfo.status === "succeeded"
                                ? "PAID"
                                : "NOT PAID"}
                            </p>
                          </b>
                        </div>

                        <div>
                          <p>Amount:</p>
                          <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                      </div>

                      <Typography>Order Status</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <b>
                            <p
                              className={
                                order.orderStatus &&
                                order.orderStatus === "Delivered"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              {order.orderStatus && order.orderStatus}
                            </p>
                          </b>
                        </div>
                      </div>
                    </div>

                    <div className="confirmCartItems">
                      <Typography>Cart Items:</Typography>
                      <div className="confirmCartItemsContainer">
                        {order.items &&
                          order.items.map((item) => (
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
                    <form
                      className="updateOrderForm"
                      onSubmit={processOrderSubmitHandler}
                    >
                      <h1>Process Order</h1>

                      <div>
                        <ArrowDropDownCircleIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Choose Category</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>

                      <Button
                        id="updateStatusBtn"
                        type="submit"
                        disabled={
                          loading
                            ? true
                            : false || orderStatus === ""
                            ? true
                            : false
                        }
                      >
                        Update
                      </Button>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
