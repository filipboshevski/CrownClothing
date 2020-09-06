import cartActionTypes from "./CartTypes";
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "./CartUtilities";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartActionTypes.TOGGLE_CART_DROPDOWN_FALSE:
            return {
                ...state,
                hidden: true
            }
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case cartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: clearItemFromCart(state.cartItems, action.payload)
            }
        case cartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case cartActionTypes.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: [...action.payload]
            }
        default:
            return state;
    };
};

export default cartReducer;