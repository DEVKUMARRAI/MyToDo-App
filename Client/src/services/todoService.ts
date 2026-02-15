import axios from 'axios'
import type { Todo, CreateTodoDto } from '@/types/todo'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5075/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getAllTodos = async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
}

export const getTodoById = async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`)
    return response.data;
}

export const createTodo = async (newTodo: CreateTodoDto): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', newTodo);
    return response.data;
}

export const updateTodo = async (id: number, todo: Todo): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, todo);
    return response.data;
}

export const deleteTodo = async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
};