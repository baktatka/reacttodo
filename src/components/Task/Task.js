import React, { useEffect, useState } from "react";
import "./Task.css";
import { formatDistanceToNow } from "date-fns";

const Task = ({ label, onDeleted, onToggleDone, done }) => {
  const dateNow = new Date();

  const [timeToNow, setTimeToNow] = useState(
    formatDistanceToNow(dateNow, { includeSeconds: true })
  );
  const [timer, setTimer] = useState(0 * 60);
  const [isCounting, setIsCounting] = useState(false);

  const tick = () => {
    setTimeToNow(formatDistanceToNow(dateNow, { includeSeconds: true }));
    setTimer(isCounting ? timer + 1 : timer + 0);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, [tick]);

  const getPadTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const handleStart = () => {
    setIsCounting(true);
  };
  const handleStop = () => {
    setIsCounting(false);
  };

  const minutes = getPadTime(Math.floor(timer / 60));
  const seconds = getPadTime(timer - minutes * 60);

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
          handleStop();
          onToggleDone();
        }}
      />
      <label>
        <span className={classNames}>{label}</span>
        <span>
          {isCounting ? (
            <button className="icon icon-pause" onClick={handleStop}></button>
          ) : (
            <button className="icon icon-play" onClick={handleStart}></button>
          )}
          <span className="description">
            {minutes}:{seconds}
          </span>
        </span>
        <span className="description">{timeToNow}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
};

export default Task;
