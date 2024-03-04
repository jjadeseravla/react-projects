import { useState } from 'react';
import Todos from './components/Todos';
import NewTodo from './components/NewTodo';

// type Todo = {
//   id: string;
//   text: string;
// }

function App() {

const [todos, setTodos] = useState<string[]>([]);
  const addTodoHandler = (text: string) => { 
    const newTodo = [text, ...todos];
    setTodos(newTodo);
    // setTodos((prevTodos) => {
    //   return prevTodos.concat(newTodo);
    // });
  };

  return (
    <div>
      <NewTodo onAddTodo={ addTodoHandler} />
      <Todos items={todos} />
    </div>
  );
}

export default App;
