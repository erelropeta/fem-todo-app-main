import TodoItem from './TodoItem';
import './todolist.css';

const TodoList = ({
  todoList,
  handleStatusChange,
  deleteTodo,
  activeCount,
  handleClearCompleted,
}) => {
  return (
    <section className="c-todo__list">
      <ul className="todo__list">
        {todoList.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              handleStatusChange={handleStatusChange}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
      <div className="c-summary">
        <p className="summary">{activeCount} items left</p>
        <button className="summary__clear-btn" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </section>
  );
};

export default TodoList;
