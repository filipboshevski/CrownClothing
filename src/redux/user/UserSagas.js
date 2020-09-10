import { all, call, takeLatest, put } from 'redux-saga/effects';
import userActionTypes from './UserTypes';
import { auth, googleProvider, createUserProfileDocument, setUserCartData, firestore, getCurrentUser } from '../../components/firebase/FirebaseUtilities';
import { signInSuccess, setAuthUser, signInFailure } from './UserActions';
import { setCartItems } from '../cart/CartActions';

export function* setUserData(user) {
    try {
        const userRef = yield call(createUserProfileDocument, user);
        const snapShot = yield userRef.get();
        yield put(signInSuccess({id: snapShot.id, ...snapShot.data() }));
        yield put(setAuthUser(user));
        yield put(setCartItems(snapShot.data().cartItems));
    } catch (error) {
        yield put(signInFailure(error));
    };
};

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield setUserData(user);
    } catch (error) {
        yield put(signInFailure(error));
    };
};

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield setUserData(user);
    } catch (error) {
        yield put(signInFailure(error));
    };
};

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* isUserPersisted({payload: {canSave, loading, cartItems}}) {
    
    try {
        const authUser = yield getCurrentUser();

        if (authUser) {
            const snapShot = yield firestore.doc(`users/${authUser.uid}`).get();
            const userCartItems = yield snapShot.data().cartItems;

            if (canSave && !loading) {
            yield put(setUserCartData(authUser, cartItems));
            }

            yield put(signInSuccess(authUser));
            yield put(setCartItems(userCartItems));
        };
    } catch (error) {
        yield put(signInFailure(error));
    };
};

export function* onCheckUserAuthStart() {
    yield takeLatest(userActionTypes.IS_USER_PERSISTED, isUserPersisted)
};

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserAuthStart)
    ])
};