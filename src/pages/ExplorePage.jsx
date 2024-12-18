import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeedingImg from "../assets/Images/catistasting.jpg";
import WaterRefillImg from "../assets/Images/waterrefil.jpg";
import CleanToiletImg from "../assets/Images/cattoilet.jpg";
import GiveBathImg from "../assets/Images/givebathcat.jpg";
import MedicationImg from "../assets/Images/medicationcats.jpg";
import PlaytimeImg from "../assets/Images/playtimecats.jpg";
import BuyFoodImg from "../assets/Images/catfood.jpg";
import VetAppointmentImg from "../assets/Images/vetaapointcats.jpg";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error state

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

  const [selectedTask, setSelectedTask] = useState(taskTypes[0]);

  // Optimized fetch with caching and cleanup
  useEffect(() => {
    const fetchTaskData = async () => {
      const cachedData = localStorage.getItem("exploreTaskData");
      if (cachedData) {
        setTaskData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      const controller = new AbortController();
      try {
        const response = await fetch(
          "https://whiskr-2-default-rtdb.firebaseio.com/explorer.json",
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Failed to fetch task data");

        const data = await response.json();
        setTaskData(data || {});
        localStorage.setItem("exploreTaskData", JSON.stringify(data));
        setFetchError(null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching task data:", error);
          setFetchError("Failed to load task data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }

      return () => controller.abort(); // Cleanup fetch on unmount
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
      <h1 className="explore-page-title">Tasks</h1>
      <p className="explore-page-description">
        Explore the most important tasks you should set for yourself so your cat
        has everything they need!
      </p>

      {/* Loading and Error States */}
      {isLoading && <p>Loading tasks...</p>}
      {fetchError && <p className="error-message">{fetchError}</p>}

      {/* Task Carousel */}
      {!isLoading && !fetchError && (
        <>
          <div className="explore-carousel">
            {taskTypes.map((task) => (
              <div
                key={task.name}
                className={`explore-carousel-item ${
                  selectedTask?.name === task.name ? "selected" : ""
                }`}
                onClick={() => handleTaskSelection(task)}
              >
                <img src={task.image} alt={task.name} loading="lazy" />
                <span>{task.name}</span>
              </div>
            ))}
          </div>

          {/* Task Details Section */}
          {selectedTask && (
            <div className="explore-task-details">
              <h2>{selectedTask.name}</h2>
              <p>
                {taskData[selectedTask.name]?.description ||
                  "Loading details..."}
              </p>
              <img
                src={selectedTask.image}
                alt={selectedTask.name}
                loading="lazy"
              />

              <div className="explore-recommendation">
                <h3>Recommendations</h3>
                <p>
                  {taskData[selectedTask.name]?.recommendation ||
                    "Not available"}
                </p>
              </div>

              <div className="explore-frequency">
                <h3>Reminder Frequency</h3>
                <p>
                  {taskData[selectedTask.name]?.frequency || "Not available"}
                </p>
              </div>
            </div>
          )}

          {/* Add Task Button */}
          <button className="add-task-button" onClick={handleAddTask}>
            + Add this task
          </button>
        </>
      )}
    </div>
  );
}
