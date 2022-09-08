//import firebase from "firebase/app";
//import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAPMPck3qqeiVVxHhVJf5zkGDuey6ff7uY",
  authDomain: "match-card-dcd2e.firebaseapp.com",
  projectId: "match-card-dcd2e",
  storageBucket: "match-card-dcd2e.appspot.com",
  messagingSenderId: "1033059561332",
  appId: "1:1033059561332:web:6b9ceeda90b293c2884621",
  measurementId: "G-RQF3WJ5WL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase
//const database = firebase.firestore();

export default db;
