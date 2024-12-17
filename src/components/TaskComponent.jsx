import React, { useState } from "react";
import DurationIcon from "../assets/Images/duration_icon.svg";
import NotesIcon from "../assets/Images/notes_icon.svg";

export default function TaskComponent({ task }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const toggleTaskCompletion = () => {
    setIsCompleted((prev) => !prev);
  };

  const backgroundColor =
    task.color ||
    (task.nameOfTask === "Feeding"
      ? "#D6F2FE"
      : task.nameOfTask === "Water Refill"
      ? "#FFD7D6"
      : task.nameOfTask === "Clean Toilet"
      ? "#FFF4D8"
      : task.nameOfTask === "Give Bath"
      ? "#FEE0EE"
      : task.nameOfTask === "Medication"
      ? "#88A8FE"
      : task.nameOfTask === "Playtime"
      ? "#E3D7FF"
      : task.nameOfTask === "Buy Food"
      ? "#FEA99A"
      : task.nameOfTask === "Vet Appointment"
      ? "#FD917D"
      : "#FFFFFF");


  return (
    <div
      className={`task-component ${isCompleted ? "completed" : ""}`}
      style={{ backgroundColor }}
    >
      {/* Task Times */}
      <div className="task-times">
        <span className="task-start-time">{task.startTime}</span>
      </div>

      {/* Task Details */}
      <div className="task-details">
        <div className="task-header">
          <h3
            className="task-title"
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
              color: isCompleted ? "#aaa" : textColor,
            }}
          >
            <span>{task.petName}'s</span>
            <br />
            <span>{task.nameOfTask}</span>
          </h3>
        </div>

        {/* Display Grams of Food for Feeding Task */}
        {task.nameOfTask === "Feeding" && task.foodAmount && (
          <div className="feeding-info">
            <strong>{task.foodAmount} grams of dry food</strong>
          </div>
        )}

        {/* Task Info */}
        <div className="task-info">
          <div className="task-duration">
            <img src={DurationIcon} alt="Duration" loading="lazy"  />
            <span>{task.duration}</span>
          </div>
        </div>

        {/* Task Notes */}
        {task.notes ? (
          <div className="task-notes">
            <img src={NotesIcon} alt="Notes" loading="lazy"  />
            <span>{task.notes}</span>
          </div>
        ) : (
          <div className="task-notes">
            <img src={NotesIcon} alt="Notes" loading="lazy"  />
            <span>No notes provided</span>
          </div>
        )}
      </div>

      {/* Task Completion Button */}
      <button
        className="task-check-button"
        onClick={toggleTaskCompletion}
        style={{
          borderColor: isCompleted ? "#44b6ff" : "#ccc",
          backgroundColor: isCompleted ? "#44b6ff" : "transparent",
          color: isCompleted ? "#fff" : "#44b6ff",
        }}
      >
        {isCompleted ? "✓" : "Mark Done"}
      </button>

      {/* Task End Time */}
      <div className="task-end-wrapper">
        <span className="task-end-time">{task.endTime}</span>
      </div>
    </div>
  );
}
