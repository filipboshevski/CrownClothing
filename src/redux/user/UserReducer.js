import userActionTypes from "./UserTypes";

const INITIAL_STATE = {
    currentUser: null,
    authUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case 'SET_AUTH_USER':
            return {
                ...state,
                authUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;