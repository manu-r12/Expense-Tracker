import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDasTis7N9BFqvben6dZcgAvPj2WxeZFBw",
    authDomain: "budget-tracker-d2dac.firebaseapp.com",
    projectId: "budget-tracker-d2dac",
    storageBucket: "budget-tracker-d2dac.appspot.com",
    messagingSenderId: "796594354127",
    appId: "1:796594354127:web:f00a8040c2d131497844ba"
  };



 export  const app = initializeApp(firebaseConfig);

 export  const auth = getAuth()

 export const db = getFirestore(app);