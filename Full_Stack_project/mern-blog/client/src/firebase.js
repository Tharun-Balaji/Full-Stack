// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d16dd.firebaseapp.com",
  projectId: "mern-blog-d16dd",
  storageBucket: "mern-blog-d16dd.appspot.com",
  messagingSenderId: "149332250394",
  appId: "1:149332250394:web:09fb254726a5653f44a6a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);