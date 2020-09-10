import userActionTypes from "./UserTypes";

export const setAuthUser = authUser => ({
    type: userActionTypes.SET_AUTH_USER,
    payload: authUser
});

export const signInWithGoogle = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
});

export const signInWithEmail = (email, password) => ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: {email, password}
});

export const signInSuccess = authUser => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: authUser
});

export const signInFailure = error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const signOutUser = () => ({
    type: userActionTypes.SIGN_OUT_USER
});

export const isUserPersisted = (canSave, loading, cartItems) => ({
    type: userActionTypes.IS_USER_PERSISTED,
    payload: {canSave, loading, cartItems}
})

