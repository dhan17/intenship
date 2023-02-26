import React, { Fragment } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import CarouselPart from "./Carousel/Carousel";
import Metadata from "../layout/Metadata";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PaymentsIcon from "@mui/icons-material/Payments";

const Home = () => {
  return (
    <Fragment>
      <Metadata title="Home Delivery" />

      <CarouselPart />

      <div className="menu">
        <Link to="/Menu" className="menu-btn">
          Menu
        </Link>
      </div>

      <h2 className="heading">Our Services</h2>
      <div className="services">
        <div>
          <CheckCircleOutlineIcon />
          <h3>Easy To Use</h3>
          <p>User-friendly interface with no complex features</p>
        </div>
        <div>
          <FastForwardIcon />
          <h3>Track Your Orders</h3>
          <p>Once your order is placed you can track your orders at each step</p>
        </div>
        <div>
          <PaymentsIcon />
          <h3>Pay Digitally</h3>
          <p>
            Allows you to pay digitally and experience seamless transactions
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
