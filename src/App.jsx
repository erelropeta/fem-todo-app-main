import { useEffect, useState } from 'react';
import Header from './components/Header';
import NewTodoForm from './components/NewTodoForm';

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkTheme, setDarkTheme] = useState(prefersDark);
  const [todoList, setToDoList] = useState([
    {
      id: 1,
      todo: 'Complete online Javascript course',
      status: 'complete',
    },
    {
      id: 2,
      todo: 'Jog around the park 3x',
      status: 'active',
    },
    {
      id: 3,
      todo: '10 minutes meditation',
      status: 'active',
    },
    {
      id: 4,
      todo: 'Read for 1 hour',
      status: 'active',
    },
    {
      id: 5,
      todo: 'Pick up groceries',
      status: 'active',
    },
    {
      id: 6,
      todo: 'Complete Todo App on Frontend Mentor',
      status: 'active',
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
      </main>
    </div>
  );
}

export default App;
