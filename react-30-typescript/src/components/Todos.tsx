import React from "react";
import classes from './Todos.module.css';
import { useContext } from "react";
import { TodosContext } from '../store/todos-context';

const Todos: React.FC = () => {

  const todosCtx = useContext(TodosContext);
  return (
    <>
      <ul className={classes.todos}>
        {todosCtx.items.map((item) => (
          <li
            key={item}
            className={classes.item}
            onClick={() => todosCtx.removeTodo(item)}
          >
              {item}
           </li>
           ))}
      </ul>
    </>
  )
}

export default Todos;