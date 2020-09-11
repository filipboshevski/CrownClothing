import cartActionTypes, {localCartActionTypes} from './CartTypes';

export const toggleCartHidden = () => ({
    type: cartActionTypes.TOGGLE_CART_DROPDOWN
});

export const toggleCartHiddenFalse = () => ({
    type: cartActionTypes.TOGGLE_CART_DROPDOWN_FALSE
});

export const addCartItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
});

export const removeCartItem = item => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({
    type: cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

export const setCartItems = cartItems => ({
    type: cartActionTypes.SET_CART_ITEMS,
    payload: cartItems
})

export const addLocalCartItem = item => ({
    type: localCartActionTypes.ADD_LOCAL_ITEM,
    payload: item
});

export const removeLocalCartItem = item => ({
    type: localCartActionTypes.REMOVE_LOCAL_ITEM,
    payload: item
});

export const clearItemFromLocalCart = item => ({
    type: localCartActionTypes.CLEAR_ITEM_FROM_LOCAL_CART,
    payload: item
});

export const setLocalCartItems = localCartItems => ({
    type: localCartActionTypes.SET_LOCAL_CART_ITEMS,
    payload: localCartItems
});