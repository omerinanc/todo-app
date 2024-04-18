import React from 'react';
import axios from 'axios';

const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  const submitTodoHandler = async (e) => {
    e.preventDefault();
    const newTodo = { id: Math.random() * 10000, text: inputText, completed: false };
    try {
      const response = await axios.post('http://localhost:3000/api/v1/todos', { todo: newTodo });
      const savedTodo = response.data;
      setTodos([...todos, savedTodo]);
      setInputText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>

      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};
export default Form;
