import TodoItem from './TodoItem';
import './todolist.css';

const TodoList = ({ todoList, handleStatusChange }) => {
  return (
    <ul className="todo__list">
      {todoList.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            {...todo}
            handleStatusChange={handleStatusChange}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
