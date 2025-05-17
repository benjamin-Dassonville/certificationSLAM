import { useState, useEffect } from 'react';
import './TodoList.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setInput(text);
  };

  const updateTodo = (id: number, newText: string) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ));
      setEditingId(null);
      setInput('');
    }
  };

  return (
    <div className="todo-container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              editingId ? updateTodo(editingId, input) : addTodo(input);
            }
          }}
        />
        <button 
          className="btn btn-primary"
          onClick={() => editingId ? updateTodo(editingId, input) : addTodo(input)}
        >
          {editingId ? 'Modifier' : 'Ajouter'}
        </button>
      </div>

      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo.id} 
              className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'bg-light' : ''}`}>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#6c757d' : 'inherit'
              }}>
                {todo.text}
              </span>
            </div>
            <div>
              <button
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => startEditing(todo.id, todo.text)}
              >
                ✏️
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteTodo(todo.id)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;