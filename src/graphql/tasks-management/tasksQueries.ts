import {gql} from '@apollo/client'


export const GET_COMPLETED_TASKS_QUERY = `
 query GetCompletedTasks{
     tasks{
        completedTasks{
         taskId
         taskName
         isDone
         doneDate
         categoryId
         dueDate
    }
  }
}
`
export const GET_NOT_COMPLETED_TASKS_QUERY = `
    query GetNotCompletedTasks{
          tasks{
              notCompletedTasks{
                        taskId
                        taskName
                        isDone
                        doneDate
                        categoryId
                        dueDate
              }
          }
    }
`
export const GET_TASK_BY_ID_QUERY = `
    query GetTaskById($taskId: Int!){
       tasks{
         task(taskId: $taskId){
                  taskId
                  taskName
                  isDone
                  categoryId
                  doneDate
                  dueDate
         }
       }
   }
    `