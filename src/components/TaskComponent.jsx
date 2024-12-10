import React, { useState } from "react";
import DurationIcon from "../assets/Images/duration_icon.svg";
import AmountIcon from "../assets/Images/amout_icon.svg";
import ThreeDotsIcon from "../assets/Images/threedotstask.svg";

export default function TaskComponent({ task, onComplete }) {
  const {
    petName,
    nameOfTask,
    duration,
    amount,
    startTime,
    endTime,
    date,
  } = task;

  const [completed, setCompleted] = useState(false);

  const handleTaskClick = () => {
    setCompleted((prev) => !prev);
    onComplete(task);
  };

  // Determine colors based on task type
  const taskColors = {
    Feeding: { box: "#D6F2FE", text: "#FE7149", line: "#FE7149" },
    "Water Refill": { box: "#FFD7D6", text: "#6558C2", line: "#6558C2" },
    Medication: { box: "#FFF4D8", text: "#ECBD1D", line: "#ECBD1D" },
    Play: { box: "#E3D7FF", text: "#6558C2", line: "#6558C2" },
    // Default fallback colors
    default: { box: "#D7FDFE", text: "#6088F5", line: "#6088F5" },
  };

  const { box, text, line } = taskColors[nameOfTask] || taskColors.default;

  return (
    <div className="task-wrapper">
      <div className="task-time-wrapper">
        <span className="task-start-time" style={{ color: text }}>
          {startTime}
        </span>
        <div
          className={`task-box ${completed ? "task-completed" : ""}`}
          style={{ backgroundColor: box }}
        >
          <div className="task-content">
            <div className="task-line" style={{ backgroundColor: line }}></div>
            <div className="task-details">
              <h3
                className={`task-pet-name ${completed ? "task-done" : ""}`}
                style={{ color: text }}
              >
                {petName}'s
              </h3>
              <h2
                className={`task-name ${completed ? "task-done" : ""}`}
                style={{ color: text }}
              >
                {nameOfTask}
              </h2>
              <div className="task-info">
                <div className="task-duration">
                  <img src={DurationIcon} alt="Duration" className="task-icon" />
                  <span>{duration}</span>
                </div>
                {nameOfTask === "Feeding" && (
                  <div className="task-amount">
                    <img
                      src={AmountIcon}
                      alt="Amount"
                      className="task-icon"
                    />
                    <span>{amount}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              className="task-check-btn"
              onClick={handleTaskClick}
              style={{ borderColor: text }}
            >
              {completed && (
                <span
                  className="task-check-icon"
                  style={{ backgroundColor: text }}
                >
                  ✓
                </span>
              )}
            </button>
          </div>
        </div>
        <span className="task-end-time">{endTime}</span>
        <img src={ThreeDotsIcon} alt="Options" className="task-dots-icon" />
      </div>
    </div>
  );
}
