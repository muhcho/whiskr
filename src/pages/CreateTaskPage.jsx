import React, { useState, useEffect } from "react";
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

  const [petNames, setPetNames] = useState([]); // Dynamically load pet names
  const [petName, setPetName] = useState(""); // Selected pet
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState(preselectedTask);
  const [notes, setNotes] = useState("");
  const [foodAmount, setFoodAmount] = useState("");

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

  useEffect(() => {
    // Fetch pet names from localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData?.petNames) {
      setPetNames(storedUserData.petNames);
    } else {
      // Default pets if no data exists
      setPetNames(["Alfred", "Monia"]);
    }
  }, []);

  const handleDateChange = (days) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const formattedDate = `${daysOfWeek[date.getDay()]}, ${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

  const handleFinishTask = async () => {
    if (!selectedTaskType || !petName) {
      alert("Please select a task type and pet name!");
      return;
    }

    const newTask = {
      nameOfTask: selectedTaskType.name,
      petName,
      date: date.toISOString().split("T")[0],
      startTime: startTime || "Anytime",
      endTime: endTime || "Anytime",
      duration: startTime && endTime ? `${calculateDuration()} minutes` : "Anytime",
      notes,
      color: selectedTaskType.color,
      completed: false,
      foodAmount: selectedTaskType.name === "Feeding" ? foodAmount : undefined,
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

  const calculateDuration = () => {
    if (!startTime || !endTime) return "Anytime";
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const durationMinutes = endTotalMinutes - startTotalMinutes;
    return durationMinutes > 0 ? durationMinutes : "Invalid time";
  };

  return (
    <div className="create-task-page">
      <h1 className="page-title">Create Task</h1>

      {/* Pet Selection */}
      <div className="pet-selection">
        {petNames.map((name) => (
          <div
            key={name}
            className={`pet-option ${petName === name ? "selected" : ""}`}
            onClick={() => setPetName(name)}
          >
            <span>{name}</span>
          </div>
        ))}
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

      {/* Additional Input for Feeding */}
      {selectedTaskType?.name === "Feeding" && (
        <div className="feeding-input-section">
          <label className="feeding-input-label">Grams of Dry Food:</label>
          <input
            type="number"
            className="feeding-input"
            placeholder="Enter amount (grams)"
            value={foodAmount}
            onChange={(e) => setFoodAmount(e.target.value)}
          />
        </div>
      )}

      {/* Notes Input */}
      <textarea
        className="notes-input"
        placeholder="Write your note here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      {/* Finish Task Button */}
      <div className="finish-task-button-container">
        <button className="finish-task-button" onClick={handleFinishTask}>
          Finish Task
        </button>
      </div>
    </div>
  );
}
