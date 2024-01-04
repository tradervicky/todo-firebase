// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm8ITr_AyDgY0Eq5OEYUDWn3474JfV-mc",
  authDomain: "to-do-3ef11.firebaseapp.com",
  projectId: "to-do-3ef11",
  storageBucket: "to-do-3ef11.appspot.com",
  messagingSenderId: "1033632466468",
  appId: "1:1033632466468:web:4baccf18747dc0a3d2bab1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)