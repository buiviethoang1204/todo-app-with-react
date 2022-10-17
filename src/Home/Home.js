import React from "react";
import TodoList from "./TodoList";
import styles from './style.module.css'
import Logout from "./Logout";

function Home() {
    return (
        <div id={styles.home}>
            <TodoList />
            <Logout />
        </div>
    )
}

export default Home;
