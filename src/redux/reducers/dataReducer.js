import {
  SET_RESTAURANTS,
  LOADING_DATA,
  SET_RESTAURANT,
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  SET_CART,
  DELETE_ITEM_CART,
  SET_ORDERS,
  EDIT_STATUS,
} from "../types";

const initialState = {
  restaurants: {
    "restaurants": [
      {
        "address": {
          "street": "Aristide Briand",
          "zip": "92300",
          "phoneNo": 689615405,
          "locality": "Levallois-Perret",
          "aptName": "94",
          "lat": 48.8933839,
          "lng": 2.2907461
        },
        "imageUrl": [
          "images/fivepizz-1615817699862.png"
        ],
        "payment": [
          "Cash,",
          "Carte",
          "de",
          "Crédit"
        ],
        "items": [
          "604f6c2669c78caf78528024",
          "604f6c2969c78caf78528028",
          "604f6c2c69c78caf7852802a",
          "604f6c2e69c78caf7852802c",
          "604f6c2f69c78caf7852802e",
          "604f6c3569c78caf78528030",
          "604f6c3769c78caf78528032",
          "604f6c3c69c78caf78528034",
          "604f6c4069c78caf78528036",
          "604f6c4269c78caf78528038",
          "604f6c4469c78caf7852803b",
          "604f6c4669c78caf7852803d",
          "604f6c4969c78caf7852803f",
          "604f6c4d69c78caf78528041",
          "604f6c4f69c78caf78528043",
          "604f6c5169c78caf78528045",
          "604f6c5369c78caf78528047",
          "604f6c5569c78caf78528049",
          "604f6c5769c78caf7852804b",
          "604f6c5969c78caf7852804d",
          "604f6c5a69c78caf7852804f",
          "604f6c5d69c78caf78528051",
          "604f6c5e69c78caf78528053",
          "604f6c6069c78caf78528055",
          "604f6c6269c78caf78528057",
          "604f6c6469c78caf78528059",
          "604f6c6669c78caf7852805b",
          "604f6c6969c78caf7852805d",
          "604f6c6b69c78caf7852805f",
          "604f6c6c69c78caf78528061",
          "604f6c6f69c78caf78528063",
          "604f6c7069c78caf78528065",
          "604f6c7469c78caf78528067",
          "604f6c7569c78caf78528069",
          "604f6c7969c78caf7852806b",
          "604f6c7b69c78caf7852806d",
          "604f6c7d69c78caf7852806f",
          "604f6c7e69c78caf78528071",
          "604f6c8369c78caf78528073",
          "604f6c8469c78caf78528074",
          "604f6c8669c78caf78528075",
          "604f6c8a69c78caf78528076",
          "604f6c8e69c78caf78528077",
          "604f6c8f69c78caf78528078",
          "604f6c9169c78caf78528079",
          "604f6c9369c78caf7852807a",
          "604f6c9669c78caf7852807b",
          "604f6c9869c78caf7852807d",
          "604f6c9969c78caf7852807f",
          "604f6c9b69c78caf78528081",
          "604f6c9d69c78caf78528083",
          "604f6c9e69c78caf78528085",
          "604f6ca269c78caf78528087",
          "604f6ca469c78caf78528088",
          "604f6ca669c78caf78528089",
          "604f6ca769c78caf7852808a",
          "604f6ca969c78caf7852808c",
          "604f6cab69c78caf7852808e",
          "604f6cad69c78caf78528090",
          "604f6cae69c78caf78528092",
          "604f6cb069c78caf78528093",
          "604f6cb269c78caf78528094",
          "604f6cb469c78caf78528095",
          "604f6cb669c78caf78528096",
          "604f6cb769c78caf78528097"
        ],
        "_id": "604f6be469c78caf78528023",
        "name": "Five Pizz",
        "tags": "Italienne, Pizzas, Fast-Food",
        "minOrderAmount": 0,
        "costForOne": 10,
        "account": {
          "isVerified": true,
          "_id": "604f6be469c78caf78528022"
        },
        "formattedAddress": "94 Rue Aristide Briand, 92300 Levallois-Perret, France",
        "createdAt": "2021-03-15T14:15:00.537Z",
        "updatedAt": "2021-03-15T19:36:00.360Z",
        "__v": 65,
        "sms": true
      },
      {
        "address": {
          "street": "Gabriel-Péri",
          "zip": "92300",
          "phoneNo": 771242331,
          "locality": "Levallois",
          "aptName": "34",
          "lat": 48.891206,
          "lng": 2.2886593
        },
        "imageUrl": [
          "images/gap 2-1615817120541.png"
        ],
        "payment": [
          "Cash,",
          "Carte",
          "de",
          "Crédit"
        ],
        "items": [
          "604f69eb69c78caf78527f8e",
          "604f69ee69c78caf78527f98",
          "604f69f169c78caf78527f9d",
          "604f69f669c78caf78527fa1",
          "604f69f769c78caf78527fa5",
          "604f69fe69c78caf78527fa9",
          "604f6a0369c78caf78527fad",
          "604f6a0569c78caf78527fb1",
          "604f6a0869c78caf78527fb5",
          "604f6a0a69c78caf78527fb9",
          "604f6a0b69c78caf78527fbd",
          "604f6a0e69c78caf78527fc1",
          "604f6a1169c78caf78527fc5",
          "604f6a1369c78caf78527fc9",
          "604f6a1469c78caf78527fcd",
          "604f6a1669c78caf78527fd1",
          "604f6a1a69c78caf78527fd5",
          "604f6a1c69c78caf78527fda",
          "604f6a2069c78caf78527fdf",
          "604f6a2269c78caf78527fe4",
          "604f6a2369c78caf78527fe9",
          "604f6a2669c78caf78527fee",
          "604f6a2769c78caf78527ff3",
          "604f6a2b69c78caf78527ff8",
          "604f6a2c69c78caf78527ffc",
          "604f6a2e69c78caf78528001",
          "604f6a3069c78caf78528006",
          "604f6a3269c78caf78528007",
          "604f6a3469c78caf7852800c",
          "604f6a3569c78caf7852800d",
          "604f6a3769c78caf7852800e",
          "604f6a3969c78caf7852800f",
          "604f6a3b69c78caf78528010",
          "604f6a3d69c78caf78528011",
          "604f6a3f69c78caf78528012",
          "604f6a4069c78caf78528013",
          "604f6a4269c78caf78528014",
          "604f6a4469c78caf78528015",
          "604f6a4669c78caf78528016",
          "604f6a4869c78caf78528017",
          "604f6a4b69c78caf78528018",
          "604f6a4d69c78caf78528019",
          "604f6a5069c78caf7852801a",
          "604f6a5269c78caf7852801b",
          "604f6a5469c78caf7852801c",
          "604f6a5669c78caf7852801d",
          "604f6a5769c78caf7852801e",
          "604f6a5a69c78caf7852801f",
          "604f6a5d69c78caf78528020",
          "604f6a5e69c78caf78528021"
        ],
        "_id": "604f69a169c78caf78527f8d",
        "name": "Restaurant Gap",
        "tags": "Turque, Sandwich, Halal",
        "minOrderAmount": 0,
        "costForOne": 5,
        "account": {
          "isVerified": true,
          "_id": "604f69a169c78caf78527f8c"
        },
        "formattedAddress": "34 Rue Gabriel Péri, 92300 Levallois-Perret, France",
        "createdAt": "2021-03-15T14:05:21.415Z",
        "updatedAt": "2021-03-16T14:33:57.464Z",
        "__v": 50,
        "sms": true
      }
    ],
    "totalItems": 2
  }, // we stock the first restaurant here, before it was []
  restaurant: {},
  cart: [],
  price: "",
  loading: false,
  addCartSuccess: null,
  deleteSuccessItem: null,
  orders: [],
  options: {} // added

};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_RESTAURANTS:
      return {
        ...state, // return the same than before
        loading: false,
        restaurants: action.payload,
      };
    case SET_RESTAURANT:
      return {
        ...state,
        loading: false,
        restaurant: action.payload.result,
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        addCartSuccess: true,
      };
    case ADD_CART_FAIL:
      return {
        ...state,
        addCartSuccess: false,
      };
    case DELETE_ITEM_CART:
      return {
        ...state,
        deleteSuccessItem: true,
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case EDIT_STATUS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? { ...action.payload } : order
        ),
      };
    case SET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
        price: action.payload.totalPrice,
      };
    default:
      return state;
  }
}
 