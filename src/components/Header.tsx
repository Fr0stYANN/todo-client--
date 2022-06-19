import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useAppDispatch} from "../hooks/redux";
import {categoryActions, tasksActions} from "../store/actions";


export default function Header(){
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(tasksActions.getCompletedTasks())
        dispatch(tasksActions.getNotCompletedTasks())
        dispatch(categoryActions.getAllCategories())
    },[])
    return (
        <header className="header">
            <ul className="nav">
                <li className="nav-item"><Link to='/'>tasks</Link></li>
                <li className="nav-item"><Link to='/categories'>categories</Link></li>
            </ul>
        </header>
    )
}