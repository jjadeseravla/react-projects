import React from "react";
import classes from './Todos.module.css';

const Todos: React.FC<{items: string[]}> = (props) => {
  return (
    <>
      <ul className={classes.todos}>
        {props.items.map((item) => (
          <li key={item}>{item}</li>
           ))}
      </ul>
    </>
  )
}

export default Todos;