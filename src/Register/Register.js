import clsx from "clsx";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { USER_REGEX, PASSWORD_REGEX } from './constants'
import styles from './style.module.css'
import axiosInstance from "../api/axios";

function Register() {
    const userRef = useRef()
    const errorRef = useRef()

    const [user, setUser] = useState('')
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [repeatPassword, setRepeatPassword] = useState('')
    const [validRepeatPassword, setValidRepeatPassword] = useState(false)
    const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidUser(result)
    }, [user])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password)
        setValidPassword(result)
        const repeat = password === repeatPassword
        setValidRepeatPassword(repeat)
    }, [password, repeatPassword])

    useEffect(() => {
        setError('')
    }, [user, password, repeatPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(user)
        const v2 = PASSWORD_REGEX.test(password)
        if (!v1 || !v2) {
            setError('Invalid Entry')
            return
        }
        try {
            const REGISTER_URL = '/auth/register'
            const payload = { username: user, password }
            await axiosInstance.post(
                REGISTER_URL, 
                payload
            )
            setSuccess(true)
        } catch (error) {
            setError(error.response.data.error.message)
            errorRef.current.focus()
        }
    }

    return (
        <>
            {success ? (
                <section className={clsx(styles.notification)}>
                    <h1>Success!</h1>
                    <p><Link to="/sign_in">Sign In</Link></p>
                </section>
            ) :
                (<section id={clsx(styles.register)}>
                    <p
                        ref={errorRef}
                        className={error ? clsx(styles.errorMessage) : clsx(styles.offscreen)}
                    >
                        {error}
                    </p>
                    <h1 id={clsx(styles.title)}>Register</h1>
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
                                required
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                className={clsx(styles.formControl)}
                            />
                            <p
                                id="uidnote"
                                className={userFocus && user && !validUser ? clsx(styles.instructions) : clsx(styles.offscreen)}
                            >
                                ...
                            </p>
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
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                className={clsx(styles.formControl)}
                            />
                            <p
                                id="pwdnote"
                                className={passwordFocus && password && !validPassword ? clsx(styles.instructions) : clsx(styles.offscreen)}
                            >
                                Contain at least 6 characters
                            </p>
                            <span className={clsx(styles.lineForm)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label htmlFor="confirm_pwd" className={clsx(styles.formLabel)}>
                                Confirm Password:
                            </label>
                            <input
                                type='password'
                                id="confirm_pwd"
                                onChange={e => setRepeatPassword(e.target.value)}
                                required
                                onFocus={() => setRepeatPasswordFocus(true)}
                                onBlur={() => setRepeatPasswordFocus(false)}
                                className={clsx(styles.formControl)}
                            />
                            <p
                                id="pwdnote"
                                className={repeatPasswordFocus && repeatPassword && !validRepeatPassword ? clsx(styles.instructions) : clsx(styles.offscreen)}
                            >
                                Must match the first password input field
                            </p>
                            <span className={clsx(styles.lineForm)}></span>
                        </div>
                        <button
                            disabled={!validUser || !validPassword || !validRepeatPassword ? true : false}
                            className={clsx(styles.btnSubmit)}
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className={clsx(styles.signInLink)}>
                        Already registered? <br />
                        <span>
                            <Link to="/sign_in">Sign In</Link>
                        </span>
                    </p>
                </section>
                )
            }
        </>
    )
}

export default Register;