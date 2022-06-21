import {ITask} from "../../models/ITask";
import {TaskActionTypes} from "../actions";
import {Reducer} from "react";

interface TaskState {
    tasks: ITask[];
}

const initialState: TaskState = {
    tasks: []
}

export const tasksReducer:Reducer<typeof initialState,TaskActionTypes> = (state = initialState, action) : TaskState => {
     switch (action.type){
         case 'ADD_TASK':
             console.log(action.payload);
             action.payload.taskId = Number(action.payload.taskId);
         return {tasks: [...state.tasks, action.payload as ITask]};
         case 'REMOVE_TASK':
             let newState = [...state.tasks]
             newState = newState.filter((task) => task.taskId !== action.payload)
             return {tasks: [...newState]};
         case 'EDIT_TASK':
            action.payload.taskId = Number(action.payload.taskId)
            let newTasks = state.tasks.map((task) => task.taskId === action.payload.taskId ? {
                taskId: action.payload.taskId,
                taskName: action.payload.taskName,
                dueDate: action.payload.dueDate,
                doneDate: action.payload.doneDate,
                isDone: action.payload.isDone,
                categoryId: action.payload.categoryId
             } : task);
             return {...state, tasks: [...newTasks]}
         case 'TASK_SET_DONE':
             let tasks = state.tasks.map((task) => task.taskId === action.payload.taskId
                 ? {...task, isDone: true, doneDate: action.payload.date} : task);
             return {
                 tasks: tasks
             }
         case 'SET_TASKS':
             for(let i = 0; i < action.payload.length; i++){
                 action.payload[i].taskId = Number(action.payload[i].taskId);
             }
             let newTasksArray  = state.tasks.concat(action.payload)
             return {tasks: [...newTasksArray]}
         default:
             return {...state};
     }
}