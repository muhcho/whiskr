import React from "react";
import { useNavigate } from "react-router-dom";
import CatAnimation from "../components/CatAnimation";
import WhiskrLogo from "../assets/Images/WhiskrLogo.svg";

export default function StartPage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/homepage"); // Navigates to the HomePage
  };

  const handleCreateAccountClick = () => {
    navigate("/create-account"); // Navigate to CreateAccountPage
  };

  return (
    <div className="start-page">
      <CatAnimation />
      <img src={WhiskrLogo} alt="Whiskr Logo" className="start-page-logo" />
      <p className="start-page-description">
        Manage your cat's daily schedule, earn points for every task, and use them to support animals in shelters.
      </p>
      <button className="start-page-button" onClick={handleStartClick}>
        Start
      </button>
      <p
        className="start-page-create-account"
        onClick={handleCreateAccountClick}
        style={{ cursor: "pointer" }} // Makes the text clickable
      >
        Create account
      </p>
    </div>
  );
}
