import React, {FormEvent, useState} from 'react'
import {useAppDispatch} from "../hooks/redux";
import {categoryActions} from '../store/actions'

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useAppDispatch();
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            categoryActions.fetchAddCategory({categoryName: categoryName})
        )
        setCategoryName('')
    }
    function randomNumber() {
        let number = Math.floor(Math.random()*100000);
        console.log(number)
        return number;
    }
    return(
        <div className="AddCategoryContainer">
            <form onSubmit={handleSubmit}>
                <label htmlFor="categoryName">Category Name:</label>
                <input type="text"
                       name="categoryName"
                       id="categoryId"
                       value={categoryName}
                       onChange={(e) => setCategoryName(e.currentTarget.value)}
                />
                <input type="submit" value="add category"/>
            </form>
        </div>
    )
}
export default AddCategory;