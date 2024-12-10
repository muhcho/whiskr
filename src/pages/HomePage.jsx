import React, { useState, useEffect } from "react";
import CalendarIcon from "../assets/Images/calendar_homepage.svg";
import DurationIcon from "../assets/Images/duration_icon.svg";
import AmountIcon from "../assets/Images/amout_icon.svg";

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch tasks from Firebase
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("https://whiskr-2-default-rtdb.firebaseio.com/tasks.json");
      const data = await response.json();
      const formattedTasks = Object.values(data).sort((a, b) => a.startTime.localeCompare(b.startTime));
      setTasks(formattedTasks);
    };

    fetchTasks();
  }, []);

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
            <span className="calendar-notification">2</span>
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
        {tasks.slice(0, 4).map((task, index) => (
          <div
            key={index}
            className="task-component"
            style={{
              backgroundColor:
                task.nameOfTask === "Feeding"
                  ? "var(--light-blue)"
                  : "var(--light-pink)",
            }}
          >
            <div
              className="task-tick-bar"
              style={{
                backgroundColor:
                  task.nameOfTask === "Feeding"
                    ? "var(--orange)"
                    : "var(--pink)",
              }}
            ></div>
            <div className="task-time">{task.startTime}</div>
            <div className="task-details">
              <div className="task-left">
                <h2
                  className="task-name"
                  style={{
                    color:
                      task.nameOfTask === "Feeding"
                        ? "var(--orange)"
                        : "var(--pink)",
                  }}
                >
                  {task.petName}'s <br />
                  {task.nameOfTask}
                </h2>
                <div className="task-duration">
                  <img src={DurationIcon} alt="Duration" />
                  <span>{task.duration} min</span>
                </div>
                {task.nameOfTask === "Feeding" && (
                  <div className="task-amount">
                    <img src={AmountIcon} alt="Amount" />
                    <span>{task.amount} dry food</span>
                  </div>
                )}
              </div>
              <div
                className="task-status"
                onClick={() =>
                  setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
              >
                {task.completed && <span>✓</span>}
              </div>
            </div>
            <div className="task-end-time">
              {task.endTime}
              <span className="task-dots">...</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
