import React, { useEffect, useRef } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import styles from './style.module.css'

function Todo({
    jobs,
    completeJob,
    removeJob,
    editJob,
    handleEdit,
    editId,
    inputValue,
    setInputValue
}) {    

    return jobs.map((job, index) => (
        <div
        
            className={styles.todoRow}
            key={index}
        >
            {
                editId === job.id ? (
                    <input
                        className={styles.todoInput}
                        placeholder='Edit todo'
                        type='text'
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                ) : (
                    <div
                        key={job.id}
                        onClick={() => completeJob(job.id)}
                        className={job.isComplete ? styles.complete : '' }
                    >
                        {job.text}
                    </div>
                    )
                }

                {
                    editId === job.id ? (
                        <button 
                            onClick={() => editJob(job.id, inputValue)}
                            className={`${styles.todoBtn} ${styles.editBtn}`}
                        >
                            Update
                        </button>
                    ) : (
                        <div className={styles.icons}>
                        <RiCloseCircleLine
                            onClick={() => removeJob(job.id)}
                            className={styles.deleteIcon}
                        />
                        <TiEdit
                            onClick={() => handleEdit(job.id, job.text)}
                            className={styles.editIcon}
                        />
                    </div>
                    )
                }
        </div>
    ))
}

export default Todo
