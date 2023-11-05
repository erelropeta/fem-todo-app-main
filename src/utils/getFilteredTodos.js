const getFilteredTodos = (todos, filter) => {
  if (filter === 'active') {
    return todos.filter((todo) => !todo.isComplete);
  } else if (filter === 'completed') {
    return todos.filter((todo) => todo.isComplete);
  } else {
    return todos;
  }
};

export default getFilteredTodos;
