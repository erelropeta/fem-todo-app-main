import './todofilterbtn.css';

const TodoFilterBtn = ({ filter, filterBy, setFilterBy }) => {
  let btnClassName = 'todo-filter__btn';

  if (filter == filterBy) {
    btnClassName += ' todo-filter__btn--active';
  }

  return (
    <button className={btnClassName} onClick={() => setFilterBy(filter)}>
      {filter}
    </button>
  );
};

export default TodoFilterBtn;
