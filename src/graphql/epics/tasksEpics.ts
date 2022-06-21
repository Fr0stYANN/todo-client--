import {Epic, ofType} from 'redux-observable'
import {RootState} from "../../store/store";
import {filter, from, map, mergeMap} from "rxjs";
import {GET_COMPLETED_TASKS_QUERY, GET_NOT_COMPLETED_TASKS_QUERY} from "../tasks-management/tasksQueries";
import {tasksActions} from '../../store/actions'
import {ITask} from "../../models/ITask";
import {TaskInputType} from "../../models/TaskInputType";



export const getCompletedTasksEpic: Epic<ReturnType<typeof tasksActions.getCompletedTasks>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('GET_COMPLETED_TASKS'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: GET_COMPLETED_TASKS_QUERY
                }),
            }).then((res) => res.json())
                .then(result => tasksActions.setTasks(result.data.tasks.completedTasks as ITask[])))
        )
    );
}
export const getNotCompletedTasksEpic: Epic<ReturnType<typeof tasksActions.getNotCompletedTasks>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('GET_NOT_COMPLETED_TASKS'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: GET_NOT_COMPLETED_TASKS_QUERY
                }),
            }).then((res) => res.json())
                .then(result => tasksActions.setTasks(result.data.tasks.notCompletedTasks as ITask[])))
        )
    )
}

function CheckDueDate(task: TaskInputType): string {
    if (task.dueDate == '') {
        let str = `
                        mutation CreateTask{
                               tasksMutations{
                                  createTask(task:{taskName:"${task.taskName}", categoryId: ${task.categoryId}, dueDate: null}){
                                                    taskId
                                                    taskName
                                                    dueDate
                                                    isDone
                                                    doneDate
                                                    categoryId
                                  }
                        }
                    }
`
        return str;
    } else {
        let str = `
                        mutation CreateTask{
                               tasksMutations{
                                  createTask(task:{taskName:"${task.taskName}", categoryId: ${task.categoryId}, dueDate: "${task.dueDate}"}){
                                                    taskId
                                                    taskName
                                                    dueDate
                                                    isDone
                                                    doneDate
                                                    categoryId
                                  }
                        }
                    }
`
        return str;
    }
}

export const addTaskEpic: Epic<ReturnType<typeof tasksActions.fetchCreateTask>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('FETCH_CREATE_TASK'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: CheckDueDate(action.payload)
                    })
                }
            ).then(res => res.json())
                .then(result => tasksActions.addTask(result.data.tasksMutations.createTask as ITask)))
        )
    )
}

export const fetchSetTaskDoneEpic: Epic<ReturnType<typeof tasksActions.fetchSetTaskDone>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('FETCH_SET_TASK_DONE'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                mutation UpdateTask{
                          tasksMutations{
                             updateTask(taskId: ${action.payload}){
                                            taskId
                                            taskName
                                            doneDate
                                                }
                                             }
                                          }
                                            `
                })
            }).then(res => res.json())
                .then(result => tasksActions.taskSetDone({
                    taskId: action.payload,
                    date: result.data.tasksMutations.updateTask.doneDate
                })))))
    //.then(result => console.log(result)))))
}

export const fetchRemoveTaskEpic: Epic<ReturnType<typeof tasksActions.fetchRemoveTask>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('FETCH_REMOVE_TASK'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                       mutation DeleteTask{
                                tasksMutations{
                            deleteTask(taskId:${action.payload})
                       }
                     }
                     `
                })
            }).then(res => res.json())
                .then(result => tasksActions.removeTask(action.payload)))))
}

function compareDates(task: ITask) {
    let dueDate = '';
    if (task.dueDate == null) {
        dueDate = "null"
    } else {
        dueDate = `"${task.dueDate}"`
    }
    return `
       
                       mutation EditTask{
                                tasksMutations{
                            editTask(task:{taskId: ${task.taskId}, taskName: "${task.taskName}", 
                            categoryId: ${task.categoryId}, dueDate:${dueDate}, 
                            doneDate: null, isDone: ${task.isDone}}){
                                taskId
                                taskName
                                dueDate
                                doneDate
                                isDone
                                categoryId
                            }
                       }
                     }
    `
}

export const editTaskEpic: Epic<ReturnType<typeof tasksActions.fetchEditTask>, any, RootState> = (action$, state$) => {
    console.log('I`m Here');
    return action$.pipe(
        ofType('FETCH_EDIT_TASK'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: compareDates(action.payload)
                })
            }).then(res => res.json())
                .then(result => tasksActions.editTask(result.data.tasksMutations.editTask))))
    )
}