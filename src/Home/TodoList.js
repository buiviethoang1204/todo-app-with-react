import React, { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import styles from './style.module.css'

function TodoList() {
    const [jobs, setJobs] = useState(() => {
        const storageJobs = JSON.parse(localStorage.getItem('jobs'))
        return storageJobs ?? []
    })

    const handleAddJob = job => {
        if (!job.text)
            return

        setJobs(() => {
            const newJobs = [job, ...jobs]
            const jsonJobs = JSON.stringify(newJobs)
            localStorage.setItem('jobs', jsonJobs)
            return newJobs
        })
    }

    const editJob = (jobId, newValue) => {
        if (!newValue.text)
            return

        setJobs(prev => prev.map(item => (item.id === jobId ? newValue : item)))
    }

    const removeJob = id => {
        const updateJobs = [...jobs].filter(job => job.id !== id)
        setJobs(updateJobs)
    }

    const completeJob = id => {
        let updateJobs = jobs.map(job => {
            if (job.id === id) {
                job.isComplete = !job.isComplete
            }
            console.log(job);
            return job
        })
        setJobs(updateJobs)
    }

    return (
        <div>
            <h1 id={styles.title}>Things Todo</h1>
            <TodoForm onSubmit={handleAddJob} />
            <Todo
                jobs={jobs}
                completeJob={completeJob}
                removeJob={removeJob}
                editJob={editJob}
            />
        </div>
    )
}

export default TodoList