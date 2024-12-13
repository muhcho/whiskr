import React, { useState, useEffect } from "react";
import UserProfileImage from "../assets/Images/mettepic.jpg"; // Example user profile image
import ThreeDotsIcon from "../assets/Images/threedotstask.svg";
import NotificationIcon from "../assets/Images/notificationicon.svg";

export default function AccountPage() {
  const [petNames, setPetNames] = useState([]);

  useEffect(() => {
    let isMounted = true; // Prevent state update if the component is unmounted

    async function fetchPets() {
      try {
        const response = await fetch(
          "https://whiskr-2-default-rtdb.firebaseio.com/tasks.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pet names.");
        }

        const data = await response.json();

        if (isMounted) {
          // Extract unique pet names
          const uniquePetNames = Array.from(
            new Set(
              Object.values(data)
                .map((task) => task.petName)
                .filter((name) => name === "Alfred" || name === "Monia")
            )
          );
          setPetNames(uniquePetNames);
        }
      } catch (error) {
        console.error("Error fetching pet names:", error);
      }
    }

    fetchPets();

    return () => {
      isMounted = false; // Cleanup to prevent setting state on unmounted component
    };
  }, []); // Empty dependency array ensures fetching happens only once

  return (
    <div className="account-page-unique">
      {/* Header Section */}
      <header className="account-header-unique">
        <div className="user-info-unique">
          <img
            src={UserProfileImage}
            alt="User Profile"
            className="user-profile-image-unique"
          />
          <h2 className="user-name-unique">Mette Jensen</h2>
        </div>
        <img
          src={ThreeDotsIcon}
          alt="Options"
          className="three-dots-icon-unique"
        />
      </header>

      {/* Family Section */}
      <div className="family-section-unique">
        <h3 className="family-title-unique">Your Family</h3>
        <div className="family-list-unique">
          {petNames.map((petName, index) => (
            <div key={index} className="family-item-square-unique">
              <p className="family-item-name-unique">{petName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder Section */}
      <div className="reminder-section-unique">
        <div className="notification-icon-wrapper-unique">
          <img
            src={NotificationIcon}
            alt="Notification"
            className="notification-icon-unique"
          />
        </div>
        <div className="reminder-content-unique">
          <h4 className="reminder-title-unique" style={{ color: "#44B6FF" }}>
            GET CREATIVE
          </h4>
          <p className="reminder-text-unique">
            Remember to complete this weeks challenge!
          </p>
        </div>
      </div>
    </div>
  );
}
