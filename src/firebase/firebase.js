// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrhJhnT8L7puE8klSjNjAJsOPqViL6Zq4",
  authDomain: "lupulse.firebaseapp.com",
  projectId: "lupulse",
  storageBucket: "lupulse.appspot.com",
  messagingSenderId: "94359982846",
  appId: "1:94359982846:web:10167b392ec9bd2e3a0baf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);