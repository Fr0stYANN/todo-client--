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
             // @ts-ignore
            action.payload.taskId = Number(action.payload.taskId)
            let newTasks = state.tasks.map((task) => task.taskId === action.payload.taskId ? {
                taskId: action.payload.taskId,
                taskName: action.payload.taskName,
                dueDate: action.payload.dueDate,
                // @ts-ignore
                doneDate: action.payload.doneDate,
                // @ts-ignore
                isDone: action.payload.isDone,
                categoryId: action.payload.categoryId
             } : task);
             // @ts-ignore
             return {...state, tasks: [...newTasks]}
         case 'TASK_SET_DONE':
             // @ts-ignore
             let tasks = state.tasks.map((task) => task.taskId === action.payload.taskId
                 // @ts-ignore
                 ? {...task, isDone: true, doneDate: action.payload.date} : task);
             return {
                 tasks: tasks
             }
         case 'SET_TASKS':
             // @ts-ignore
             for(let i = 0; i < action.payload.length; i++){
                 // @ts-ignore
                 action.payload[i].taskId = Number(action.payload[i].taskId);
             }
             // @ts-ignore
             let newTasksArray  = state.tasks.concat(action.payload)
             return {tasks: [...newTasksArray]}
         default:
             return {...state};
     }
}
/*
export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state:TaskState, action: PayloadAction<ITask[]>){
            state.tasks.concat(action.payload);
        },
        taskAdded(state: TaskState, action: PayloadAction<ITask>) {
            state.tasks.push(action.payload)
        },
        taskRemoved(state: TaskState, action: PayloadAction<{ taskId: number }>) {
            state.tasks = state.tasks.filter((task) => task.taskId !== action.payload.taskId)
        },
        taskDone(state: TaskState, action: PayloadAction<{ taskId: number }>) {
            state.tasks = state.tasks.map((task) => task.taskId === action.payload.taskId
                ? {...task, isDone: true, doneDate: new Date()} : task);
        },
        taskEdited(state: TaskState, action: PayloadAction<ITask>) {
            const {taskId, taskName, dueDate, doneDate, isDone, categoryId} = action.payload
            state.tasks = state.tasks.map((task) => task.taskId === taskId ? {
                taskId: taskId,
                taskName: taskName,
                dueDate: dueDate,
                doneDate: doneDate,
                isDone: isDone,
                categoryId: categoryId
            } : task);
        }
    }
})

export default taskSlice.reducer;
export const {taskAdded} = taskSlice.actions;
export const {taskRemoved} = taskSlice.actions;
export const {taskDone} = taskSlice.actions;
export const {taskEdited} = taskSlice.actions;
export const {setTasks} = taskSlice.actions;*/