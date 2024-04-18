import React, { useState, useEffect } from 'react';
import './App.css';
// importing components
import { useLocalStorage } from '@rehooks/local-storage';
import axios from 'axios';
import Form from './components/form';
import TodoList from './components/todolist';

const API_URL = 'http://localhost:3000/api/v1/todos';
const getAPIData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [todosPersisted, setTodosPersisted] = useLocalStorage('todos');
  // run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);
  // useeffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    getAPIData().then((data) => {
      setTodosPersisted(data);
    });
  };

  const getLocalTodos = () => {
    if (todosPersisted === null) {
      saveLocalTodos();
    } else {
      let todoLocal = todosPersisted;
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Omer&apos;s Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
    </div>
  );
}
export default App;
