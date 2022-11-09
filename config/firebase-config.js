import { initializeApp, cert } from "firebase-admin/app";
import {serviceAccount} from "./serviceAccount.js"

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://match-card-dcd2e-default-rtdb.asia-southeast1.firebasedatabase.app"
});