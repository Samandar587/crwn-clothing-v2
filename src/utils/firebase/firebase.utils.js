import { initializeApp } from "firebase/app";
import {
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd6-PNLgUNXuudgqbS3LG_jV_w6mUDJuA",
  authDomain: "crwn-clothing-db-7b9c8.firebaseapp.com",
  projectId: "crwn-clothing-db-7b9c8",
  storageBucket: "crwn-clothing-db-7b9c8.firebasestorage.app",
  messagingSenderId: "696974181941",
  appId: "1:696974181941:web:53ef22d271bf255f7e937c",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error on creating user", error.message);
    }
  }

  return userDocRef;
};
