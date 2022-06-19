import {ICategory} from "../../models/ICategory";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Reducer} from "react";
import {CategoryActionCreatorType, CategoryActionTypes} from "../actions";

interface CategoryState {
    categories: ICategory[];
}

const initialState: CategoryState = {
    categories: []
}

export const categoryReducer : Reducer<typeof initialState, CategoryActionTypes> = (state = initialState, action):CategoryState => {
           switch (action.type){
               case 'ADD_CATEGORY':
                   action.payload.categoryId = Number(action.payload.categoryId)
                   return {...state, categories: [...state.categories, action.payload]}
               case 'EDIT_CATEGORY':
                   action.payload.categoryId = Number(action.payload.categoryId);
                   let newCategories : ICategory [] = state.categories.map((category) => category.categoryId === action.payload.categoryId ? {
                       categoryId: action.payload.categoryId,
                       categoryName: action.payload.categoryName
                   } : category);
                   return {categories: [...newCategories]}
               case 'DELETE_CATEGORY':
                   let newState = [...state.categories];
                   newState = newState.filter((category) => category.categoryId !== action.payload)
                   return {categories: [...newState]}
               case 'SET_CATEGORIES':
                   for(let i = 0; i < action.payload.length; i++){
                       action.payload[i].categoryId = Number(action.payload[i].categoryId);
                   }
                   let newCategoriesArray = state.categories.concat(action.payload);
                   return {categories: [...newCategoriesArray]}
               default:return {...state}
           }
}
/*name: 'categories',
    initialState,
    reducers: {
    categoryAdded(state: CategoryState, action: PayloadAction<ICategory>) {
        state.categories.push(action.payload);
    },
    categoryDeleted(state: CategoryState, action: PayloadAction<{ categoryId: number }>) {
        state.categories = state.categories.filter((category) => category.categoryId !==
            action.payload.categoryId);
    },
    categoryEdited(state: CategoryState, action: PayloadAction<ICategory>) {
        const {categoryId, categoryName} = action.payload;
        state.categories = state.categories.map((category) => category.categoryId === categoryId
            ? {
                categoryId: categoryId, categoryName: categoryName
            } : category);
    }
}*/