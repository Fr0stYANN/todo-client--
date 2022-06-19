import React from 'react'
import {ICategory} from "../models/ICategory";
import {useAppDispatch} from "../hooks/redux";
import {Link} from "react-router-dom";
import {categoryActions} from '../store/actions'
interface ExpectedProps {
    category: ICategory;
}

const Category = (props: ExpectedProps) => {
    const dispatch = useAppDispatch();
    return(
        <div className="category-container">
            <div className="category-name">{props.category.categoryName}</div>
            <button onClick={() => dispatch(categoryActions.fetchDeleteCategory(props.category.categoryId))}>Delete category</button>
            <Link to={`edit-category/${props.category.categoryId}`}>
                <button>Edit category</button>
            </Link>
        </div>
    )
}

export default Category;