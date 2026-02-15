export interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
    createdAt: string;
}

export interface CreateTodoDto {
    title: string;
}

export interface UpdateTodoDto {
    title?: string;
    isCompleted?: boolean;
}