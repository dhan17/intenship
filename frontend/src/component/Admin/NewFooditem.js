import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loading from "../layout/Loading/Loading";
import "./NewFooditem.css";
import Metadata from "../layout/Metadata";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createFooditem } from "../../actions/foodAction";
import { useNavigate } from "react-router-dom";
import { NEW_FOODITEM_RESET } from "../../constants/foodConstants";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const NewFooditem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newFooditem);

  const [food_name, setName] = useState("");
  const [food_price, setPrice] = useState(0);
  const [food_description, setDescription] = useState("");
  const [canteen_name, setCanteen] = useState("");
  const [food_quantity, setQuantity] = useState(0);
  const [food_images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const canteen_names = ["Shanus", "Mukku"];

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors);
    }

    if (success) {
      window.alert("Fooditem Created Successfully!");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_FOODITEM_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const createFooditemSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("food_name", food_name);
    myForm.set("food_price", food_price);
    myForm.set("food_description", food_description);
    myForm.set("canteen_name", canteen_name);
    myForm.set("food_quantity", food_quantity);

    food_images.forEach((image) => {
      myForm.append("food_images", image);
    });

    dispatch(createFooditem(myForm));
  };

  const createFooditemImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <Metadata title="Add New Fooditem" />
      <div className="dashboard">
        <Sidebar />

        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="newFooditemContainer">
              <form
                className="createFooditemForm"
                encType="multipart/form-data"
                onSubmit={createFooditemSubmitHandler}
              >
                <h1>Create Fooditem</h1>

                <div>
                  <MenuBookIcon />
                  <input
                    type="text"
                    placeholder="Fooditem Name"
                    required
                    value={food_name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <CurrencyRupeeIcon />
                  <input
                    type="number"
                    placeholder="Fooditem Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <DescriptionIcon />
                  <input
                    type="text"
                    placeholder="Fooditem Description"
                    required
                    value={food_description}
                    cols="30"
                    rows="1"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <ArrowDropDownCircleIcon />
                  <select onChange={(e) => setCanteen(e.target.value)}>
                    <option value="">Choose Canteen</option>
                    {canteen_names.map((canteen) => (
                      <option key={canteen} value={canteen}>
                        {canteen}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <ProductionQuantityLimitsIcon />
                  <input
                    type="number"
                    placeholder="Fooditem Quantity"
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div id="createFooditemFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    multiple
                    onChange={createFooditemImageChange}
                  />
                </div>

                <div id="createFooditemFormImage">
                  {imagesPreview.map((food_images, index) => (
                    <img key={index} src={food_images} alt="Fooditem Preview" />
                  ))}
                </div>

                <Button
                  id="createFooditemBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Create
                </Button>
              </form>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default NewFooditem;
