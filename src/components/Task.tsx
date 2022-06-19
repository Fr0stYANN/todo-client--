import React, {FC, useEffect} from 'react';
import {ITask} from "../models/ITask";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Link} from "react-router-dom";
import {ICategory} from "../models/ICategory";
import {tasksActions}from '../store/actions'

const Task: FC<ITask> = (task) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories['categories']);
    let exactCategoryChecked : ICategory = {
        categoryId: 0,
        categoryName: ''
    };
    function DateToString(date : string) : string{
        if(date !== null) {
            let dateString1 = date.substring(0,10);
            let dateString2 = date.substring(11,19);
            return  dateString1 + ' ' + dateString2;
        }
        else{
            return 'No Due Date';
        }
    }
    // @ts-ignore
    const exactCategory = categories.find((category) => category.categoryId === task.categoryId);
    if(exactCategory !== undefined){
        exactCategoryChecked = {
            categoryId: exactCategory.categoryId,
            categoryName: exactCategory.categoryName
        }
    }
    const handleDelete = () => {
        if(task.taskId) {
            dispatch(
                tasksActions.fetchRemoveTask(task.taskId)
            )
        }
    }
    const setDoneStatus = () => {
        if(task.taskId){
            dispatch(
                tasksActions.fetchSetTaskDone(task.taskId)
            )
        }
    }
    return(
        <div className="task-container">
            {task.isDone ? <div className="task-duedate">{DateToString(task.doneDate as string)}</div> :
                <div className="task-duedate">{task.dueDate ? <div>{DateToString(task.dueDate as string)}</div> : <div>No due Date</div> }</div>}
            <div className="task-name">{task.taskName}</div>
            <div className="task-category">{exactCategoryChecked.categoryName ?
                <p>{exactCategoryChecked.categoryName}</p> : <p>No Category</p>}</div>
            <button onClick={handleDelete}>delete task</button>
            {task.isDone === false ?
                <button onClick={setDoneStatus}>done</button> : ''}
            <Link to={`edit-task/${task.taskId}`}>
                <button>Edit task</button>
            </Link>
        </div>
    )
}

export default Task