import type { Todo } from '@/types/todo';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleToggle = () => {
    console.log('Checkbox clicked for todo:', todo.id);
    onToggle(todo.id);
  };

  return (
    <Card className="w-full transition-all hover:shadow-md border-l-4 border-l-transparent hover:border-l-blue-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4 flex-1">
          <Checkbox
            checked={todo.isCompleted}
            onCheckedChange={handleToggle}
            id={`todo-${todo.id}`}
            className="h-5 w-5"
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-1 cursor-pointer select-none text-base transition-all ${
              todo.isCompleted
                ? 'line-through text-muted-foreground'
                : 'text-foreground font-medium'
            }`}
          >
            {todo.title}
          </label>
        </div>

        <div className="flex items-center gap-2">
          {todo.isCompleted && (
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium">
              Done
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
