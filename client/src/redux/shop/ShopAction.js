import shopActionTypes from "./ShopTypes";

export const setShopData = collections => ({
    type: shopActionTypes.SET_SHOP_COLLECTIONS,
    payload: collections
});

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = error => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error.message
});