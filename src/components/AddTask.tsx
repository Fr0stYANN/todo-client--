import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ITask} from "../models/ITask";
import {ICategory} from "../models/ICategory";
import {tasksActions} from '../store/actions'
import {TaskInputType} from "../models/TaskInputType";
import moment from "moment";
const initialState : TaskInputType = {
    taskName: '',
    dueDate: '',
    categoryId: 0
}
const validationStyle = {
    color:'red',
    textAlign: 'center',
    display:'none'
} as React.CSSProperties;
const AddTask = () => {
    const dispatch = useAppDispatch();
    const [taskState, setTaskState] = useState<TaskInputType>(initialState);
    const [validationStyles, setValidationStyles] = useState<React.CSSProperties>(validationStyle);
    let categories : ICategory [] = useAppSelector(state => state.categories['categories']);
    const renderedCategories = categories.map(category => (
        <option value={category.categoryId} key={category.categoryId}>{category.categoryName}</option>
    ))
    function randomNumber() {
        let number = Math.floor(Math.random()*100000);
        console.log(number)
        return number;
    }
    function handleChange(event: ChangeEvent<HTMLInputElement>) : void {
        console.log(taskState);
        const {name , value} = event.target;
        setTaskState({...taskState, [name]: value});
    }
    function handleSubmit(e: FormEvent<HTMLFormElement>) : void{
        e.preventDefault();
        if(taskState.taskName === ''){
            setValidationStyles({...validationStyles, display:'block'});
        }
        else {
            setValidationStyles({...validationStyles, display:'none'});
            setTaskState({...taskState})
            if(taskState.dueDate === ''){
                setTaskState({...taskState, dueDate: null})
            }
            dispatch(
                tasksActions.fetchCreateTask({...taskState})
            )
            setTaskState(initialState);
        }
    }
    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) : void{
        const {value} = e.target;
        setTaskState({
            ...taskState,
            categoryId : Number(value)
        })
    }
    return (
        <div>
            <h1>Add Task</h1>
            <div className="add-task-form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        name="taskName"
                        id="taskName"
                        value={taskState?.taskName}
                        onChange={handleChange}
                    />
                    <div className="validation" style={validationStyles}>Task name is required</div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="datetime-local"
                        name="dueDate"
                        id="dueDate"
                        // @ts-ignore
                        value = {taskState?.dueDate.toString()}
                        onChange={handleChange}
                    />
                    <label htmlFor="categoryId">Category:</label>
                    <select id="categoryId" name="categoryId" value={taskState.categoryId}
                            onChange={handleSelectChange}>
                        <option value={0}>Choose category</option>
                        {renderedCategories}
                    </select>
                    <input type="submit" value="create task"/>
                </form>
            </div>
        </div>
    );
}

export default AddTask;