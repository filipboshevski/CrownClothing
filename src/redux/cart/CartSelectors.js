import { createSelector } from 'reselect';

const selectCart = state => state.cart;

const selectLocalCart = state => state.localCart;

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const SelectCartItemCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)

export const SelectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
);

export const selectLocalCartItems = createSelector(
    [selectLocalCart],
    localCart => localCart.localCartItems
);

export const SelectLocalCartItemCount = createSelector(
    [selectLocalCartItems],
    localCartItems => localCartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)

export const SelectLocalCartTotal = createSelector(
    [selectLocalCartItems],
    localCartItems => localCartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
)