import React, { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import styles from './style.module.css'

function TodoList({ onClick }) {
    const [jobs, setJobs] = useState(() => {
        const storageJobs = JSON.parse(localStorage.getItem('jobs'))
        return storageJobs ?? []
    })

    const [editId, setEditId] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleEdit = (id, text) => {
        setEditId(id)
        setInputValue(text)
    }

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

    const editJob = (id, newValue) => {
        // if (!newValue.text)
        //     return

        // setJobs(prev => prev.map(item => item.id === jobId ? newValue : item))

        // const arrayJob = jobs.map(item => item.id === jobId ? newValue : item)
        // const jsonArrayJob = JSON.stringify(arrayJob)
        // localStorage.setItem('jobs', jsonArrayJob)
        // setEditId(false)

        let editJobs = jobs.map(job => {
            if (job.id === id) {
                job.text = newValue
            }
            return job
        })
        const jsonJobs = JSON.stringify(editJobs)
        console.log(jsonJobs);
        localStorage.setItem('jobs', jsonJobs)
        setJobs(editJobs)
        setEditId(false)
    }




    const removeJob = id => {
        const updateJobs = [...jobs].filter(job => job.id !== id)
        setJobs(() => {
            const newJobs = [...updateJobs]
            const jsonJobs = JSON.stringify(newJobs)
            localStorage.setItem('jobs', jsonJobs)
            return newJobs
        })
    }

    const completeJob = id => {
        let updateJobs = jobs.map(job => {
            if (job.id === id) {
                job.isComplete = !job.isComplete
            }
            return job
        })
        setJobs(() => {
            const newJobs = [...updateJobs]
            const jsonJobs = JSON.stringify(newJobs)
            localStorage.setItem('jobs', jsonJobs)
            return newJobs
        })
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
                handleEdit={handleEdit}
                editId={editId}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
        </div>
    )
}

export default TodoList
