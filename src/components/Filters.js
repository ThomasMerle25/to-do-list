import React from "react";

const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      <button
        className={filter === "All" ? "active" : ""}
        onClick={() => setFilter("All")}
      >
        All
      </button>
      <button
        className={filter === "Active" ? "active" : ""}
        onClick={() => setFilter("Active")}
      >
        Active
      </button>
      <button
        className={filter === "Completed" ? "active" : ""}
        onClick={() => setFilter("Completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default Filters;
