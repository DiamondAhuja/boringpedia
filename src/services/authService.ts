import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Sign up user
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user details in Firestore
    const userRef = doc(db, "Users", user.uid);
    await setDoc(userRef, {
      email,
      name,
      profilePicture: "",
      favorites: [],
      ratings: [],
      recommendations: [],
      watchedMovies: [],
      watchedShows: [],
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Log in user
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Log out user
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
