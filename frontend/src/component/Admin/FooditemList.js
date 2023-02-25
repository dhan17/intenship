import React, { Fragment, useEffect } from "react";
import "./FooditemList.css";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import Loading from "../layout/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearErrors,
  getAdminFooditems,
  deleteFooditem,
} from "../../actions/foodAction";
import { DELETE_FOODITEM_RESET } from "../../constants/foodConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, fooditems, loading } = useSelector((state) => state.fooditems);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.fooditem
  );

  const deleteFooditemHandler = (id) => {
    dispatch(deleteFooditem(id));
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
      window.alert("Fooditem Deleted Successfully!");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_FOODITEM_RESET });
    }

    dispatch(getAdminFooditems());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const rows = [];

  const columns = [
    {
      field: "id",
      headerName: "Fooditem ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/fooditem/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteFooditemHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  fooditems &&
    fooditems.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.food_quantity,
        price: item.food_price,
        name: item.food_name,
      });
    });

  return (
    <Fragment>
      <Metadata title={`All Products`} />

      <div className="dashboard">
        <Sidebar />

        {loading ? (
          <Loading />
        ) : (
          <div className="fooditemsListContainer">
            <h1 id="fooditemsListHeading">All Fooditems</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="fooditemsListTable"
              autoHeight
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductList;
