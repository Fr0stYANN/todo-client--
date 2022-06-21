import {AnyAction, applyMiddleware, combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import {tasksReducer} from './reducers/taskReducer'
import {categoryReducer} from './reducers/categoryReducer'
import {dataProviderReducer} from "./reducers/dataProviderReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {exactCategoryChoosenReducer} from "./reducers/exactCategoryChoosenReducer";
import {combineEpics, createEpicMiddleware} from 'redux-observable'
import {
    getCompletedTasksEpic,
    getNotCompletedTasksEpic,
    addTaskEpic,
    fetchSetTaskDoneEpic,
    fetchRemoveTaskEpic,
    editTaskEpic,
} from '../graphql/epics/tasksEpics'

import {changeDataProviderEpic,
    fetchDataProviderEpic} from '../graphql/epics/dataProviderEpics'
import {getCategoriesEpic, deleteCategoryEpic, editCategoryEpic, addCategoryEpic} from "../graphql/epics/categoriesEpics";
import {Observable} from "rxjs";
const epicMiddleware = createEpicMiddleware();

// @ts-ignore
const rootEpic = combineEpics(getCompletedTasksEpic, getNotCompletedTasksEpic, getCategoriesEpic, addTaskEpic,
    fetchSetTaskDoneEpic, fetchRemoveTaskEpic, editTaskEpic, deleteCategoryEpic, editCategoryEpic, addCategoryEpic,
    changeDataProviderEpic, fetchDataProviderEpic);

const rootReducer = combineReducers({
    tasks: tasksReducer,
    categories: categoryReducer,
    exactCategory:  exactCategoryChoosenReducer,
    dataProvider: dataProviderReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)))
// @ts-ignore
epicMiddleware.run(rootEpic)

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']