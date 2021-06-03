import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/firebase-storage"

const app = firebase.initializeApp({
    apiKey: 'AIzaSyD0mnZlosl4Ah_Wj1dDMrNdWWuitnJ2c6s',
    authDomain: 'auth-production-30b35.firebaseapp.com',
    projectId: 'auth-production-30b35',
    storageBucket: 'auth-production-30b35.appspot.com',
    messagingSenderId: '563968072455',
    appId: '1:563968072455:web:5b7f2b12a411fa8b2f03a2',
    measurementId: 'G-JLBV0X4VS0',
})

export const auth = app.auth()
export const db = app.firestore()
export const storage = app.storage()
export default app








