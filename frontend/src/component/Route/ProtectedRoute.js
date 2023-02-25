import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../layout/Loading/Loading";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {loading === false &&
            (isAuthenticated === false ? (
              <Navigate to="/login" />
            ) : isAdmin ? (
              user.role !== "admin" ? (
                <Navigate to="/login" />
              ) : (
                children
              )
            ) : (
              children
            ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
