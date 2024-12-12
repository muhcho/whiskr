import React from "react";

export default function SmallerAnimalPost({ animal }) {
  if (!animal) return null;

  const {
    image,
    adjective = "Lovely",
    name = "Unknown",
    shelter = {},
  } = animal;

  const { logo, name: shelterName, location } = shelter;

  return (
    <div className="smaller-animal-post">
      <div className="smaller-animal-image-container">
        <img src={image} alt={name} className="smaller-animal-image" />
        <div className="smaller-animal-overlay">
          <div className="smaller-animal-adjective">{adjective}</div>
          <div className="smaller-animal-name">{name}</div>
        </div>
      </div>
      <div className="smaller-shelter-info">
        <img src={logo} alt={shelterName} className="smaller-shelter-logo" />
        <div className="smaller-shelter-details">
          <p className="smaller-shelter-name">{shelterName}</p>
          <p className="smaller-shelter-location">{location}</p>
        </div>
      </div>
    </div>
  );
}
