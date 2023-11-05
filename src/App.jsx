import { useEffect, useState } from 'react';
import Header from './components/Header';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkTheme, setDarkTheme] = useState(prefersDark);
  const [todoList, setToDoList] = useState([
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
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [activeCount, setActiveCount] = useState(todoList.length);
  const [filterBy, setFilterBy] = useState('all');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) =>
      e.matches ? setDarkTheme(true) : setDarkTheme(false)
    );

  const getFilteredTodos = (todos, filter) => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.isComplete);
    } else {
      return todos;
    }
  };

  const visibleTodos = getFilteredTodos(todoList, filterBy);

  const handleToggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false);
    } else {
      setDarkTheme(true);
    }
  };

  const countActive = (list) => {
    const activeTodoList = list.filter((todo) => !todo.isComplete);

    return activeTodoList.length;
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

    localStorage.setItem('todolist', JSON.stringify(updatedTodoList));

    setToDoList(updatedTodoList);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    const filteredTodoList = todoList.filter((todo) => id !== todo.id);
    const updatedTodoList = filteredTodoList.map((todo, index) => {
      index++;

      return { ...todo, id: index };
    });

    localStorage.setItem('todolist', JSON.stringify(updatedTodoList));

    setToDoList(updatedTodoList);
  };

  const handleStatusChange = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      id == todo.id ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    localStorage.setItem('todolist', JSON.stringify(updatedTodoList));

    setToDoList(updatedTodoList);
  };

  const handleClearCompleted = () => {
    const activeTodoList = todoList.filter((todo) => !todo.isComplete);

    const newTodoList = activeTodoList.map((todo, index) => {
      const id = index + 1;

      return { ...todo, id: `${id.toString()}` };
    });

    localStorage.setItem('todolist', JSON.stringify(newTodoList));

    setToDoList(newTodoList);
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

    setToDoList(reorderedTodoList);
  };

  useEffect(() => {
    const localTodoList = localStorage.getItem('todolist');

    if (localTodoList) {
      setToDoList(JSON.parse(localTodoList));
    } else {
      localStorage.setItem('todolist', JSON.stringify(todoList));
    }

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

  useEffect(() => {
    setActiveCount(countActive(todoList));
  }, [todoList, filterBy]);

  return (
    <div className="app">
      <Header darkTheme={darkTheme} handleToggleTheme={handleToggleTheme} />
      <main className="main">
        <NewTodoForm
          addTodo={addTodo}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
        />
        <TodoList
          visibleTodos={visibleTodos}
          handleStatusChange={handleStatusChange}
          deleteTodo={deleteTodo}
          activeCount={activeCount}
          handleClearCompleted={handleClearCompleted}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          handleDragEnd={handleDragEnd}
          windowWidth={windowWidth}
        />
        {windowWidth < 768 && (
          <TodoFilter filterBy={filterBy} setFilterBy={setFilterBy} />
        )}
        <p className="note">Drag and drop to reorder list</p>
      </main>
    </div>
  );
}

export default App;
