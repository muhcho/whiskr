import React, { useState, useEffect } from "react";
import DurationIcon from "../assets/Images/duration_icon.svg";
import AmountIcon from "../assets/Images/amout_icon.svg";
import ThreeDotsIcon from "../assets/Images/threedotstask.svg";

export default function Task({ task }) {
  const [completed, setCompleted] = useState(false);

  const {
    petName,
    nameOfTask,
    duration,
    amount,
    startTime,
    endTime,
    date,
  } = task;

  const handleTaskClick = () => setCompleted(!completed);

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
    <div
      className={`task-box ${completed ? "task-completed" : ""}`}
      style={{ backgroundColor: box }}
    >
      <div className="task-times">
        <span className="task-start-time" style={{ color: text }}>
          {startTime}
        </span>
        <span className="task-end-time">{endTime}</span>
      </div>
      <div className="task-content">
        <div className="task-line" style={{ backgroundColor: line }}></div>
        <div className="task-details">
          <h3 className="task-pet-name" style={{ color: text }}>
            {petName}'s
          </h3>
          <h2 className="task-name" style={{ color: text }}>
            {nameOfTask}
          </h2>
          <div className="task-info">
            <div className="task-duration">
              <img src={DurationIcon} alt="Duration" className="task-icon" />
              <span>{duration}</span>
            </div>
            {nameOfTask === "Feeding" && (
              <div className="task-amount">
                <img src={AmountIcon} alt="Amount" className="task-icon" />
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
      <img src={ThreeDotsIcon} alt="Options" className="task-dots-icon" />
    </div>
  );
}
