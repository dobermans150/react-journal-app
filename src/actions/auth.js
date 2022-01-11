import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut } from 'firebase/auth';

import { googleAuthProvider } from "../firebase/firebase-config"
import { uiFinishLoading, uiStartLoading } from './ui';
import { types } from "../types/types"

export const starLoginWithPassword = ( email, password ) => {

    return ( dispatch ) => {
        dispatch( uiStartLoading() )


        const auth = getAuth()

        signInWithEmailAndPassword( auth, email, password )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName ) )
                dispatch( uiFinishLoading() )
            } )
            .catch( ( e ) => {
                dispatch( uiFinishLoading() )
                console.log( e );
            } )

    }

}


export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        dispatch( uiStartLoading() )
        const auth = getAuth();


        createUserWithEmailAndPassword( auth, email, password )
            .then( async ( { user } ) => {
                await updateProfile( user, { displayName: name } )

                dispatch( login( user.uid, user.displayName ) )
                dispatch( uiFinishLoading() )
            } )
            .catch( error => {
                console.log( error )
                dispatch( uiFinishLoading() )
            } )

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

export const startLogout = () => {
    return async ( dispatch ) => {
        const auth = getAuth()
        await signOut( auth )
        dispatch( logOut() )
    }
}

export const logOut = () => ( {
    type: types.logout,
} )