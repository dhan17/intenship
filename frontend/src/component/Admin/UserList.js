import React, { Fragment, useEffect } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import Loading from "../layout/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser, clearErrors, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users, loading } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      window.alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      window.alert(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, navigate, message]);

  const rows = [];

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        name: item.name,
        email: item.email,
      });
    });

  return (
    <Fragment>
      <Metadata title={`All Users`} />

      <div className="dashboard">
        <Sidebar />

        {loading ? (
          <Loading />
        ) : (
          <div className="userListContainer">
            <h1 id="userListHeading">All Users</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="userListTable"
              autoHeight
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserList;
