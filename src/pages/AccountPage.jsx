import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeDotsIcon from "../assets/Images/threedotstask.svg";
import NotificationIcon from "../assets/Images/notificationicon.svg";

export default function AccountPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "Mette Jensen",
    petNames: ["Alfred", "Monia"],
    profilePic: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <div className="account-page-unique">
      {/* Header Section */}
      <header className="account-header-unique">
        <div className="user-info-unique">
          <img
            src={userData.profilePic}
            alt="User Profile"
            className="user-profile-image-unique"
            loading="lazy" 
          />
          <h2 className="user-name-unique">{userData.userName}</h2>
        </div>
        <img
          src={ThreeDotsIcon}
          alt="Options"
          className="three-dots-icon-unique"
          loading="lazy" 
        />
      </header>

      {/* Family Section */}
      <div className="family-section-unique">
        <h3 className="family-title-unique">Your Family</h3>
        <div className="family-list-unique">
          {userData.petNames.map((petName, index) => (
            <div key={index} className="family-item-square-unique">
              <p className="family-item-name-unique">{petName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder Section */}
      <div
        className="reminder-section-unique"
        onClick={() => navigate("/challenges")} // Navigate to ChallengesPage
        style={{ cursor: "pointer" }} // Indicate clickability
      >
        <div className="notification-icon-wrapper-unique">
          <img
            src={NotificationIcon}
            alt="Notification"
            className="notification-icon-unique"
            loading="lazy" 
          />
        </div>
        <div className="reminder-content-unique">
          <h4 className="reminder-title-unique" style={{ color: "#44B6FF" }}>
            GET CREATIVE
          </h4>
          <p className="reminder-text-unique">
            Remember to complete this week's challenge!
          </p>
        </div>
      </div>
    </div>
  );
}
