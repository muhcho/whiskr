import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [petName, setPetName] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [repeat, setRepeat] = useState("None");
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [notes, setNotes] = useState("");

  const taskTypes = [
    { name: "Feeding", image: FeedingImg, color: "#D6F2FE" }, // Light Blue
    { name: "Water Refill", image: WaterRefillImg, color: "#FFD7D6" }, // Light Pink
    { name: "Clean Toilet", image: CleanToiletImg, color: "#FFF4D8" }, // Light Yellow
    { name: "Give Bath", image: GiveBathImg, color: "#E3D7FF" }, // Light Purple
    { name: "Medication", image: MedicationImg, color: "#FEA99A" }, // Light Coral
    { name: "Playtime", image: PlaytimeImg, color: "#FFF4D8" }, // Light Yellow
    { name: "Buy Food", image: BuyFoodImg, color: "#ECBD1D" }, // Yellow
    { name: "Vet Appointment", image: VetAppointmentImg, color: "#FE7149" }, // Orange
  ];

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      return "Anytime";
    }
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const durationMinutes = endTotalMinutes - startTotalMinutes;

    if (durationMinutes <= 0) {
      return "Invalid time"; // Handles cases where startTime >= endTime
    }

    return `${durationMinutes} minutes`;
  };

  const handleFinishTask = async () => {
    if (!selectedTaskType || !petName) {
      alert("Please select a task type and pet name!");
      return;
    }

    const newTask = {
      nameOfTask: selectedTaskType.name, // Assign the name of the selected task
      petName,
      date: date.toISOString().split("T")[0],
      startTime: startTime || "Anytime",
      endTime: endTime || "Anytime",
      duration: calculateDuration(),
      repeat,
      notes,
      color: selectedTaskType.color, // Assign the task color
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

      if (!response.ok) {
        throw new Error("Failed to create the task.");
      }

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

      {/* Date and Time Selection */}
      <div className="date-time-repeat">
        <div className="date-picker">
          <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>{"<"}</button>
          <span>{date.toDateString()}</span>
          <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>{">"}</button>
        </div>
        <input
          type="time"
          className="time-input"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          className="time-input"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <select
          className="repeat-select"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Everyday">Everyday</option>
          <option value="Monday">Every Monday</option>
          <option value="Friday">Every Friday</option>
        </select>
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
