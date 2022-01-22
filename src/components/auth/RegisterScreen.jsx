import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ registerValues, handleInputChange ] = useForm( {
        name: '',
        email: '',
        password: '',
        confirm: ''
    } )

    const { name, email, password, confirm } = registerValues


    const handleRegistration = ( e ) => {
        e.preventDefault();

        if ( isFormValid() ) {

            dispatch( startRegisterWithEmailPasswordName( email, password, name ) )

        }



    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setError( 'Name is required' ) );
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError( 'Type an email valid' ) )
            return false;
        } else if ( password.trim().length < 5 ) {
            dispatch( setError( 'The password must be at least 5 characters' ) );
            return false
        } else if ( password !== confirm ) {
            dispatch( setError( 'The two passwords must be equal' ) );
            return false;
        }

        dispatch( removeError() )

        return true;

    }
    return (
        < div className="animate__animated animate__fadeIn animated__faster">
            <h3 className="auth__title">Register</h3>

            <form
                onSubmit={ handleRegistration }
            >

                {
                    msgError && (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }


                <input
                    autoComplete='off'
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input
                    autoComplete='off'
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }

                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }


                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className="auth__input"
                    value={ confirm }
                    onChange={ handleInputChange }


                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>


        </ div>
    )

}
