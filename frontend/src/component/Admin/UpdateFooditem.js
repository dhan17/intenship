import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loading from "../layout/Loading/Loading";
import "./UpdateFooditem.css";
import Metadata from "../layout/Metadata";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateFooditem,
  getFooditemDetails,
} from "../../actions/foodAction";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_FOODITEM_RESET } from "../../constants/foodConstants";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const UpdateFooditem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.fooditem);

  const { error, fooditem } = useSelector((state) => state.foodDetails);

  const [food_name, setName] = useState("");
  const [food_price, setPrice] = useState(0);
  const [food_description, setDescription] = useState("");
  const [canteen_name, setCanteen] = useState("");
  const [food_quantity, setQuantity] = useState(0);
  const [food_images, setImages] = useState([]);
  const [oldimages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const canteen_names = ["Shanus", "Mukku"];

  const { id } = useParams();

  useEffect(() => {
    if (fooditem && fooditem._id !== id) {
      dispatch(getFooditemDetails(id));
    } else {
      setName(fooditem.food_name);
      setDescription(fooditem.food_description);
      setPrice(fooditem.food_price);
      setCanteen(fooditem.canteen_name);
      setQuantity(fooditem.food_quantity);
      setOldImages(fooditem.food_images);
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
      window.alert("Fooditem Updated Successfully!");
      navigate("/admin/fooditems");
      dispatch({ type: UPDATE_FOODITEM_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, id, fooditem, updateError]);

  const updateFooditemSubmitHandler = (e) => {
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

    dispatch(updateFooditem(id, myForm));
  };

  const updateFooditemImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <Metadata title="Update Fooditem" />
      <div className="dashboard">
        <Sidebar />

        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="newFooditemContainer">
              <form
                className="updateFooditemForm"
                encType="multipart/form-data"
                onSubmit={updateFooditemSubmitHandler}
              >
                <h1>Update Fooditem</h1>

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
                    value={food_price}
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
                  <select
                    value={canteen_name}
                    onChange={(e) => setCanteen(e.target.value)}
                  >
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
                    value={food_quantity}
                  />
                </div>

                <div id="updateFooditemFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    multiple
                    onChange={updateFooditemImageChange}
                  />
                </div>

                <div id="updateFooditemFormImage">
                  {oldimages &&
                    oldimages.map((food_images, index) => (
                      <img
                        key={index}
                        src={food_images.url}
                        alt="Old Fooditem Preview"
                      />
                    ))}
                </div>

                <div id="updateFooditemFormImage">
                  {imagesPreview.map((food_images, index) => (
                    <img key={index} src={food_images} alt="Fooditem Preview" />
                  ))}
                </div>

                <Button
                  id="updateFooditemBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Update
                </Button>
              </form>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateFooditem;
