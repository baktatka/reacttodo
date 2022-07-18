import React from "react";
import "./Task.css";
import { formatDistanceToNow } from "date-fns";

export default class Task extends React.Component {
  dateNow = new Date();
  state = {
    timeToNow: formatDistanceToNow(this.dateNow, { includeSeconds: true }),
    timer: 0 * 60,
    isCounting: false,
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
    this.setState((state) => ({
      timer: state.isCounting ? state.timer + 1 : state.timer + 0,
    }));
  }

  getPadTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  handleStart = () => {
    this.setState({
      isCounting: true,
    });
  };
  handleStop = () => {
    this.setState({
      isCounting: false,
    });
  };

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;
    const { timer, isCounting } = this.state;

    const minutes = this.getPadTime(Math.floor(timer / 60));
    const seconds = this.getPadTime(timer - minutes * 60);

    let classNames = "title";
    if (done) {
      classNames += " done";
    }

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={() => {
            this.handleStop();
            onToggleDone();
          }}
        />
        <label>
          <span className={classNames}>{label}</span>
          <span>
            {isCounting ? (
              <button
                className="icon icon-pause"
                onClick={this.handleStop}
              ></button>
            ) : (
              <button
                className="icon icon-play"
                onClick={this.handleStart}
              ></button>
            )}
            <span className="description">
              {minutes}:{seconds}
            </span>
          </span>
          <span className="description">{this.state.timeToNow}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
