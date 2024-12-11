import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeedingImg from "../assets/images/cat-tasting.jpg";
import WaterRefillImg from "../assets/Images/waterrefil.jpg";
import CleanToiletImg from "../assets/Images/cattoilet.jpg";
import GiveBathImg from "../assets/Images/givebathcat.jpg";
import MedicationImg from "../assets/Images/medicationcats.jpg";
import PlaytimeImg from "../assets/Images/playtimecats.jpg";
import BuyFoodImg from "../assets/Images/catfood.jpg";
import VetAppointmentImg from "../assets/Images/vetaapointcats.jpg";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({}); // Task data fetched from Firebase

  // Task types array
  const taskTypes = [
    { name: "Feeding", image: FeedingImg, color: "#D6F2FE" },
    { name: "Water Refill", image: WaterRefillImg, color: "#FFD7D6" },
    { name: "Clean Toilet", image: CleanToiletImg, color: "#FFF4D8" },
    { name: "Give Bath", image: GiveBathImg, color: "#FEE0EE" },
    { name: "Medication", image: MedicationImg, color: "#88A8FE" },
    { name: "Playtime", image: PlaytimeImg, color: "#E3D7FF" },
    { name: "Buy Food", image: BuyFoodImg, color: "#FFF4D8" },
    { name: "Vet Appointment", image: VetAppointmentImg, color: "#D7FDFE" },
  ];

  // Set the initial selected task to "Feeding"
  const [selectedTask, setSelectedTask] = useState(taskTypes[0]);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(
          "https://whiskr-2-default-rtdb.firebaseio.com/explorer.json"
        );
        const data = await response.json();
        console.log("Fetched task data:", data); // Debugging log
        setTaskData(data || {});
      } catch (error) {
        console.error("Failed to fetch task data", error);
      }
    };

    fetchTaskData();
  }, []);

  const handleTaskSelection = (task) => {
    setSelectedTask(task);
  };

  const handleAddTask = () => {
    if (!selectedTask) return;
    navigate("/create-task", { state: { selectedTask } });
  };

  return (
    <div
      className="explore-page"
      style={{ backgroundColor: selectedTask?.color || "#FFFFFF" }}
    >
      {/* Page Title and Description */}
      <h1 className="explore-page-title">Tasks</h1>
      <p className="explore-page-description">
        Explore the most important tasks you should set for yourself so your cat has everything they need.
      </p>

      {/* Task Carousel */}
      <div className="explore-carousel">
        {taskTypes.map((task) => (
          <div
            key={task.name}
            className={`explore-carousel-item ${
              selectedTask?.name === task.name ? "selected" : ""
            }`}
            onClick={() => handleTaskSelection(task)}
          >
            <img src={task.image} alt={task.name} />
            <span>{task.name}</span>
          </div>
        ))}
      </div>

      {/* Task Details Section */}
      {selectedTask && (
        <div className="explore-task-details">
          <h2>{selectedTask.name}</h2>
          <p>{taskData[selectedTask.name]?.description || "Loading details..."}</p>
          <img src={selectedTask.image} alt={selectedTask.name} />
          
          {/* Recommendations Section */}
          <div className="explore-recommendation">
            <h3>Recommendations</h3>
            <p>{taskData[selectedTask.name]?.recommendation || "Not available"}</p>
          </div>
          
          {/* Reminder Frequency Section */}
          <div className="explore-frequency">
            <h3>Reminder Frequency</h3>
            <p>{taskData[selectedTask.name]?.frequency || "Not available"}</p>
          </div>
        </div>
      )}

      {/* Add Task Button */}
      {selectedTask && (
        <button className="add-task-button" onClick={handleAddTask}>
          + Add this task
        </button>
      )}
    </div>
  );
}
