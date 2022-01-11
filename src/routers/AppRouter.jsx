import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { JournalScreen } from '../components/journal/JournalScreen';

import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { login } from '../actions/auth';

export const AppRouter = () => {
    const auth = getAuth();
    const dispatch = useDispatch()

    const [ checking, setChecking ] = useState( true );
    const [ isLoggedIn, setIsLoggedIn ] = useState( false )
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
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        isAuthenticated={ isLoggedIn }
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
