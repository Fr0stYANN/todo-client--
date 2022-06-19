export type TaskInputType = {
    taskId?: number;
    taskName: string;
    dueDate?: Date | string | null;
    categoryId: number;
}