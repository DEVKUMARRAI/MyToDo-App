import { useState, useEffect } from 'react';
import type { Todo, CreateTodoDto } from '@/types/todo';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '@/services/todoService';
import { TodoItem } from './TodoItem';
import { AddTodoForm } from './AddTodoForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Error fetching todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (data: CreateTodoDto) => {
    try {
      const newTodo = await createTodo(data);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error('Error creating todo:', err);
      throw err;
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo: Todo = {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
      const result = await updateTodo(id, updatedTodo);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? result : t))
      );
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const completedCount = todos.filter((t) => t.isCompleted).length;
  const totalCount = todos.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your todos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto border-destructive/50">
        <CardContent className="pt-6">
          <p className="text-center text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create New Task</CardTitle>
          <CardDescription>Add a new task to your list</CardDescription>
        </CardHeader>
        <CardContent>
          <AddTodoForm onAdd={handleAddTodo} />
        </CardContent>
      </Card>

      {totalCount > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur rounded-lg border">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="font-medium">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {totalCount - completedCount} remaining
          </div>
        </div>
      )}

      <div className="space-y-3">
        {todos.length === 0 ? (
          <Card className="shadow-md border-dashed border-2">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <Circle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground">
                  Create your first task above to get started!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
