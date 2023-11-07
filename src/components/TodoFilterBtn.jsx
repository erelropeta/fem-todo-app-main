import { useContext } from 'react';

import './todofilterbtn.css';

import { FilterContext } from '../App';

const TodoFilterBtn = ({ filter }) => {
  const { filterBy, setFilterBy } = useContext(FilterContext);

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
