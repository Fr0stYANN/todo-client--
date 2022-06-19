import React, {FormEvent, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {categoryActions} from '../store/actions'
type Params = {
    categoryId: string;
}
const EditCategory = () => {
    const {categoryId} = useParams<Params>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categoryIdNumber : number = Number(categoryId);
    // @ts-ignore
    const category = useAppSelector(state => state.categories['categories'].find((category) =>
        category.categoryId === categoryIdNumber));
    const [categoryName, setCategoryName] = useState<string>('');
    useEffect(()=>{
        if(category !== undefined){
            setCategoryName(category.categoryName);
        }},[])
    const handleSubmit = (e : FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(category !== undefined) {
            dispatch(
                categoryActions.fetchEditCategory({
                    categoryId: category.categoryId,
                    categoryName: categoryName})
            )
        }
        navigate('/categories');
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="categoryName">Category Name:</label>
                <input type="text"
                       id="categoryName"
                       name="categoryName"
                       value={categoryName}
                       onChange={(e) => setCategoryName(e.currentTarget.value)}
                />
                <input type="submit" value="edit category"/>
            </form>
        </div>
    )
}

export default EditCategory