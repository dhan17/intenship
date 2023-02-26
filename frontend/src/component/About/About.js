import React, { Fragment } from "react";
import "./About.css";
import Metadata from "../../component/layout/Metadata";

const About = () => {
  return (
    <Fragment>
      <Metadata title={`About Us`} />
      <div className="aboutPage">
        <div className="aboutContainer">
          <h1 className="aboutHeading">About Us</h1>
          <p>
            <span>Home Delivery</span> is a food ordering website that allows
            users to surf the menu and choose the fooditems of their choice and
            place orders.
            <br />
            Now you can <b>skip the long queues</b> and order food with just a few
            clicks.
            <br />
            Once you place the order, its time to sit back and relax! The admin
            updates the order status for you to <b>track in real-time</b> and grab your
            order at the earliest.
          </p>
          <div>
            <span>Made with ❤️</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
