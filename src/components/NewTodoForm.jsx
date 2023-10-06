import './newtodoform.css';

const NewTodoForm = ({ addTodo, newTodo, setNewTodo }) => {
  return (
    <form className="newtodo__form" onSubmit={(e) => addTodo(e)}>
      <label className="newtodo__label">
        <input
          className="newtodo__input"
          id="newTodoInput"
          type="text"
          name="newtodo"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </label>
    </form>
  );
};

export default NewTodoForm;
