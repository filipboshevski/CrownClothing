import userActionTypes from "./UserTypes";

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const setAuthUser = authUser => ({
    type: 'SET_AUTH_USER',
    payload: authUser
})