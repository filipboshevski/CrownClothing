import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.shopData
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParams => 
    createSelector(
        [selectCollections],
        collections => collections ? collections[collectionUrlParams] : null
    );

export const selectIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const isCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.shopData
)