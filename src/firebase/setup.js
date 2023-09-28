import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCTNdk-gbIdNCWxdCs20ypecyZlXHIJ6uo",
  authDomain: "clone-29d9a.firebaseapp.com",
  projectId: "clone-29d9a",
  storageBucket: "clone-29d9a.appspot.com",
  messagingSenderId: "1007708556711",
  appId: "1:1007708556711:web:e89ef8cfab8752ab4b7a82"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)