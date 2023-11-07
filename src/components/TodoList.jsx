import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './todolist.css';

import { getFilteredTodos } from '../utils';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

const TodoList = ({
  todoList,
  visibleTodos,
  handleClearCompleted,
  handleDragEnd,
  windowWidth,
}) => {
  const activeCount = getFilteredTodos(todoList, 'active').length;

  return (
    <section className="c-todo__list">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              className="todo__list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {visibleTodos.map((todo, index) => {
                return <TodoItem key={todo.id} index={index} {...todo} />;
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="c-summary">
        <p className="summary">{activeCount} items left</p>
        {windowWidth >= 768 && <TodoFilter />}
        <button className="summary__clear-btn" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </section>
  );
};

export default TodoList;
