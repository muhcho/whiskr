import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeedingImg from "../assets/Images/feeding.jpg";
import WaterRefillImg from "../assets/Images/waterrefill.jpg";
import CleanToiletImg from "../assets/Images/toiletclean.jpg";
import GiveBathImg from "../assets/Images/givebath.jpg";
import MedicationImg from "../assets/Images/medication.jpg";
import PlaytimeImg from "../assets/Images/playtime.jpg";
import BuyFoodImg from "../assets/Images/buy food.jpg";
import VetAppointmentImg from "../assets/Images/vetaapoint.jpg";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedTask = location.state?.selectedTask || null;

  const [taskName, setTaskName] = useState(""); 
  const [petName, setPetName] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState(preselectedTask);
  const [notes, setNotes] = useState("");

  const taskTypes = [
    { name: "Feeding", image: FeedingImg, color: "#D6F2FE" },
    { name: "Water Refill", image: WaterRefillImg, color: "#FFD7D6" },
    { name: "Clean Toilet", image: CleanToiletImg, color: "#FFF4D8" },
    { name: "Give Bath", image: GiveBathImg, color: "#E3D7FF" },
    { name: "Medication", image: MedicationImg, color: "#FEA99A" },
    { name: "Playtime", image: PlaytimeImg, color: "#FFF4D8" },
    { name: "Buy Food", image: BuyFoodImg, color: "#ECBD1D" },
    { name: "Vet Appointment", image: VetAppointmentImg, color: "#FE7149" },
  ];

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleDateChange = (days) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const formattedDate = `${daysOfWeek[date.getDay()]}, ${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

  const handleFinishTask = async () => {
    if (!taskName || !selectedTaskType || !petName) {
      alert("Please provide a task name, select a task type, and pet name!");
      return;
    }

    const newTask = {
      taskName,
      nameOfTask: selectedTaskType.name,
      petName,
      date: date.toISOString().split("T")[0],
      startTime: startTime || "Anytime",
      endTime: endTime || "Anytime",
      notes,
      color: selectedTaskType.color,
      completed: false,
    };

    try {
      const response = await fetch(
        "https://whiskr-2-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to create the task.");

      alert("Task created successfully!");
      navigate("/homepage");
    } catch (error) {
      console.error("Error creating new task:", error);
      alert("Failed to create the task. Please try again.");
    }
  };

  return (
    <div className="create-task-page">
      <h1 className="page-title">Create Task</h1>

      {/* Task Name Input */}
      <div className="task-name-section">
        <label className="task-name-label">Your Task:</label>
        <input
          type="text"
          className="task-name-input"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      {/* Pet Selection */}
      <div className="pet-selection">
        <div
          className={`pet-option ${petName === "Alfred" ? "selected" : ""}`}
          onClick={() => setPetName("Alfred")}
        >
          <span>Alfred</span>
        </div>
        <div
          className={`pet-option ${petName === "Monia" ? "selected" : ""}`}
          onClick={() => setPetName("Monia")}
        >
          <span>Monia</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="date-selection">
        <label className="date-label">Date:</label>
        <div className="date-picker">
          <button className="date-arrow" onClick={() => handleDateChange(-1)}>
            ◀
          </button>
          <span className="selected-date">{formattedDate}</span>
          <button className="date-arrow" onClick={() => handleDateChange(1)}>
            ▶
          </button>
        </div>
      </div>

      {/* Date and Time Selection */}
      <div className="date-time-repeat">
        <div className="time-row">
          <div className="time-block">
            <label className="time-label">Start Time:</label>
            <input
              type="time"
              className="time-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="time-block">
            <label className="time-label">End Time:</label>
            <input
              type="time"
              className="time-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Task Type Selection */}
      <div className="task-type-selection">
        {taskTypes.map((type) => (
          <div
            key={type.name}
            className={`task-type-option ${
              selectedTaskType?.name === type.name ? "selected" : ""
            }`}
            onClick={() => setSelectedTaskType(type)}
          >
            <img src={type.image} alt={type.name} />
            <span>{type.name}</span>
          </div>
        ))}
      </div>

      {/* Notes Input */}
      <textarea
        className="notes-input"
        placeholder="Write your note here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      {/* Finish Task Button */}
      <button className="finish-task-button" onClick={handleFinishTask}>
        Finish Task
      </button>
    </div>
  );
}
