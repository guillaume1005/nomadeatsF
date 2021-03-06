import {
  SET_USER,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  EDIT_SMS
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  account: {},
  name: "",
  address: {},
  imageUrl: [], //maybe imageUrl is more of a string ?, before it was an array
  payment: [],
  items: [],
  tags: "",
  minOrderAmount: "",
  costForOne: "",
  cart: {},
  _id: "",
  firstName: "",
  lastName: "",
  sms: "" // adding the sms in the data received
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true, // change the authentication
        ...action.payload, // + all the objects in the payload
        loading: false,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case ADD_ITEM:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload], //update of an array in objects
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? { ...action.payload } : item
        ),
      };
    case EDIT_SMS:
      return {
        ...state,
        sms: action.payload
      }

    default:
      return state;
  }
}
