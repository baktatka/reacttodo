import React from "react";
import "./Footer.css";

import TaskFilter from "../TaskFilter";
import PropTypes from "prop-types";

const Footer = ({ done, onClear, filter, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{done} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  done: 0,
  filter: "all",
};

Footer.propTypes = {
  done: PropTypes.number,
  filter: PropTypes.string,
  onClear: PropTypes.func,
  onFilterChange: PropTypes.func,
};

export default Footer;
