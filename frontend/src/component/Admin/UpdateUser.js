import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./UpdateUser.css";
import Metadata from "../layout/Metadata";
import Loading from "../layout/Loading/Loading";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getUserDetails,
  updateUserRole,
} from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import NameIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/AlternateEmail";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      window.alert(error);
      dispatch(clearErrors);
    }

    if (updateError) {
      window.alert(updateError);
      dispatch(clearErrors);
    }

    if (isUpdated) {
      window.alert("User Updated Successfully!");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUserRole(id, myForm));
  };

  return (
    <Fragment>
      <Metadata title="Update User" />
      <div className="dashboard">
        <Sidebar />

        <div className="updateUserContainer">
          {loading ? (
            <Loading />
          ) : (
            <form className="updateUserForm" onSubmit={updateUserSubmitHandler}>
              <h1>Update User</h1>

              <div>
                <NameIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <EmailIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <ArrowDropDownCircleIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="updateUserBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
