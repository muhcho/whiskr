import React, { useState } from "react";
import CalendarIcon from "../assets/Images/calendar_homepage.svg";

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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
    </div>
  );
}
