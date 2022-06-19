import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ITask} from "../models/ITask";
import {tasksActions} from '../store/actions'
type Params = {
    taskId: string;
};
const initialState : ITask = {
    taskId: Math.random()*100000,
    taskName: '',
    dueDate: new Date(),
    doneDate: new Date(),
    isDone:false,
    categoryId: 0
}
const EditTask = () => {
    const {taskId} = useParams<Params>();
    let taskIdNumber : number = Number(taskId);
    const dispatch = useAppDispatch();
    // @ts-ignore
    const task = useAppSelector(state => state.tasks['tasks'].find(
        (task : ITask) => task.taskId === taskIdNumber));
    const [taskData, setTaskData] = useState<ITask>(initialState);
    const navigate = useNavigate();
    useEffect(() => {
        if(task !== undefined){
            setTaskData(task);
        }
    },[])
    // @ts-ignore
    const renderedCategories = useAppSelector(state=> state.categories['categories'].map(category => (
        <option value={category.categoryId} key={category.categoryId}>{category.categoryName}</option>
    )))
    const handleChange = (event: ChangeEvent<HTMLInputElement>) : void  => {
        const {name , value} = event.target;
        if(taskData !== undefined)
            setTaskData({...taskData, [name]: value});
    }
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) : void => {
        const {name, value} = e.target;
        if(taskData !== undefined)
            setTaskData({
                ...taskData,
                [name] : value
            })
    }
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(taskData !== undefined) {
            dispatch(
                tasksActions.fetchEditTask({...taskData})
            )
        }
        setTimeout(() => navigate('/'),1000)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="taskName">Task Name:</label>
                <input
                    type="text"
                    name="taskName"
                    id="taskName"
                    value={taskData?.taskName}
                    onChange={handleChange}
                />
                <label htmlFor="dueDate">Due Date:</label>
                <input
                    type="datetime-local"
                    name="dueDate"
                    id="dueDate"
                    value={`${taskData?.dueDate}`}
                    onChange={handleChange}
                />
                <label htmlFor="categoryId">Category:</label>
                <select id="categoryId" name="categoryId"
                        value={taskData?.categoryId}
                        onChange={e => setTaskData({...taskData, categoryId: Number(e.currentTarget.value)})}>
                    {renderedCategories}
                </select>
                <input type="submit" value="edit task"/>
            </form>
        </div>
    )
}

export default EditTask;