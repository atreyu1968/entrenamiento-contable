import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No hay tareas pendientes
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center py-4 px-2 hover:bg-gray-50"
        >
          {todo.completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
          <span className={`ml-3 ${
            todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {todo.title}
          </span>
        </li>
      ))}
    </ul>
  );
}