import './todofilter.css';

import TodoFilterBtn from './TodoFilterBtn';

const TodoFilter = ({ filterBy, setFilterBy }) => {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="todo-filter">
      {filters.map((filter, index) => (
        <TodoFilterBtn
          key={index}
          filter={filter}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />
      ))}
    </div>
  );
};

export default TodoFilter;
