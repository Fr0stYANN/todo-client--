import React, {useEffect} from 'react';
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

export default function App() {
    return (
        <div className="container">
            <AddTask/>
            <TaskList/>
        </div>
    );
};