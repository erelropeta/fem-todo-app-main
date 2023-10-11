import './todolist.css';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const TodoList = ({
  filteredTodos,
  handleStatusChange,
  deleteTodo,
  activeCount,
  handleClearCompleted,
  handleDragEnd,
}) => {
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
              {filteredTodos.map((todo, index) => {
                return (
                  <TodoItem
                    key={todo.id}
                    index={index}
                    {...todo}
                    handleStatusChange={handleStatusChange}
                    deleteTodo={deleteTodo}
                  />
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
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
