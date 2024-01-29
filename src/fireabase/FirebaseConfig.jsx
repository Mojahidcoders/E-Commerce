// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB89xyKoGHkfbCqKUM3qVv41QjiWUoWt8s",
  authDomain: "myfirstapp-abb11.firebaseapp.com",
  projectId: "myfirstapp-abb11",
  storageBucket: "myfirstapp-abb11.appspot.com",
  messagingSenderId: "493860595870",
  appId: "1:493860595870:web:78c13103f43a1226d2338f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth}
