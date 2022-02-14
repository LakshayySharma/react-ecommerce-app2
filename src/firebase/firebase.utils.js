import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyB2ZTBlMuHCLqfno8pbnUbXb8Zhz4hdGrI",
  authDomain: "react-ecommerce-app-b230c.firebaseapp.com",
  projectId: "react-ecommerce-app-b230c",
  storageBucket: "react-ecommerce-app-b230c.appspot.com",
  messagingSenderId: "320841189990",
  appId: "1:320841189990:web:439333cfa4f1b56074fba7",
  measurementId: "G-KZJCPEE9QX",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
