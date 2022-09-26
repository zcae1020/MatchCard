/**
 * 사용자 회원가입
 */

import express from 'express'
import * as auth from 'firebase-admin/auth';
import * as firebase from "../../config/firebase-config.js";

auth.getAuth()
  .getUsers([
    { uid: 'uid1' },
    { email: 'user2213@example.com' },
    { phoneNumber: '+15555550003' },
    { providerId: 'google.com', providerUid: 'google_uid4' },
  ])
  .then((getUsersResult) => {
    console.log('Successfully fetched user data:');
    getUsersResult.users.forEach((userRecord) => {
      console.log(userRecord);
    });

    console.log('Unable to find users corresponding to these identifiers:');
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });

function signUp(email, password){
  createUserWithEmailAndPassword(auth, email, password).then((user)=>{
    console.log(user);
    return user;
  }).catch((err)=>{
    console.log(err);
    return err;
  })
}

const router = express.Router()

router.get('/', (req, res) => {
  console.log("get");
  let {email} = req.query.email;
  let {password} = req.query.password;
  let user = signUp(email, password);
  console.log(user);
  res.send(user);
})

export default router