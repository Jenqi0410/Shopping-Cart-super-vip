import { combineReducers } from "redux";
import listCart from "./listCart";
import listProduct from "./listProduct"; 
import notify from "./notify";

const rootReducer = combineReducers({
  listCart,
  listProduct,
  notify,
});

export default rootReducer;