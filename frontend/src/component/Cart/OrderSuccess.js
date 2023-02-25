import React, { Fragment } from 'react';
import "./OrderSuccess.css";
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';

const OrderSuccess = () => {
  return (
    <Fragment>
        <div className='orderSuccess'>
            <CheckCircleIcon/>
            <Typography>Your order has been placed successfully!</Typography>

            <Link to="/orders">View Orders</Link>
        </div>
    </Fragment>
  )
}

export default OrderSuccess;