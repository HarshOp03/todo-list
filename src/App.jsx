import { useState } from 'react'
import './App.css'


function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState(() => {
    const todosString = localStorage.getItem("todos");
    return todosString ? JSON.parse(todosString) : [];
  })

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: inputValue,
      isCompleted: false
    }

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputValue('');
  }

  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const handleToggleTask = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      <div className='app'>
        <div className="container">
          <h1>Todo List</h1>

          <div className="input-container">
            <input
              type="text"
              placeholder='Enter Your Task'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <button className='Add-btn' onClick={handleAddTask}>Add</button>
          </div>

          <div className="results-container">
            {todos.length === 0 ? (
              <p>No tasks yet. Add one!</p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                  <div className="task">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleToggleTask(todo.id)}
                    />
                    <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                      {todo.title}
                    </span>
                  </div>
                  <button className='Delete-btn' onClick={() => handleDeleteTask(todo.id)}>Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default App
