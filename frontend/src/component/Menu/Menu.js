import React, { Fragment, useEffect, useState } from "react";
import "./Menu.css";
import FoodCard from "../Home/Food.js";
import { getFooditem } from "../../actions/foodAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../layout/Loading/Loading";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Slider } from "@material-ui/core";
import Metadata from "../../component/layout/Metadata";

const canteens = ["Shanus", "Mukku","New Star"];

const Menu = (props) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [food_price, setPrice] = useState([0, 10000]);

  const [canteen_name, setCanteen] = useState("");

  const {
    loading,
    error,
    fooditems,
    fooditemCount,
    resultsPerPage,
    filteredFooditemsCount,
  } = useSelector((state) => state.fooditems);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getFooditem(keyword, currentPage, food_price, canteen_name));
  }, [dispatch, keyword, currentPage, food_price, canteen_name]);

  let count = filteredFooditemsCount;

  // const food = {
  //   food_name: "Noodles",
  //   food_images: [{ url: "https://picsum.photos/seed/picsum/200/300" }],
  //   food_description: "This is one of the best.",
  //   food_price: "200",
  //   _id: "noodle123",
  // };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title="Menu"/>
          <h2 className="heading">Menu</h2>

          <div className="container" id="container">
            {/* <FoodCard food={food} />
        <FoodCard food={food} />
        <FoodCard food={food} />
        <FoodCard food={food} />

        <FoodCard food={food} />
        <FoodCard food={food} />
        <FoodCard food={food} />
        <FoodCard food={food} /> */}
            {fooditems &&
              fooditems.map((fooditem) => (
                <FoodCard food={fooditem} key={fooditem._id} />
              ))}
          </div>

          <div className="filter">
            <Typography>Price</Typography>
            <Slider
              value={food_price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10000}
            />

            <Typography>Canteens</Typography>
            <ul className="canteens">
              {canteens.map((canteen_name) => (
                <li
                  className="canteen-link"
                  key={canteen_name}
                  onClick={() => setCanteen(canteen_name)}
                >
                  {canteen_name}
                </li>
              ))}
            </ul>
          </div>

          {resultsPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={fooditemCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Menu;
