import React from 'react';
import { useState } from 'react';

type TodosContextObj = {
  items: string[];
  onAddTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  onAddTodo: () => { },
  removeTodo: (text: string) => {}
});

const TodoContextProvider: React.FC = (props) => {

  const [todos, setTodos] = useState<string[]>([]);
  const addTodoHandler = (text: string) => {
    const newTodo = [text, ...todos];
    setTodos(newTodo);
    // setTodos((prevTodos) => {
    //   return prevTodos.concat(newTodo);
    // });
  };

  const removeTodo = (todoText: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo !== todoText)
    });
  }
  console.log('todo', todos);

  const contextValue: TodosContextObj = {
    items: todos,
    onAddTodo: addTodoHandler,
    removeTodo: removeTodo
  }


  return <TodosContext.Provider
  value={contextValue}>
    {props.children}
  </TodosContext.Provider>
};

export default TodoContextProvider;