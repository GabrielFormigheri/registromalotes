import { initializeApp} from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword}  from "firebase/auth";
import {storageSave, storageRemove, storageGet} from './Storage'
import { getFirestore } from "firebase/firestore";
import {collection, addDoc, getDocs, deleteDoc, doc} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyB8pOLZmxRitogQRYN1rrVwjLXzBbnjJVY",
  authDomain: "cadastromalotes.firebaseapp.com",
  projectId: "cadastromalotes",
  storageBucket: "cadastromalotes.appspot.com",
  messagingSenderId: "732820600858",
  appId: "1:732820600858:web:0c6583b8e89fab442479a3"
};

initializeApp(firebaseConfig);
const db = getFirestore();
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


export const sigin = (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth,email, password)
        .then(()=>{
            resolve("Registro realizado com sucesso!")
        })
        .catch(()=>{
            reject()
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

export const saveMalotes = (malote) => {
    return new Promise( async (resolve,reject)=> {
        try{
            await addDoc(collection(db,"malotes"), malote);
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteMalotes = (id) => {
    return new Promise( async (resolve,reject)=> {
        try{
            await deleteDoc(doc(db, 'malotes',id));
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

export const getMalotes = () => {
    return new Promise( async (resolve,reject)=> {
        try{
            const querySnapshot = await getDocs(collection(db, "malotes"));
            let dados = []
            querySnapshot.forEach((doc) => {
                dados.push({
                    id: doc.id,
                    agencia: doc.data().agencia,
                    vv: doc.data().vv
                })
            });
            resolve(dados)
        } catch (error) {
            reject(error)
        }
    })
}

export const isAuthenticated = ()=> storageGet("TOKEN_KEY") !== null;
export const getToken = () => storageGet("TOKEN_KEY")