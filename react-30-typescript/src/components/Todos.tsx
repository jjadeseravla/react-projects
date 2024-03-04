import React from "react";
import classes from './Todos.module.css';

const Todos: React.FC<{ items: string[]; removeTodo: (item: string) =>  void}> = (props) => {

  return (
    <>
      <ul className={classes.todos}>
        {props.items.map((item) => (
          <li
            key={item}
            className={classes.item}
            // onClick={props.removeTodo}
            onClick={() => props.removeTodo(item)}
          >
              {item}
           </li>
           ))}
      </ul>
    </>
  )
}

export default Todos;