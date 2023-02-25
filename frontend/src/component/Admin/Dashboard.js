import { Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import Loading from "../layout/Loading/Loading";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Metadata from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getAdminFooditems } from "../../actions/foodAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { fooditems, loading } = useSelector((state) => state.fooditems);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  fooditems &&
    fooditems.forEach((item) => {
      if (item.food_quantity === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAdminFooditems());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(255, 220, 225)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["red", "green"],
        hoverBackgroundColor: ["rgb(252, 159, 159)", "rgb(99, 214, 99)"],
        data: [outOfStock, fooditems.length - outOfStock],
      },
    ],
  };

  return (
    <Fragment>
      <Metadata title="Admin Dashboard" />

      <div className="dashboard">
        <Sidebar />

        {loading ? (
          <Loading />
        ) : (
          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount
                  <br />₹{totalAmount}
                </p>
              </div>

              <div className="dashboardSummary-2">
                <Link to="/admin/fooditems">
                  <p>Fooditems</p>
                  <p>{fooditems && fooditems.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{users && users.length}</p>
                </Link>
              </div>
            </div>

            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
