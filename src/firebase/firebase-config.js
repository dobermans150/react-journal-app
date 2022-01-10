import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyDJ5tfbFG-UvYMN4HVwOfEXWgTZ4OI-HfQ",
    authDomain: "react-journal-app-c0b0a.firebaseapp.com",
    projectId: "react-journal-app-c0b0a",
    storageBucket: "react-journal-app-c0b0a.appspot.com",
    messagingSenderId: "171519666718",
    appId: "1:171519666718:web:c756ec1e7ee12e7e9a1c0f"
};

const app = initializeApp( firebaseConfig );

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    app
}