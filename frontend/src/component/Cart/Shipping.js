import React, { Fragment, useState } from "react";
import "./Shipping.css";
import Metadata from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/HomeWork";
import CityIcon from "@mui/icons-material/LocationCity";
import CountryIcon from "@mui/icons-material/Public";
import StateIcon from "@mui/icons-material/Domain";
import PinIcon from "@mui/icons-material/PinDrop";
import CallIcon from "@mui/icons-material/Call";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { saveShippingInfo } from "../../actions/cartAction";

const Shipping = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [contact_no, setContactNo] = useState(shippingInfo.contact_no);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (contact_no.length < 10 || contact_no.length > 10) {
      window.alert("Please enter a valid Phone Number!");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, contact_no })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <Metadata title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <CityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <CallIcon />
              <input
                type="number"
                placeholder="Contact No."
                required
                value={contact_no}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>

            <div>
              <CountryIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <StateIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
