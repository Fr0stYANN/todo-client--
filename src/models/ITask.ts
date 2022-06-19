export type ITask = {
    taskId: number;
    taskName: string;
    dueDate: Date | string;
    doneDate: Date | string;
    isDone: boolean;
    categoryId: number;
}