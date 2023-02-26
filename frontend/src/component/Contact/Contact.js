import React, { Fragment } from "react";
import "./Contact.css";
import Metadata from "../../component/layout/Metadata";
import { Button } from "@mui/material";
import logo from "../../images/img.png";

const Contact = () => {
  return (
    <Fragment>
      <Metadata title={`Contact Us`} />
      <div className="contactContainer">
        <a className="mailBtn" href="mailto:homedelevery@gmail.com">
          <Button>Contact: homedelivery@gmail.com</Button>
        </a>
        {/* <a href="/">
          <img className="contactImage" src={logo} />
        </a> */}
      </div>
    </Fragment>
  );
};

export default Contact;
