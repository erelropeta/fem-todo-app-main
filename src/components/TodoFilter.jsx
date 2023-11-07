import './todofilter.css';

import TodoFilterBtn from './TodoFilterBtn';

const TodoFilter = () => {
  return (
    <div className="todo-filter">
      <TodoFilterBtn filter={'all'} />
      <TodoFilterBtn filter={'active'} />
      <TodoFilterBtn filter={'completed'} />
    </div>
  );
};

export default TodoFilter;
