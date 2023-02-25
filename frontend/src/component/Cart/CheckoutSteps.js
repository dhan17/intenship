import React, { Fragment } from "react";
import "./CheckoutSteps.css";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import ConfirmIcon from "@mui/icons-material/ConfirmationNumber";
import PaymentIcon from "@mui/icons-material/AddCard";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <ShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <ConfirmIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <PaymentIcon />,
    },
  ];

  const stepsStyle = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepsStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            activeStep={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{ color: activeStep >= index ? "tomato" : "gray" }}
              icon={item.icon}
            >
              {" "}
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
