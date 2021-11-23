import { initializeApp} from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut}  from "firebase/auth";
import {storageSave, storageRemove, storageGet} from './Storage'
const firebaseConfig = {
  apiKey: "AIzaSyB8pOLZmxRitogQRYN1rrVwjLXzBbnjJVY",
  authDomain: "cadastromalotes.firebaseapp.com",
  projectId: "cadastromalotes",
  storageBucket: "cadastromalotes.appspot.com",
  messagingSenderId: "732820600858",
  appId: "1:732820600858:web:0c6583b8e89fab442479a3"
};


const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth,email, password)
        .then((usuario)=>{
            storageSave("TOKEN_KEY", usuario.user.uid)
            resolve(true)
        })
        .catch((error)=>{
            storageRemove("TOKEN_KEY")
            reject(error)
        })
    })

}

export const logoff = () =>{
    return new Promise((resolve, reject) => {
        storageRemove("TOKEN_KEY")
        signOut(auth).then(() => {
            resolve()
        }
        ).catch((error) => {
            reject()
        }
        );
    }
    ) 

}

export const isAuthenticated = ()=> storageGet("TOKEN_KEY") !== null;
export const getToken = () => storageGet("TOKEN_KEY")