import React from 'react'
import {useAppSelector} from "../hooks/redux";
import Category from './Category'
import AddCategory from "./AddCategory";
import {ICategory} from "../models/ICategory";

const CategoriesList = () => {
    const categories : ICategory[] = useAppSelector(state => state.categories['categories']);
    const renderedCategories = categories.map((category) => <Category key = {category.categoryId} category={category}/>)
    return (
        <div>
            <AddCategory/>
            {renderedCategories}
        </div>
    )
}

export default CategoriesList;