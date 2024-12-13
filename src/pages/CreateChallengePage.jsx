import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/Images/backarrow.svg";
import EmptyImageIcon from "../assets/Images/emptyimage.svg";

export default function CreateChallengePage() {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState(""); // Image URL or file
  const [description, setDescription] = useState("");

  // Get user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const userName = storedUserData?.userName || "Anonymous"; // Use the name the user set during account creation

  const handleSubmit = async () => {
    if (!postImage || !description) {
      alert("Please fill out all fields.");
      return;
    }

    const newPost = {
      name: userName, // Dynamic user name
      image: "https://via.placeholder.com/50", // Default user avatar
      postImage,
      description,
      postTime: "Just now", // Static time
    };

    try {
      const response = await fetch(
        "https://whiskr-e6309-default-rtdb.firebaseio.com/challenges.json",
        {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      alert("Challenge submitted successfully!");
      navigate("/challenges");
    } catch (error) {
      console.error("Error submitting challenge:", error);
      alert("Failed to create the post. Please try again.");
    }
  };

  return (
    <section className="create-challenge-page">
      {/* Header */}
      <div className="header">
        <img
          src={BackIcon}
          alt="Back"
          onClick={() => navigate("/challenges")}
          className="back-icon"
        />
        <h2 className="page-title">Join challenge</h2>
      </div>

      {/* Challenge Information */}
      <div className="challenge-info">
        <h3 style={{ color: "#44B6FF" }}>GET CREATIVE</h3>
        <h4>Post a picture of your cat with a hat on</h4>
        <p>Show your cute little friend to us</p>
      </div>

      {/* Image Upload */}
      <div className="image-upload">
        {postImage ? (
          <img src={postImage} alt="Preview" className="image-preview" />
        ) : (
          <div className="image-placeholder">
            <img src={EmptyImageIcon} alt="Upload" />
            <p>Choose a file or drag and drop it here.</p>
          </div>
        )}
        <input
          type="text"
          placeholder="Paste image URL"
          value={postImage}
          onChange={(e) => setPostImage(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="description-section">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Describe your submission..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmit}>
        Join the challenge
      </button>
    </section>
  );
}
