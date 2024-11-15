import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, updateTask, deleteTask, editTask, updateTaskOrder }) => {
  const [editingTask, setEditingTask] = useState(null); // Gestion de la tâche en mode édition
  const [newTitle, setNewTitle] = useState(""); // Nouveau titre

  // Fonction pour gérer le changement du titre lors de l'édition
  const handleEditChange = (event) => {
    setNewTitle(event.target.value); // Mettre à jour le titre dans le state
  };

  // Fonction pour soumettre l'édition du titre
  const handleEditSubmit = (taskId) => {
    editTask(taskId, newTitle); // Appel à la fonction pour éditer la tâche
    setEditingTask(null); // Fermer le mode édition
    setNewTitle(""); // Réinitialiser le titre
  };

  // Fonction pour gérer l'ordre des tâches après un drag-and-drop
  const handleDragEnd = (result) => {
    const { destination, source } = result;
  
    if (!destination) return; // Si l'élément est lâché en dehors de la zone, ne rien faire
  
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1); // Supprimer la tâche déplacée
    reorderedTasks.splice(destination.index, 0, removed); // Réinsérer la tâche déplacée à sa nouvelle position
  
    // Mettre à jour l'ordre des tâches via la fonction `updateTaskOrder`
    updateTaskOrder(reorderedTasks); 
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list" direction="vertical">
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ padding: "0", listStyleType: "none" }}
          >
            {tasks && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided) => (
                    <li
                      className="task-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundColor: "#FFEB3B", 
                        padding: "10px",
                        marginBottom: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        cursor: "move",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => updateTask(task.id, { done: !task.done })}
                      />
                      {editingTask === task.id ? (
                        <div>
                          <input
                            type="text"
                            value={newTitle}
                            onChange={handleEditChange}
                            placeholder="Edit task title"
                          />
                          <button onClick={() => handleEditSubmit(task.id)}>Save</button>
                          <button onClick={() => setEditingTask(null)}>Cancel</button>
                        </div>
                      ) : (
                        <>
                          <span>{task.title}</span>
                          <button
                            onClick={() => {
                              setEditingTask(task.id);
                              setNewTitle(task.title);
                            }}
                          >
                            Edit
                          </button>
                        </>
                      )}
                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                  )}
                </Draggable>
              ))
            ) : (
              <p>No tasks available.</p>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
  
}

export default TaskList;
