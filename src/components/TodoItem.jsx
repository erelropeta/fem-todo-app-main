import './todoitem.css';
import CheckIcon from '../assets/images/icon-check.svg';
import CrossIcon from '../assets/images/icon-cross.svg';

const TodoItem = ({ id, todo, isComplete, handleStatusChange, deleteTodo }) => {
  return (
    <li className="todo__item">
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
          <img src={CheckIcon} alt="" />
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
  );
};

export default TodoItem;
