import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Reducer} from "react";
import {exactCategoryActionTypes} from "../actions";

interface InitialStateInterface {
    exactCategoryChoosen: string,
    categoryId: number;
}

const initialState: InitialStateInterface = {
    exactCategoryChoosen: '',
    categoryId: 0
}
export const exactCategoryChoosenReducer: Reducer<typeof initialState, exactCategoryActionTypes> = (state = initialState, action): InitialStateInterface  => {
    switch (action.type){
        case "CHANGE_EXACT_CATEGORY":
             let categoryIdState : number  = state.categoryId
            categoryIdState = action.payload;
            return {...state, categoryId: action.payload }
        default:
            return {...state}
    }
}
