import userActionTypes from "./UserTypes";

const INITIAL_STATE = {
    currentUser: null,
    authUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_AUTH_USER:
            return {
                ...state,
                authUser: action.payload
            }
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case userActionTypes.SIGN_OUT_USER:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}

export default userReducer;