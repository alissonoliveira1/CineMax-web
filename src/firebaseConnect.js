import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "cinemagic-77a09.firebaseapp.com",
    projectId: "cinemagic-77a09",
    storageBucket: "cinemagic-77a09.appspot.com",
    messagingSenderId: "152399026163",
    appId: "1:152399026163:web:d6f9d079f78b37f736e486",
    measurementId: "G-03V9B70VFF"
    
  };
 
  const git = new GithubAuthProvider();
  const provider = new GoogleAuthProvider();
  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)


  export {db,auth,provider,git,firebaseConfig}