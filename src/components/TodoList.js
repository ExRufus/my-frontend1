import React, { useEffect, useState } from "react";

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const data = await response.json();
      setTodos(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createTask = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token
        },
        body: JSON.stringify({ title: newTask })
      });

      const data = await response.json();
      if (data.status === "success") {
        getTodos();
        setNewTask("");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Tambahkan tugas baru"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={createTask} disabled={loading}>
          {loading ? "Menambahkan..." : "Tambahkan Tugas"}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Judul</th>
            <th>Status</th>
            <th>ID Pengguna</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Selesai" : "Belum Selesai"}</td>
              <td>{todo.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoListPage;