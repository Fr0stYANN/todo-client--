import React, {ChangeEvent, FormEvent, useState} from 'react';
import {ITask} from "../models/ITask";
import Task from "./Task";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ICategory} from "../models/ICategory";
import {exactCategoryActions} from '../store/actions'
interface InitialStateInterface {
    exactCategoryChoosen: string,
    categoryId: number;
}

const TaskList = () => {
    const dispatch = useAppDispatch();
    const [exactCategoryId, setExactCategoryId] = useState<number>(useAppSelector(state => state.exactCategory['categoryId']))
    let categories: ICategory [] = useAppSelector(state => state.categories['categories']);
    let renderedDoneTasks: JSX.Element [] = [];
    let renderedNotDoneTasks: JSX.Element [] = [];
    let tasks: ITask [] = useAppSelector(state => {
        if (state.exactCategory['categoryId'] === 0) {
            return state.tasks['tasks'];
        } else {
            // @ts-ignore
            return state.tasks['tasks'].filter((task) => task.categoryId === exactCategoryId);
        }
    });
    renderedDoneTasks = tasks.filter(task => task.isDone === true).map(task => (
        <Task {...task} key={task.taskId}/>
    ))
    renderedNotDoneTasks = tasks.filter(task => task.isDone === false).map(task => (
        <Task {...task} key={task.taskId}/>
    ))
    const renderedCategories = categories.map((category) => (<option key={category.categoryId}
                                                                     value={category.categoryId}>{category.categoryName}</option>))
    const handleExactCategorySelected = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (exactCategoryId === 0) {
            dispatch(
                exactCategoryActions.exactCategoryChanged(0)
            )
        } else {
            dispatch(
                exactCategoryActions.exactCategoryChanged(exactCategoryId))
        }
    }
    return (
        <div className="tasklist-container">
            <form onSubmit={handleExactCategorySelected}>
                <select value={exactCategoryId} onChange={(e) =>
                    (setExactCategoryId(Number(e.currentTarget.value)))}>
                    <option value={0}>any</option>
                    {renderedCategories}
                </select>
                <input type="submit" value="filter"/>
            </form>
            <h2>Current Tasks</h2>
            <div>{renderedNotDoneTasks ? <div>{renderedNotDoneTasks}</div> :
                <div>No current tasks available</div>}</div>
            <h2>Done Tasks</h2>
            <div>{renderedDoneTasks ? <div>{renderedDoneTasks}</div> : <div>No done tasks</div>}</div>
        </div>
    )
}

export default TaskList;