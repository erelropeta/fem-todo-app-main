import './todoitem.css';
import CheckIcon from '../assets/images/icon-check.svg';
import CrossIcon from '../assets/images/icon-cross.svg';
import { Draggable } from 'react-beautiful-dnd';

const TodoItem = ({
  index,
  id,
  todo,
  isComplete,
  handleStatusChange,
  deleteTodo,
}) => {
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
            onClick={() => deleteTodo(id)}
          />
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
