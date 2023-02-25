import axios from "axios";
import {
  ALL_FOODITEM_REQUEST,
  ALL_FOODITEM_SUCCESS,
  ALL_FOODITEM_FAIL,
  FOODITEM_DETAILS_REQUEST,
  FOODITEM_DETAILS_SUCCESS,
  FOODITEM_DETAILS_FAIL,
  ADMIN_FOODITEM_REQUEST,
  ADMIN_FOODITEM_SUCCESS,
  ADMIN_FOODITEM_FAIL,
  NEW_FOODITEM_REQUEST,
  NEW_FOODITEM_SUCCESS,
  NEW_FOODITEM_RESET,
  NEW_FOODITEM_FAIL,
  DELETE_FOODITEM_REQUEST,
  DELETE_FOODITEM_SUCCESS,
  DELETE_FOODITEM_RESET,
  DELETE_FOODITEM_FAIL,
  UPDATE_FOODITEM_REQUEST,
  UPDATE_FOODITEM_SUCCESS,
  UPDATE_FOODITEM_RESET,
  UPDATE_FOODITEM_FAIL,
  CLEAR_ERRORS,
} from "../constants/foodConstants";

export const getFooditem =
  (keyword = "", currentPage = 1, food_price = [0, 10000], canteen_name) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_FOODITEM_REQUEST,
      });

      let link = `/api/v1/fooditems?keyword=${keyword}&page=${currentPage}&food_price[gte]=${food_price[0]}&food_price[lte]=${food_price[1]}`;

      if (canteen_name) {
        link = `/api/v1/fooditems?keyword=${keyword}&page=${currentPage}&food_price[gte]=${food_price[0]}&food_price[lte]=${food_price[1]}&canteen_name=${canteen_name}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_FOODITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_FOODITEM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAdminFooditems = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_FOODITEM_REQUEST });

    const { data } = await axios.get("/api/v1/admin/fooditems");

    dispatch({
      type: ADMIN_FOODITEM_SUCCESS,
      payload: data.fooditems,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FOODITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createFooditem = (fooditemData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_FOODITEM_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/v1/admin/fooditem/new",
      fooditemData,
      config
    );

    dispatch({
      type: NEW_FOODITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_FOODITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteFooditem = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FOODITEM_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/fooditem/${id}`);

    dispatch({
      type: DELETE_FOODITEM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FOODITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateFooditem = (id, fooditemData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FOODITEM_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/fooditem/${id}`,
      fooditemData,
      config
    );

    dispatch({
      type: UPDATE_FOODITEM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FOODITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getFooditemDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FOODITEM_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/Menu/fooditem/${id}`);

    dispatch({
      type: FOODITEM_DETAILS_SUCCESS,
      payload: data.fooditem,
    });
  } catch (error) {
    dispatch({
      type: FOODITEM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
