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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

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
        await batch.update(userRef, { cartItems: [...cartItems] });
    } catch(error) {
        console.log('Error while saving user data', error);
    }

    await batch.commit();
}

export const addCollectionsToFireStore = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newObjectRef = collectionRef.doc();

        batch.set(newObjectRef, object);
    })

    await batch.commit();
};

export const convertCollectionsToArray = collections => {
    const transformedCollections = collections.docs.reduce((accumulator, doc) => {
        const {title, items} = doc.data();

        accumulator[title.toLowerCase()] = {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };

        return accumulator;
    }, {});

    return transformedCollections;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            unsubscribe();
            resolve(authUser);
        }, reject);
    });
};

export default firebase;