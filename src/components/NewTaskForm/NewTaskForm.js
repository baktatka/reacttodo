import React from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func,
  };

  state = {
    label: "",
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          required
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    );
  }
}
