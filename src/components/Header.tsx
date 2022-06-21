import {Link} from "react-router-dom";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {categoryActions, tasksActions, dataProviderActions} from "../store/actions";


export default function Header(){
    const dispatch = useAppDispatch();
    const [providerName, setProviderName] = useState<string>(useAppSelector(state => state.dataProvider['dataProvider']));
    useEffect(() => {
        dispatch(tasksActions.getCompletedTasks())
        dispatch(tasksActions.getNotCompletedTasks())
        dispatch(categoryActions.getAllCategories())
        dispatch(dataProviderActions.fetchDataProvider())
        console.log(providerName);
    },[])
    function handleChange(e: ChangeEvent<HTMLSelectElement>) : void{
        const {value} = e.target;
        setProviderName(value);
        console.log(providerName)
    }
    function handleSubmit(e: FormEvent<HTMLFormElement>) : void{
            e.preventDefault();
            console.log(providerName)
            dataProviderActions.fetchChangeDataProvider(providerName)
    }
    return (
        <header className="header">
            <ul className="nav">
                <li className="nav-item"><Link to='/'>tasks</Link></li>
                <li className="nav-item"><Link to='/categories'>categories</Link></li>
            </ul>
            <form onSubmit={handleSubmit}>
                <select id="dataProviderName" name="dataProviderName" value={providerName} onChange={handleChange}>
                    <option value="0">ChooseDataProvider</option>
                    <option value="SQL">SQL</option>
                    <option value="XML">XML</option>
                </select>
                <input type="submit" value="changeProvider"/>
            </form>
        </header>
    )
}