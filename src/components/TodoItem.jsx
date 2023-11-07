import { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './todoitem.css';
import CheckIcon from '../assets/images/icon-check.svg';
import CrossIcon from '../assets/images/icon-cross.svg';

import { TodoListContext, UpdateTodoListContext } from '../App';

const TodoItem = ({ index, id, todo, isComplete }) => {
  const todoList = useContext(TodoListContext);
  const updateTodoList = useContext(UpdateTodoListContext);

  const handleStatusChange = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      id == todo.id ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    updateTodoList(updatedTodoList);
  };

  const handleDeleteTodo = (id) => {
    const filteredTodoList = todoList.filter((todo) => id !== todo.id);
    const updatedTodoList = filteredTodoList.map((todo, index) => {
      index++;

      return { ...todo, id: index.toString() };
    });

    updateTodoList(updatedTodoList);
  };

  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <li
          className="todo__item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            className="todo__checkbox"
            id={id}
            type="checkbox"
            name={todo}
            onChange={() => handleStatusChange(id)}
            checked={isComplete}
          />
          <label className="todo__label" htmlFor={id}>
            <span className="todo__checkbox--visible">
              <img className="todo__check-icon" src={CheckIcon} alt="" />
            </span>
            {todo}
          </label>
          <input
            className="todo__delete-btn"
            type="image"
            src={CrossIcon}
            alt="Delete"
            onClick={() => handleDeleteTodo(id)}
          />
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
