import React from "react";
import CatInBoxImage from "../assets/Images/catinabox.jpg";
import GingerCatImage from "../assets/Images/gingercat.jpg";
import DyrenesLogo from "../assets/Images/Dyrenes-Beskyttelse-case-emblem1-1024x1024.jpg";

export default function AnimalPost({ animal }) {
  if (!animal) return null; // Prevent rendering if no animal data is passed

  // Map local image paths to the names used in the JSON
  const localImages = {
    "catinabox.jpg": CatInBoxImage,
    "gingercat.jpg": GingerCatImage,
  };

  const localLogos = {
    "Dyrenes-Beskyttelse-case-emblem1-1024x1024.jpg": DyrenesLogo,
  };

  const {
    image = "fallback-cat-image.jpg", // Replace with a local fallback image path
    adjective = "Lovely",
    name = "Unknown",
    needs = "Not specified",
    shelter = {},
  } = animal;

  const { logo = "fallback-shelter-logo.jpg", name: shelterName = "Unknown Shelter", location = "Unknown Location" } = shelter;

  return (
    <div className="animal-post">
      {/* Animal Image Section */}
      <div className="animal-image-container">
        <img
          src={localImages[image] || image} // Use local image if available
          alt={name}
          className="animal-image"
          onError={(e) => (e.target.src = CatInBoxImage)} // Fallback image
        />
        <div className="needs-help-banner">NEEDS HELP</div>
        <div className="animal-overlay">
          <div className="animal-adjective">{adjective}</div>
          <div className="animal-name">{name}</div>
          <div className="animal-needs">{needs}</div>
        </div>
      </div>

      {/* Shelter Info and Donate Button */}
<div className="shelter-info-section">
  <div className="shelter-details">
    <img
      src={localLogos[logo] || logo} // Use local logo if available
      alt="Shelter Logo"
      className="shelter-logo"
      onError={(e) => (e.target.src = DyrenesLogo)} // Fallback logo
    />
    <div className="shelter-text">
      <p className="shelter-name">{shelterName}</p>
      <p className="shelter-location">{location}</p>
    </div>
  </div>
  <button className="donate-button">Donate</button>
</div>

    </div>
  );
}
