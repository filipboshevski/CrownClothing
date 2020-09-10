import { call, all } from "redux-saga/effects";
import { userSagas } from "./user/UserSagas";
import { fetchCollectionsStart } from "./shop/ShopSagas";

export function* rootSagaReducer() {
    yield all([
        call(userSagas),
        call(fetchCollectionsStart)
    ]);
};