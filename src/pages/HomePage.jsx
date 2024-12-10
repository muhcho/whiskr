import React, { useState, useEffect } from "react";
import CalendarIcon from "../assets/Images/calendar_homepage.svg";
import DurationIcon from "../assets/Images/duration_icon.svg";
import AmountIcon from "../assets/Images/amout_icon.svg";
import ThreeDotsIcon from "../assets/Images/threedotstask.svg";
import PlusButton from "../assets/Images/plusButton.svg";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Fetch tasks from Firebase
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://whiskr-2-default-rtdb.firebaseio.com/tasks.json");
        if (!response.ok) throw new Error("Failed to fetch tasks.");
        const data = await response.json();
        const formattedTasks = Object.entries(data || {}).map(([id, task]) => ({
          id,
          ...task,
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Format current date for filtering
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  // Filter tasks for the current date
  const filteredTasks = tasks.filter((task) => task.date === formattedCurrentDate);

  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const handleTaskCompletion = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleKeepScratched = async () => {
    const taskId = selectedTaskId;
    try {
      await fetch(
        `https://whiskr-2-default-rtdb.firebaseio.com/tasks/${taskId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ completed: true }),
          headers: { "Content-Type": "application/json" },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
    setSelectedTaskId(null);
  };

  const handleDeleteTask = async () => {
    const taskId = selectedTaskId;
    try {
      await fetch(
        `https://whiskr-2-default-rtdb.firebaseio.com/tasks/${taskId}.json`,
        {
          method: "DELETE",
        }
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setSelectedTaskId(null);
  };

  const handleUnselectTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: false } : task
      )
    );
  };

  const dayName = dayNames[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div className="homepage-wrapper">
      {/* Header */}
      <div className="homepage-header">
        <div className="header-top">
          <h1 className="homepage-title">Mette's tasks</h1>
          <div className="homepage-calendar">
            <img src={CalendarIcon} alt="Calendar" className="calendar-icon" />
            <span className="calendar-notification"></span>
          </div>
        </div>
        <div className="header-date">
          <button className="date-arrow" onClick={goToPreviousDay}>
            {"<"}
          </button>
          <div className="date-center">
            <h2 className="homepage-day">{dayName}</h2>
            <p className="homepage-full-date">
              {month} {date}, {year}
            </p>
          </div>
          <button className="date-arrow" onClick={goToNextDay}>
            {">"}
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
          <p>Yay! You don't have any tasks for today. ✨</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-component ${task.completed ? "task-completed" : ""}`}
              style={{
                backgroundColor:
                  task.nameOfTask === "Feeding"
                    ? "var(--light-blue)"
                    : task.nameOfTask === "Water Refill"
                    ? "var(--light-pink)"
                    : task.nameOfTask === "Medication"
                    ? "var(--light-yellow)"
                    : "var(--light-green)",
              }}
            >
              <div className="task-time-wrapper">
                <span className="task-start-time">{task.startTime}</span>
              </div>
              <div className="task-details">
                <div
                  className="task-tick-bar"
                  style={{
                    backgroundColor:
                      task.nameOfTask === "Feeding"
                        ? "var(--orange)"
                        : task.nameOfTask === "Water Refill"
                        ? "var(--pink)"
                        : task.nameOfTask === "Medication"
                        ? "var(--yellow)"
                        : "var(--green)",
                  }}
                ></div>
                <div className="task-content">
                  <h2 className="task-name">
                    {task.petName}'s {task.nameOfTask}
                  </h2>
                  <div className="task-info">
                    <div className="task-duration">
                      <img src={DurationIcon} alt="Duration" />
                      <span>{task.duration}</span>
                    </div>
                    {task.nameOfTask === "Feeding" && (
                      <div className="task-amount">
                        <img src={AmountIcon} alt="Amount" />
                        <span>{task.amount} dry food</span>
                      </div>
                    )}
                  </div>
                  {selectedTaskId === task.id && (
                    <div className="task-popup">
                      <p>What would you like to do?</p>
                      <button
                        className="keep-button"
                        onClick={handleKeepScratched}
                      >
                        Keep Task
                      </button>
                      <button
                        className="delete-button"
                        onClick={handleDeleteTask}
                      >
                        Delete Task
                      </button>
                    </div>
                  )}
                </div>
                <button
                  className="task-status"
                  onClick={() =>
                    task.completed
                      ? handleUnselectTask(task.id)
                      : handleTaskCompletion(task.id)
                  }
                >
                  {task.completed ? "✓" : ""}
                </button>
              </div>
              <div className="task-end-wrapper">
                <span className="task-end-time">{task.endTime}</span>
                <img src={ThreeDotsIcon} alt="Options" className="task-dots" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Button */}
      <button
        className="add-task-button"
        onClick={() => navigate("/create-task")}
      >
        <img src={PlusButton} alt="Add Task" className="add-task-icon" />
        Add Task
      </button>
    </div>
  );
}
