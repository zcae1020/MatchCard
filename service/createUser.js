import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';

console.log(1);

console.log(firebase)
console.log(firebase.auth)

// firebase.auth().createUserWithEmailAndPassword("fasdfsd", "fdsafa")
//         .then(() => {
//             alert("회원가입 완료")
//         })
//         .catch(function (error) {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             alert("실패")
//         });