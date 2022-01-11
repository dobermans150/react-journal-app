import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

export const AppRouter = () => {
    const auth = getAuth();
    const dispatch = useDispatch()

    const [ checking, setChecking ] = useState( true );
    const [ isLoggedin, setIsLoggedIn ] = useState( false )
    useEffect( () => {
        onAuthStateChanged( auth, user => {
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) )
                setIsLoggedIn( true )
            } else {
                setIsLoggedIn( false )
            }

            setChecking( false )
        } )
    }, [ auth, dispatch, setChecking ] )


    if ( checking ) {
        return (
            <h1>Espere...</h1>
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        path="/auth"
                        component={ AuthRouter }
                    />
                    <Route
                        exact
                        path="/"
                        component={ JournalScreen }
                    />


                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
