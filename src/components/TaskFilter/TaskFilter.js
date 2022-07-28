import React from "react";
import "./TaskFilter.css";

const TaskFilter = ({ filter, onFilterChange }) => {
  const buttonsData = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Completed" },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? "selected" : "";
    return (
      <li key={name}>
        <button className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

export default TaskFilter;
