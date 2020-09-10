import { takeEvery, call, put } from 'redux-saga/effects';
import shopActionTypes from './ShopTypes';
import { firestore, convertCollectionsToArray } from '../../components/firebase/FirebaseUtilities';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './ShopAction';

export function* fetchCollectionsAsync() {
    
    try {
        const collectionRef = firestore.collection('collections');

        const snapShot = yield collectionRef.get();

        const collectionsMap = yield call(convertCollectionsToArray, snapShot);

        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}