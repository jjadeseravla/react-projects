import TodoContextProvider from './store/todos-context';
import Todos from './components/Todos';
import NewTodo from './components/NewTodo';

// type Todo = {
//   id: string;
//   text: string;
// }

function App() {

  return (
    <TodoContextProvider>
      <NewTodo/>
      <Todos />
    </TodoContextProvider>
  );
}

export default App;
