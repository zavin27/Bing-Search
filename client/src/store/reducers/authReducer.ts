import {ActionTypes} from "../actionTypes";
import {AuthModel} from "../../models/Auth.model";

/**
 * Authentication reducer
 * @param state
 * @param action
 */
export const AuthReducer = (state: AuthModel = new AuthModel(), action) => {
    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            return authSuccess(state);
        case ActionTypes.AUTH_LOGOUT:
            return authLogOut(state);
        default:
            return state;
    }
};
/**
 * on Authentication success
 * @param state
 */
const authSuccess = (state) => {
    return {
        ...state,
        isAuthenticated: true
    }
};
/**
 * on log out
 * @param state
 */
const authLogOut = (state) => {
    return {
        ...state,
        isAuthenticated: false
    }
};
