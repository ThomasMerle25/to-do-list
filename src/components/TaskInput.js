import React, { useState } from "react";

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title);
      setTitle("");
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default TaskInput;
