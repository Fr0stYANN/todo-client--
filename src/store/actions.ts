import {ITask} from '../models/ITask'
import {ICategory} from "../models/ICategory";
import {TaskInputType} from "../models/TaskInputType";
import {CategoryInputType} from "../models/CategoryInputType";

export const tasksActions = {
    addTask: (task : TaskInputType) => ({
        type: 'ADD_TASK',
        payload: task
    } as const),
    removeTask: (taskId: number) => ({
        type: 'REMOVE_TASK',
        payload: taskId
    } as const),
    taskSetDone: (taskId: number, date:string) => ({
        type: 'TASK_SET_DONE',
        payload: taskId, date
    } as const),
    fetchSetTaskDone: (taskId: number) => ({
        type: 'FETCH_SET_TASK_DONE',
        payload:taskId
    } as const),
    fetchRemoveTask: (taskId: number) => ({
        type: 'FETCH_REMOVE_TASK',
        payload: taskId
    } as const),
    fetchEditTask: (task: ITask) => ({
        type: 'FETCH_EDIT_TASK',
        payload: task
    } as const),
    editTask: (taskType: ITask) => ({
        type: 'EDIT_TASK',
        payload:taskType
    } as const),
    getNotCompletedTasks: () => ({
        type: 'GET_NOT_COMPLETED_TASKS',
        payload: null
    } as const),
    getCompletedTasks: () => ({
        type: 'GET_COMPLETED_TASKS',
        payload: null
    } as const),
    setTasks: (tasks: ITask[]) => ({
        type: 'SET_TASKS',
        payload: tasks
    } as const),
    fetchCreateTask: (task: TaskInputType) => ({
        type: 'FETCH_CREATE_TASK',
        payload: task
    })
}

export const categoryActions = {
    addCategory: (category: ICategory) => ({
        type: 'ADD_CATEGORY',
        payload: category
    } as const),
    deleteCategory: (categoryId: number) => ({
        type: 'DELETE_CATEGORY',
        payload: categoryId
    } as const),
    editCategory: (category: ICategory) => ({
        type: 'EDIT_CATEGORY',
        payload:category
    } as const),
    getAllCategories: () => ({
        type: 'GET_ALL_CATEGORIES',
        payload: null
    } as const),
    setCategories: (categories : ICategory[]) => ({
        type: 'SET_CATEGORIES',
        payload: categories
    } as const),
    fetchDeleteCategory: (categoryId: number) => ({
        type: 'FETCH_DELETE_CATEGORY',
        payload: categoryId
    } as const),
    fetchEditCategory: (categoryEdit: ICategory) => ({
        type: 'FETCH_EDIT_CATEGORY',
        payload:categoryEdit
    } as const),
    fetchAddCategory: (category: CategoryInputType) => ({
        type: 'FETCH_ADD_CATEGORY',
        payload:category
    } as const)
}

export const exactCategoryActions = {
    exactCategoryChanged : (categoryId: number) => ({
    type: 'CHANGE_EXACT_CATEGORY',
    payload: categoryId
    } as const)
}
type ValueOf<T> = T[keyof T]
export type TaskActionCreatorType = ValueOf<typeof tasksActions>
export type TaskActionTypes = ReturnType<TaskActionCreatorType>
export type CategoryActionCreatorType = ValueOf<typeof categoryActions>
export type CategoryActionTypes = ReturnType<CategoryActionCreatorType>
export type exactCategoryActionCreatorType = ValueOf<typeof exactCategoryActions>
export type exactCategoryActionTypes = ReturnType<exactCategoryActionCreatorType>