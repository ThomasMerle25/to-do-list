import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";
import "./App.css";
import './App.css';           
import './components/taskInput.css';   
import './components/taskList.css';   
import './components/filters.css';     


const App = () => {
  const [tasks, setTasks] = useState([]); // État pour stocker les tâches
  const [newTask, setNewTask] = useState(""); // État pour stocker le titre de la nouvelle tâche

  // Charger les tâches depuis l'API au démarrage
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks/") // URL de l'API pour récupérer les tâches
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks", error));
  }, []);

  // Fonction pour ajouter une tâche
  const addTask = (title) => {
    axios
      .post("http://localhost:5000/tasks/", { title })
      .then((response) => setTasks([...tasks, response.data])) // Ajouter la nouvelle tâche
      .catch((error) => console.error("Error adding task", error));
  };

  // Fonction pour mettre à jour une tâche
  const updateTask = (taskId, updatedData) => {
    axios
      .patch(`http://localhost:5000/tasks/${taskId}`, updatedData)
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, ...response.data } : task
          )
        );
      })
      .catch((error) => console.error("Error updating task", error));
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId)); // Filtrer les tâches supprimées
      })
      .catch((error) => console.error("Error deleting task", error));
  };

  // Fonction pour éditer une tâche
  const editTask = (taskId, newTitle) => {
    axios
      .put(`http://localhost:5000/tasks/${taskId}`, { title: newTitle }) // Envoi de la requête PUT
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
          )
        );
      })
      .catch((error) => console.error("Error updating task title", error));
  };

  // Fonction pour mettre à jour l'ordre des tâches après un drag-and-drop
  const updateTaskOrder = (newOrder) => {
    setTasks(newOrder);
  };

  return (
    <div className="app">
      <h1>To Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Mettre à jour l'état du titre de la nouvelle tâche
          placeholder="Add a new task"
        />
        <button onClick={() => {
          if (newTask) {
            addTask(newTask);
            setNewTask(""); // Réinitialiser le champ après ajout
          }
        }}>Add Task</button>
      </div>

      <TaskList
        tasks={tasks}
        updateTask={updateTask} // Passer la fonction pour mettre à jour les tâches
        deleteTask={deleteTask} // Passer la fonction pour supprimer les tâches
        editTask={editTask} // Passer la fonction pour éditer le titre
        updateTaskOrder={updateTaskOrder} // Passer la fonction pour mettre à jour l'ordre des tâches après drag-and-drop
      />
    </div>
  );
};

export default App;
