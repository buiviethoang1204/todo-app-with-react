import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm'
import styles from './style.module.css'

function Todo({ jobs, completeJob, removeJob, editJob }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitEditJob = value => {
        editJob(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <TodoForm 
            edit={edit}
            onSubmit={submitEditJob}
        />
    }

    return jobs.map((job, index) => (
        <div
            className={job.isComplete ? (`${styles.todoRow} ${styles.complete}`) : styles.todoRow}
            key={index}
        >
        <div 
            key={job.id}
            onClick={() => completeJob(job.id)}
        >
            {job.text}
        </div>
        <div className={styles.icons}>
            <RiCloseCircleLine 
                onClick={() => removeJob(job.id)}
                className={styles.deleteIcon}
            />
            <TiEdit 
                onClick={() => setEdit({
                    id: job.id,
                    value: job.text
                })}
                className={styles.editIcon}
            />
        </div>
        </div>
        
    ))
}

export default Todo
