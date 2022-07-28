import React, { useState } from "react";
import "./NewTaskForm.css";

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState("");

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label.trim() === "") alert("Введите корректное задание");
    else {
      onItemAdded(label);
    }
    setLabel("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        required
        type="text"
        className="new-todo"
        placeholder="Task"
        autoFocus
        onChange={onLabelChange}
        value={label}
      />
    </form>
  );
};

export default NewTaskForm;
