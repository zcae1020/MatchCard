import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
import db from '../firebase/config.js'

import { collection, addDoc } from "firebase/firestore";

const router = express.Router()

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

export default router