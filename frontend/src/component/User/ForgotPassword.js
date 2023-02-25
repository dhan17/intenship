import React, { Fragment, useState, useEffect } from "react";
import Loading from "../layout/Loading/Loading";
import Metadata from "../layout/Metadata";
import "./ForgotPassword.css";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (message) {
      window.alert(message);
      navigate("/login");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title="Forgot Password 🛠️" />
          <div className="ForgotPasswordContainer">
            <div className="ForgotPasswordBox">
              <h2>Forgot Password</h2>
              <form className="Updateform" onSubmit={forgotPasswordSubmit}>
                <div className="ForgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="mail"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="ForgotPasswordButton"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
