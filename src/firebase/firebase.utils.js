import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyC_N1_mqUc1cZLyqyUk408K2pXOq0LTe54",
    authDomain: "crwn-db-3b11a.firebaseapp.com",
    projectId: "crwn-db-3b11a",
    storageBucket: "crwn-db-3b11a.appspot.com",
    messagingSenderId: "127716569479",
    appId: "1:127716569479:web:f4c5de9de33bc1ea7ba322",
    measurementId: "G-RZ7Q2VC783"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    console.log(snapShot);
    if(!snapShot.exists){   
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;