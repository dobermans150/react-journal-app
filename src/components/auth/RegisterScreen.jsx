import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form>

                <input
                    autoComplete='off'
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                />
                <input
                    autoComplete='off'
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"

                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className="auth__input"

                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Login
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>


        </>
    )

}
