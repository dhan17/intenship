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

export const fooditemsReducer = (state = { fooditems: [] }, action) => {
  switch (action.type) {
    case ALL_FOODITEM_REQUEST:
    case ADMIN_FOODITEM_REQUEST:
      return {
        loading: true,
        fooditems: [],
      };
    case ALL_FOODITEM_SUCCESS:
      return {
        loading: false,
        fooditems: action.payload.fooditems,
        fooditemCount: action.payload.fooditemCount,
        resultsPerPage: action.payload.resultsPerPage,
        filteredFooditemsCount: action.payload.filteredFooditemsCount,
      };

    case ADMIN_FOODITEM_SUCCESS:
      return {
        loading: false,
        fooditems: action.payload,
      };

    case ALL_FOODITEM_FAIL:
    case ADMIN_FOODITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const foodDetailsReducer = (state = { fooditem: {} }, action) => {
  switch (action.type) {
    case FOODITEM_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case FOODITEM_DETAILS_SUCCESS:
      return {
        loading: false,
        fooditem: action.payload,
      };

    case FOODITEM_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newFooditemReducer = (state = { fooditem: {} }, action) => {
  switch (action.type) {
    case NEW_FOODITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_FOODITEM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        fooditem: action.payload.fooditem,
      };

    case NEW_FOODITEM_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_FOODITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const fooditemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FOODITEM_REQUEST:
    case UPDATE_FOODITEM_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case DELETE_FOODITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_FOODITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_FOODITEM_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_FOODITEM_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_FOODITEM_FAIL:
    case UPDATE_FOODITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
