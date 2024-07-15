// import React from 'react';
import TodoCard from './TodoCard';
import AddTodoModal from './AddTodoModal';
import TodoFilter from './TodoFilter';
// import { useAppSelector } from '@/redux/hook';
import { useGetTodosQuery } from '@/redux/api/api';
import { JSX } from 'react/jsx-runtime';
import { useState } from 'react';

const TodoContainer = () => {
  const [priority, setPriority] = useState('')
  // from local data
  // const { todos } = useAppSelector((state) => state.todos);

  // from server
  const { data: todos, isLoading } = useGetTodosQuery(priority);
  console.log(todos);

  if (isLoading) {
    return <p>...loading</p>
  }
    return (
      <div>
        <div className="flex justify-between mb-5">
          <AddTodoModal></AddTodoModal>
          <TodoFilter priority={priority} setPriority={setPriority}></TodoFilter>
        </div>
        <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
          <div className="bg-white p-5 w-full h-full rounded-md space-y-3">
            {
              todos.data.map((item: JSX.IntrinsicAttributes & { id: string; task: string; description: string; isCompleted?: boolean | undefined; priority: string; }) => <TodoCard {...item}></TodoCard>)
            }
          </div>
        </div>
      </div>
    );
};

export default TodoContainer;