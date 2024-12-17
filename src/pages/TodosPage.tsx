import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import TodoList from '../components/todos/TodoList';

export default function TodosPage() {
  const { todos, isLoading, error, fetchTodos } = useTodos();

  React.useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Lista de Tareas
      </h1>
      <div className="bg-white shadow-sm rounded-lg">
        <TodoList todos={todos} />
      </div>
    </div>
  );
}