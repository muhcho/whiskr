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

export default function CreateTaskPage({ addTask }) {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [petName, setPetName] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [repeat, setRepeat] = useState("None");
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [notes, setNotes] = useState("");

  const taskTypes = [
    { name: "Feeding", image: FeedingImg },
    { name: "Water Refill", image: WaterRefillImg },
    { name: "Clean Toilet", image: CleanToiletImg },
    { name: "Give Bath", image: GiveBathImg },
    { name: "Medication", image: MedicationImg },
    { name: "Playtime", image: PlaytimeImg },
    { name: "Buy Food", image: BuyFoodImg },
    { name: "Vet Appointment", image: VetAppointmentImg },
  ];

  const handleFinishTask = () => {
    if (!taskName || !petName || !selectedTaskType) {
      alert("Please fill all required fields!");
      return;
    }

    const newTask = {
      taskName,
      petName,
      date: date.toISOString().split("T")[0],
      startTime: startTime || "Anytime",
      endTime: endTime || "Anytime",
      repeat,
      type: selectedTaskType,
      notes,
    };

    addTask(newTask);
    navigate("/homepage");
  };

  return (
    <div className="create-task-page">
      <h1 className="page-title">Create Task</h1>
      <input
        type="text"
        className="task-name-input"
        placeholder="Task name..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <div className="pet-selection">
        <div
          className={`pet-option ${petName === "Alfred" ? "selected" : ""}`}
          onClick={() => setPetName("Alfred")}
        >
          <img src="alfred_image_path" alt="Alfred" />
          <span>Alfred</span>
        </div>
        <div
          className={`pet-option ${petName === "Monia" ? "selected" : ""}`}
          onClick={() => setPetName("Monia")}
        >
          <img src="monia_image_path" alt="Monia" />
          <span>Monia</span>
        </div>
      </div>
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
      <div className="task-type-selection">
        {taskTypes.map((type) => (
          <div
            key={type.name}
            className={`task-type-option ${selectedTaskType === type.name ? "selected" : ""}`}
            onClick={() => setSelectedTaskType(type.name)}
          >
            <img src={type.image} alt={type.name} />
            <span>{type.name}</span>
          </div>
        ))}
      </div>
      <textarea
        className="notes-input"
        placeholder="Write your note here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <button className="finish-task-button" onClick={handleFinishTask}>
        Finish Task
      </button>
    </div>
  );
}
