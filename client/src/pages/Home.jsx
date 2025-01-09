import React, { useEffect, useState } from "react";
import "./Home.css"; // Import the external CSS file

const Home = () => {
  const [task, settask] = useState("");
  const [tasks, settasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:3001/api";
  const gettasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/read-tasks`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      settasks(data.tasks || []); // Ensure `tasks` is an array
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Error loading tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    

    gettasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      alert("task cannot be empty!");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/create-task`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();
     // settasks((prevtasks) => [...prevtasks, data.task]);
      gettasks();
      alert(data.message);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      settask("");
    }
  };

  const handleEdit = async (taskId) => {
    const updatedtask = prompt("Update your task");
    if (!updatedtask) return;

    try {
      const response = await fetch(`${API_URL}/update-task/${taskId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedtask }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();
      settasks((prevtasks) =>
        prevtasks.map((taskItem) =>
          taskItem._id === taskId ? { ...taskItem, task: updatedtask } : taskItem
        )
      );
      alert(data.message);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`${API_URL}/delete-task/${taskId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const data = await response.json();
      settasks((prevtasks) => prevtasks.filter((taskItem) => taskItem._id !== taskId));
      alert(data.message);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <section>
      <div className="task-container">
        <h1 className="task-title">task App</h1>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => settask(e.target.value)}
          />
          <button type="submit" disabled={!task.trim()}>
            Add
          </button>
        </form>
        <ul className="task-list">
          {isLoading ? (
            <li>Loading tasks...</li>
          ) : tasks.length > 0 ? (
            tasks.map((taskItem) =>
              taskItem?.task ? (
                <li key={taskItem._id} className="task-item">
                  <span>{taskItem.task}</span>
                  <div>
                    <button
                      onClick={() => handleEdit(taskItem._id)}
                      className="edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(taskItem._id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ) : (
                <li key={taskItem?._id || Math.random()} className="task-item">
                  <span>Invalid task</span>
                </li>
              )
            )
          ) : (
            <li>No tasks available.</li>
          )}
        </ul>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </section>
  );
};

export default Home;
