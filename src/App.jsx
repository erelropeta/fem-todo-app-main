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

  const addTodo = (e) => {
    e.preventDefault();

    let newTodo = e.target.querySelector('#newTodoInput').value;
    const newTodoId = todoList.length + 1;

    setToDoList([
      ...todoList,
      {
        id: newTodoId,
        todo: newTodo,
        status: 'active',
      },
    ]);

    e.target.querySelector('#newTodoInput').value = '';
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
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="app">
      <Header darkTheme={darkTheme} handleToggleTheme={handleToggleTheme} />
      <main className="main">
        <NewTodoForm addTodo={addTodo} />
        <TodoList todoList={todoList} handleStatusChange={handleStatusChange} />
      </main>
    </div>
  );
}

export default App;
