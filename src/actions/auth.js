import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

import { googleAuthProvider } from "../firebase/firebase-config"
import { types } from "../types/types"

export const starLoginWithPassword = ( email, password ) => {

    return ( dispatch ) => {

        const auth = getAuth()

        signInWithEmailAndPassword( auth, email, password )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName ) )
            } )

    }

}


export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        const auth = getAuth();


        createUserWithEmailAndPassword( auth, email, password )
            .then( ( { user } ) => {
                updateProfile( user, { displayName: name } )

                dispatch( login( user.uid, name ) )
            } )
            .catch( error => { console.log( error ) } )



    }
}


export const startGoogleLogin = () => {

    return ( dispatch ) => {
        const auth = getAuth()

        signInWithPopup( auth, googleAuthProvider )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName ) )
            } )

    }
}

export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: { uid, displayName }
    }
}