import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'

function TodoForm(props) {
    const jobRef = useRef()
    const [job, setJob] = useState(props.edit ? props.value : '')

    useEffect(() => {
        jobRef.current.focus()
    })

    const handleOnChange = e => {
        setJob(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.onSubmit({
            id: Math.floor(Math.random() * 1000),
            text: job
        })
        setJob('')
    }

    return (
        <form className={styles.todoForm} onSubmit={handleSubmit}>
            {
                props.edit ? (
                    <>
                        <input
                            ref={jobRef}
                            type='text'
                            placeholder='Edit todo'
                            value={job}
                            className={`${styles.todoInput} ${styles.edit}`}
                            onChange={handleOnChange}
                        />
                        <button
                            className={`${styles.todoBtn} ${styles.editBtn}`}
                        >
                            Update
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            ref={jobRef}
                            type='text'
                            placeholder='Add a todo'
                            value={job}
                            className={styles.todoInput}
                            onChange={handleOnChange}
                        />
                        <button
                            className={styles.todoBtn}
                        >
                            Add todo
                        </button>
                    </>
                )
            }
        </form>
    )
}

export default TodoForm
