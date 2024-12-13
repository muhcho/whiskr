import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [petNames, setPetNames] = useState([""]); // Start with one pet field
  const [profilePic, setProfilePic] = useState(""); // Profile picture URL or file

  const handleAddPetName = () => {
    setPetNames([...petNames, ""]); // Add an empty input field for a new pet name
  };

  const handlePetNameChange = (index, value) => {
    const updatedPetNames = [...petNames];
    updatedPetNames[index] = value;
    setPetNames(updatedPetNames);
  };

  const handleSubmit = () => {
    if (!userName || !email || petNames.some((name) => !name.trim())) {
      alert("Please fill out all fields.");
      return;
    }

    // Save user data to localStorage
    const userData = {
      userName,
      email,
      petNames: petNames.filter((name) => name.trim()), // Remove empty names
      profilePic: profilePic || "https://via.placeholder.com/150", // Default picture if none provided
    };

    localStorage.setItem("userData", JSON.stringify(userData)); // Save locally

    // Redirect to homepage
    alert("Account created successfully!");
    navigate("/homepage");
  };

  return (
    <div className="create-account-page">
      <h2>Create Your Account</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* User Name */}
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        {/* Profile Picture */}
        <label htmlFor="profilePic">Profile Picture URL</label>
        <input
          type="text"
          id="profilePic"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Paste profile picture URL"
        />
        {profilePic && <img src={profilePic} alt="Preview" className="profile-pic-preview" />}

        {/* Pet Names */}
        <label>Pet Names</label>
        {petNames.map((petName, index) => (
          <input
            key={index}
            type="text"
            value={petName}
            onChange={(e) => handlePetNameChange(index, e.target.value)}
            placeholder={`Pet Name ${index + 1}`}
          />
        ))}
        <button type="button" onClick={handleAddPetName}>
          Add Another Pet
        </button>

        {/* Submit Button */}
        <button type="button" onClick={handleSubmit}>
          Create Account
        </button>
      </form>
    </div>
  );
}
