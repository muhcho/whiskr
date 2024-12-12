import React, { useState, useEffect } from "react";
import AnimalPost from "../components/AnimalPost";
import CatInBoxImage from "../assets/Images/catinabox.jpg";
import GingerCatImage from "../assets/Images/gingercat.jpg";
import DyrenesLogo from "../assets/Images/Dyrenes-Beskyttelse-case-emblem1-1024x1024.jpg";

export default function DonationsPage() {
  const [animals, setAnimals] = useState([]);
  const [donationPoints, setDonationPoints] = useState(250); // Hardcoded for now

  // Map local images to unique animal identifiers (e.g., names or IDs)
  const localImages = {
    Cleo: CatInBoxImage,
    Fluffy: GingerCatImage,
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(
          "https://whiskr-2-default-rtdb.firebaseio.com/animals.json"
        );
        const data = await response.json();

        // Add local image paths dynamically
        const animalsWithLocalImages = Object.keys(data).map((key) => {
          const animal = data[key];
          const localImage = localImages[animal.name] || animal.image;
          return { ...animal, image: localImage };
        });

        setAnimals(animalsWithLocalImages);
      } catch (error) {
        console.error("Failed to fetch animals data:", error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="donations-page">
      <header className="donations-header">
        <h1 className="donations-title">
          Donations <span className="donations-date">Dec 4</span>
        </h1>
      </header>

      <section className="donation-points-section">
        <h2>Your donation points</h2>
        <div className="donation-points-card">
          <p className="points-amount">
            <span className="heart-icon">❤️</span> {donationPoints} Points
          </p>
          <p className="points-description">
            Use your donation points now! 🙌 <br />
            Collect points by completing your self-set tasks for the week.
          </p>
        </div>
      </section>

      <section className="help-section">
        <h3 className="this-week">THIS WEEK</h3>
        <h2 className="in-need">In need of help</h2>
        {animals.slice(0, 2).map((animal) => (
          <AnimalPost
            key={animal.name} // Use a unique key like name or ID
            animal={animal}
          />
        ))}
      </section>
    </div>
  );
}
