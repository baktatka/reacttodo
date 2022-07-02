import React from "react";
import "./Task.css";
import { formatDistanceToNow } from "date-fns";

export default class Task extends React.Component {
  dateNow = new Date();
  state = {
    timeToNow: formatDistanceToNow(this.dateNow, { includeSeconds: true }),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      timeToNow: formatDistanceToNow(this.dateNow, { includeSeconds: true }),
    });
  }

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;

    let classNames = "description";
    if (done) {
      classNames += " done";
    }

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={onToggleDone}
        />
        <label>
          <span className={classNames}>{label}</span>
          <span className="created">{this.state.timeToNow}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
