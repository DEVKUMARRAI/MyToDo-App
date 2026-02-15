import { useState } from 'react';
import type { CreateTodoDto } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddTodoFormProps {
  onAdd: (data: CreateTodoDto) => Promise<void>;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await onAdd({ title: title.trim() });
      setTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        className="flex-1 h-11 text-base"
      />
      <Button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="h-11 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md"
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Adding...
          </>
        ) : (
          <>
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </>
        )}
      </Button>
    </form>
  );
}
