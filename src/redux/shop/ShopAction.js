import shopActionTypes from "./ShopTypes";

export const setShopData = collections => ({
    type: shopActionTypes.SET_SHOP_COLLECTIONS,
    payload: collections
})