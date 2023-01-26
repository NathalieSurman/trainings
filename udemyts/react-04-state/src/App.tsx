import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

//NOTE: it you ever see an ERROR like (has no exported member"useRef" from the "react") you simply need to install like this
//--> npm install --save-dev typescript @types/node @types/react @types/react-dom @types/jest the -dev fix it ----//
const App: React.FC = () => {
  //We want to tell Ts that is generic function, State<Todo[]>([]) which you will find in the todo.model file--//
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Math.random().toString(), text: text }
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
