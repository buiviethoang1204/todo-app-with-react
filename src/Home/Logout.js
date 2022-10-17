import React, { useState } from 'react'
import styles from './style.module.css'
import { Navigate } from 'react-router-dom'

function Logout() {
    const [logout, setLogout] = useState(false)

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            localStorage.removeItem('Token')
            setLogout(true)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                logout ? (
                    <Navigate to='/sign_in' replace={true} />
                ) : (
                    <div>
                        <button
                            className={styles.logoutBtn}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default Logout
