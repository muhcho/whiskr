import React, { useState } from "react";
import DurationIcon from "../assets/Images/duration_icon.svg";
import NotesIcon from "../assets/Images/notes_icon.svg"; // Add your own notes icon if needed.

export default function TaskComponent({ task }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const toggleTaskCompletion = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div
      className={`task-component ${isCompleted ? "completed" : ""}`}
      style={{
        backgroundColor:
          task.nameOfTask === "Feeding"
            ? "#D6F2FE"
            : task.nameOfTask === "Water Refill"
            ? "#FFD7D6"
            : "#FFF4D8", // Add more conditions if needed.
      }}
    >
      <div className="task-times">
        <span className="task-start-time">{task.startTime}</span>
        <span className="task-end-time">{task.endTime}</span>
      </div>
      <div className="task-details">
        <div className="task-header">
          <h3
            className="task-title"
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {task.petName}'s {task.nameOfTask}
          </h3>
        </div>
        <div className="task-info">
          <div className="task-duration">
            <img src={DurationIcon} alt="Duration" />
            <span>{task.duration}</span>
          </div>
          {task.notes && (
            <div className="task-notes">
              <img src={NotesIcon} alt="Notes" />
              <span>{task.notes}</span>
            </div>
          )}
        </div>
      </div>
      <button
        className="task-check-button"
        onClick={toggleTaskCompletion}
        style={{
          borderColor: isCompleted ? "#44b6ff" : "#ccc",
        }}
      >
        {isCompleted && <span className="task-check-mark">✓</span>}
      </button>
    </div>
  );
}
