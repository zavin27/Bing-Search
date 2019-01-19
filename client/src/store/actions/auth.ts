import {ActionTypes} from "../actionTypes";
import {User} from "../../models/User.model";

export const authSuccess = (user: User) => {
    localStorage.setItem('access_token', user.access_token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('userId', user.userId.toString());
    return {
        type: ActionTypes.AUTH_SUCCESS,
    };
};


export const logOut = () => {
    localStorage.clear();
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
};

export const checkAuthStatus = () => {
    return dispatch => {
        const user = new User();
        user.access_token = localStorage.getItem('access_token');
        user.username = localStorage.getItem('username');
        user.userId = parseInt(localStorage.getItem('userId'));
        if (!user.access_token) {
            dispatch(logOut());
        } else {
            dispatch(authSuccess(user));
        }
    }
};
