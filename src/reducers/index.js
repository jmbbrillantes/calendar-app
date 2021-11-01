import itemsReducer from "./items"
import { combineReducers } from "redux";

const unifiedReducers = combineReducers({
    itemList: itemsReducer
})

export default unifiedReducers;