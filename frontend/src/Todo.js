import React from 'react';

const Todo = ({name, completed, onDelete, onToggle}) => (
  <li class="todo-element">
    <span
      style={{
        textDecoration: completed? 'line-through': 'none'
      }}
      onClick={onToggle}
      >
      {name}
    </span>
    <span onClick={onDelete} className="delete-btn"> X </span>
  </li>
)

export default Todo;
