import { useEffect, useState } from 'react';
import Header from './components/Header';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkTheme, setDarkTheme] = useState(prefersDark);
  const [todoList, setToDoList] = useState([
    {
      id: 1,
      todo: 'Complete online Javascript course',
      isComplete: true,
    },
    {
      id: 2,
      todo: 'Jog around the park 3x',
      isComplete: false,
    },
    {
      id: 3,
      todo: '10 minutes meditation',
      isComplete: false,
    },
    {
      id: 4,
      todo: 'Read for 1 hour',
      isComplete: false,
    },
    {
      id: 5,
      todo: 'Pick up groceries',
      isComplete: false,
    },
    {
      id: 6,
      todo: 'Complete Todo App on Frontend Mentor',
      isComplete: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [activeCount, setActiveCount] = useState(todoList.length);

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) =>
      e.matches ? setDarkTheme(true) : setDarkTheme(false)
    );

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
        id: newTodoId,
        todo: newTodo,
        isComplete: false,
      },
    ];

    setToDoList(updatedTodoList);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    const filteredTodoList = todoList.filter((todo) => id !== todo.id);
    const updatedTodoList = filteredTodoList.map((todo, index) => {
      index++;

      return { ...todo, id: index };
    });

    setToDoList(updatedTodoList);
  };

  const handleStatusChange = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      id == todo.id ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    setToDoList(updatedTodoList);
  };

  useEffect(() => {
    let bodyClassName = 'theme--dark';

    if (!darkTheme) {
      bodyClassName = 'theme--light';
    }
    document.body.className = bodyClassName;
  }, [darkTheme]);

  useEffect(() => {
    setActiveCount(countActive(todoList));
    console.log(todoList);
  }, [todoList]);

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
          todoList={todoList}
          handleStatusChange={handleStatusChange}
          deleteTodo={deleteTodo}
          activeCount={activeCount}
        />
      </main>
    </div>
  );
}

export default App;
