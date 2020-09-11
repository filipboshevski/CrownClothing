import { localCartActionTypes } from "../CartTypes";
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../CartUtilities";

const INITIAL_STATE = {
    localCartItems: []
};

const localCartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case localCartActionTypes.ADD_LOCAL_ITEM:
            return {
                ...state,
                localCartItems: addItemToCart(state.localCartItems, action.payload)
            }
        case localCartActionTypes.CLEAR_ITEM_FROM_LOCAL_CART:
            return {
                ...state,
                localCartItems: clearItemFromCart(state.localCartItems, action.payload)
            }
        case localCartActionTypes.REMOVE_LOCAL_ITEM:
            return {
                ...state,
                localCartItems: removeItemFromCart(state.localCartItems, action.payload)
            }
        case localCartActionTypes.SET_LOCAL_CART_ITEMS:
            return {
                ...state,
                localCartItems: [...action.payload]
            }
        default:
            return state;
    };
};

export default localCartReducer;