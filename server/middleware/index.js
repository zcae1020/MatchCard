import * as auth from "firebase-admin/auth";
import * as firebase from "../config/firebase-config.js";

// export function decodeToken(req, res, next){
//     const token = req.headers.authorization;

//     auth.getAuth().verifyIdToken(token).then(()=>{
//         return next();
//     })
//     .catch((error)=>{
//         return res.json({message:error});
//     })
// }

export function decodeToken(token) {
    auth.getAuth()
        .verifyIdToken(token)
        .then(() => {
            return 0;
        })
        .catch((error) => {
            return 1;
        });
}
