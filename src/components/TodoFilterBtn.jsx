import { useContext } from 'react';

import './todofilterbtn.css';

import { FilterContext } from '../App';

const TodoFilterBtn = ({ filter }) => {
  const { filterBy, setFilterBy } = useContext(FilterContext);

  let btnClassName =
    filter == filterBy
      ? 'todo-filter__btn  todo-filter__btn--active'
      : 'todo-filter__btn';

  return (
    <button className={btnClassName} onClick={() => setFilterBy(filter)}>
      {filter}
    </button>
  );
};

export default TodoFilterBtn;
