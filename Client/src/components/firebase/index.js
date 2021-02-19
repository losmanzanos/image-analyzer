import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: "vision-10f67.firebaseapp.com",
  projectId: "vision-10f67",
  storageBucket: "vision-10f67.appspot.com",
  messagingSenderId: "100870690584",
  appId: "1:100870690584:web:4c87acc4b8115b8097f06d",
  measurementId: "G-DNLR1ZZEK5",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
