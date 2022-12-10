// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmBQxekFUBvBYpw6PCBxIzjMezJk4ri8I",
  authDomain: "smartcode-ea70f.firebaseapp.com",
  databaseURL: "https://smartcode-ea70f-default-rtdb.firebaseio.com",
  projectId: "smartcode-ea70f",
  storageBucket: "smartcode-ea70f.appspot.com",
  messagingSenderId: "415072317619",
  appId: "1:415072317619:web:1245bc8f2ecb81ca6980c6",
  measurementId: "G-HJZ7XDXRFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}
