import { createContext, useEffect, useState } from 'react';

import { getFilteredTodos } from './utils';
import Header from './components/Header';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

export const FilterContext = createContext('all');

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkTheme, setDarkTheme] = useState(prefersDark);
  const [todoList, setTodoList] = useState(
    localStorage.getItem('todolist')
      ? JSON.parse(localStorage.getItem('todolist'))
      : [
          {
            id: '1',
            todo: 'Complete online Javascript course',
            isComplete: true,
          },
          {
            id: '2',
            todo: 'Jog around the park 3x',
            isComplete: false,
          },
          {
            id: '3',
            todo: '10 minutes meditation',
            isComplete: false,
          },
          {
            id: '4',
            todo: 'Read for 1 hour',
            isComplete: false,
          },
          {
            id: '5',
            todo: 'Pick up groceries',
            isComplete: false,
          },
          {
            id: '6',
            todo: 'Complete Todo App on Frontend Mentor',
            isComplete: false,
          },
        ]
  );
  const [newTodo, setNewTodo] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) =>
      e.matches ? setDarkTheme(true) : setDarkTheme(false)
    );

  const visibleTodos = getFilteredTodos(todoList, filterBy);

  const handleToggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false);
    } else {
      setDarkTheme(true);
    }
  };

  const updateTodoList = (list) => {
    localStorage.setItem('todolist', JSON.stringify(list));

    setTodoList(list);

    return;
  };

  const addTodo = (e) => {
    e.preventDefault();

    const newTodoId = todoList.length + 1;
    const updatedTodoList = [
      ...todoList,
      {
        id: newTodoId.toString(),
        todo: newTodo,
        isComplete: false,
      },
    ];

    updateTodoList(updatedTodoList);

    setNewTodo('');
  };

  const deleteTodo = (id) => {
    const filteredTodoList = todoList.filter((todo) => id !== todo.id);
    const updatedTodoList = filteredTodoList.map((todo, index) => {
      index++;

      return { ...todo, id: index.toString() };
    });

    updateTodoList(updatedTodoList);
  };

  const handleStatusChange = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      id == todo.id ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    updateTodoList(updatedTodoList);
  };

  const handleClearCompleted = () => {
    const activeTodoList = todoList.filter((todo) => !todo.isComplete);

    const updatedTodoList = activeTodoList.map((todo, index) => {
      const id = index + 1;

      return { ...todo, id: `${id.toString()}` };
    });

    updateTodoList(updatedTodoList);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const reorderedTodoList = reorder(
      todoList,
      source.index,
      destination.index
    );

    localStorage.setItem('todolist', JSON.stringify(reorderedTodoList));

    setTodoList(reorderedTodoList);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    let bodyClassName = 'theme--dark';

    if (!darkTheme) {
      bodyClassName = 'theme--light';
    }
    document.body.className = bodyClassName;
  }, [darkTheme]);

  return (
    <div className="app">
      <Header darkTheme={darkTheme} handleToggleTheme={handleToggleTheme} />
      <main className="main">
        <NewTodoForm
          addTodo={addTodo}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
        />
        <FilterContext.Provider value={{ filterBy, setFilterBy }}>
          <TodoList
            todoList={todoList}
            visibleTodos={visibleTodos}
            handleStatusChange={handleStatusChange}
            deleteTodo={deleteTodo}
            handleClearCompleted={handleClearCompleted}
            handleDragEnd={handleDragEnd}
            windowWidth={windowWidth}
          />
          {windowWidth < 768 && <TodoFilter />}
        </FilterContext.Provider>
        <p className="note">Drag and drop to reorder list</p>
      </main>
    </div>
  );
}

export default App;
