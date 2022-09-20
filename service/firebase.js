/**
 * user firestore service
 */

import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
import { app } from '../firebase/config.js'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { get } from 'http';

const router = express.Router()
const db = getDatabase(app);

router.get('/', async(req, res) => {
  try {
    const docRef = addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  res.send('firestore');
})

router.get('/auth', async(req, res) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, "email@example.com", "fjdsfa")
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("auth", userCredential);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  res.send('auth');
})

export default router