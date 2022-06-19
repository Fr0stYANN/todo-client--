import React from 'react'
import {useAppSelector} from "../hooks/redux";
import Category from './Category'
import AddCategory from "./AddCategory";

const CategoriesList = () => {
    const categories = useAppSelector(state => state.categories['categories']);
    // @ts-ignore
    const renderedCategories = categories.map((category) => <Category key = {category.categoryId} category={category}/>)
    return (
        <div>
            <AddCategory/>
            {renderedCategories}
        </div>
    )
}

export default CategoriesList;