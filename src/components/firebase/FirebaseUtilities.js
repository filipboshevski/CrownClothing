import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBJsnD95w09WGlTV9BwXD87t-MxZp35L8o",
    authDomain: "crown-db-6d8a3.firebaseapp.com",
    databaseURL: "https://crown-db-6d8a3.firebaseio.com",
    projectId: "crown-db-6d8a3",
    storageBucket: "crown-db-6d8a3.appspot.com",
    messagingSenderId: "1063668294956",
    appId: "1:1063668294956:web:81e89de0aed6a2c39cf889",
    measurementId: "G-2N6FD4WW9E"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const createdAt = new Date();
        const { displayName, email } = userAuth;
        const cartItems = [];
        try {
            await userRef.set({
                createdAt,
                displayName,
                email,
                cartItems,
                ...additionalData
            });
        } catch(error) {
            console.log('Error while creating user', error);
        }
    }
    return userRef;
}

export const setUserCartData = async (userAuth, cartItems) => {
    if (!userAuth) return;
    
    const userRef = await firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) return;

    const batch = firestore.batch();

    try {
        if (!cartItems.length) return;

        await batch.set(userRef, { cartItems: [...cartItems] }, { merge: true });
    } catch(error) {
        console.log('Error while saving user data', error);
    }

    await batch.commit();
}

export default firebase;