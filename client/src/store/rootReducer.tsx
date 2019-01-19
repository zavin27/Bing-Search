import {combineReducers} from "redux";
import {AuthReducer} from "./reducers/authReducer";

/**
 * the root reducer to combine application reducers
 */
export const rootReducer = combineReducers({
    AuthReducer
});
