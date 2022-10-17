import clsx from "clsx";
import styles from './style.module.css'
import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axiosInstance from "../api/axios";

function SignIn() {
    const { setAuth } = useContext(AuthContext)

    const userRef = useRef()
    const errorRef = useRef()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setError('')
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const SIGN_IN_URL = '/auth/login'
            const payload = { username: user, password }
            const response = await axiosInstance.post(
                SIGN_IN_URL,
                payload
            )
            const accessToken = response.data.data.accessToken
            localStorage.setItem('Token', accessToken)
            setAuth({ user, accessToken })
            setUser('')
            setPassword('')
            setSuccess(true)
        } catch (error) {
            setError(error.response.data.error.message)
            errorRef.current.focus()
        }
    }

    return (
        <>
            {success ? (
                    <Navigate to='/' replace={true}/>
            ) :
                (
                    <section id={clsx(styles.signIn)}>
                        <p
                            ref={errorRef}
                            className={error ? clsx(styles.errorMessage) : clsx(styles.offscreen)}
                        >
                            {error}
                        </p>
                        <h1 id={clsx(styles.title)}>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div className={clsx(styles.formGroup)}>
                                <label htmlFor="username" className={clsx(styles.formLabel)}>
                                    Username:
                                </label>
                                <input
                                    type='text'
                                    id="username"
                                    ref={userRef}
                                    onChange={e => setUser(e.target.value)}
                                    value={user}
                                    required
                                    className={clsx(styles.formControl)}
                                />
                                <span className={clsx(styles.lineForm)}></span>
                            </div>
                            <div className={clsx(styles.formGroup)}>
                                <label htmlFor="password" className={clsx(styles.formLabel)}>
                                    Password:
                                </label>
                                <input
                                    type='password'
                                    id="password"
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    value={password}
                                    className={clsx(styles.formControl)}
                                />
                                <span className={clsx(styles.lineForm)}></span>
                            </div>
                            <button className={clsx(styles.btnSubmit)}>Sign In</button>
                            <p className={clsx(styles.registerLink)}>
                                Need an account? <br />
                                <span>
                                    <Link to="/register">Register</Link>
                                </span>
                            </p>
                        </form>
                    </section>
                )
            }
        </>
    )
}

export default SignIn;
