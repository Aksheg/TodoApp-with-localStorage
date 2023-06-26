import React, { useState, useEffect } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { Button, InputField } from "./Reusables";
import Todos from "./Todos";
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);
      setTasks(parsed);
    }
  }, []);

  const addTask = () => {
    if (title.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTitle("");
    setDescription("");
  };

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      addTask();
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = (taskId) => {
    const updatedStatusTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedStatusTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedStatusTasks));
  };

  return (
    <div className="App">
      <div className="TodoWrapper">
        <h1>Todo App</h1>
        <div className="TodoForm">
          <InputField
            className="todo-input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={pressEnter}
          />
          <InputField
            className="todo-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={pressEnter}
          />
          <Button className="todo-btn" onClick={addTask} btnText="Add Task" />
        </div>
        <div className="div2">
          {tasks.map((task) => (
            <Todos
              key={task.id}
              clickParent={() => toggleTaskStatus(task.id)}
              parentClassName={`Todo ${task.completed ? "done" : ""}`}
              title={task.title}
              description={task.description}
              titleClassName={task.completed ? "completed" : ""}
              descClassName={`desc ${task.completed ? "completed" : ""}`}
              status={!task.completed ? `pending` : `completed`}
              checkMark={
                task.completed ? (
                  `Undo`
                ) : (
                  <FaCheck
                    className="mark-completed-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTaskStatus(task.id);
                    }}
                  />
                )
              }
              trashCan={
                <FaTrash
                  data-testid="delete-button"
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const App = () => {
  return <TodoApp />;
};
export default App;
