import cartActionTypes from './CartTypes';

export const toggleCartHidden = () => ({
    type: cartActionTypes.TOGGLE_CART_DROPDOWN
});

export const addCartItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
})

export const removeCartItem = item => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
})

export const clearItemFromCart = item => ({
    type: cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})