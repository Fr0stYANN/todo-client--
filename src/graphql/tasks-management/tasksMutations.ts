import {gql} from '@apollo/client'

export const CREATE_TASK_MUTATION = `
    mutation CreateTask($task: taskInput!){
    tasksMutations{
        createTask(task: $task){
            taskId
            taskName
        }
    }
}
`

export const SET_TASK_STATUS_MUTATION = `
   mutation UpdateTask($taskId: Int!){
       tasksMutations{
           updateTask(taskId: $taskId){
                   taskId
                   taskName
           }
       }
   }  
`
export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($taskId: Int!){
  tasksMutations{
    deleteTask(taskId: $taskId)
  }
}
`
export const CHANGE_DATA_PROVIDER = gql`
  mutation ChangeDataProvider($providerName: !String){
  tasksMutations{
    changeDataProvider(providerName: $providerName)
  }
}
`