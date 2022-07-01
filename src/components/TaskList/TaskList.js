import React from "react";
import "./TaskList.css";
import Task from "../Task";

import PropTypes from "prop-types";

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
