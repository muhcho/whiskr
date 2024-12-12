import React, { useState, useEffect } from "react";
import AnimalPost from "../components/AnimalPost";
import SmallerAnimalPost from "../components/SmallerAnimalPost"; // New component
import CatInBoxImage from "../assets/Images/catinabox.jpg";
import GingerCatImage from "../assets/Images/gingercat.jpg";
import DyrenesLogo from "../assets/Images/Dyrenes-Beskyttelse-case-emblem1-1024x1024.jpg";
import PetHouseLogo from "../assets/Images/monoline-pet-house-logo-animal-store-logo-design-vector.jpg";
import HumaneSocietyLogo from "../assets/Images/images.png";
import AdoptionVideo from "../assets/Images/videocatsadopt.mp4";
import WhiteCatImage from "../assets/Images/whitecat.jpg";
import BlackCatImage from "../assets/Images/blackcat.jpg";
import FunnyCatImage from "../assets/Images/funnycat.jpg";
import OrangeKittenImage from "../assets/Images/orangekitten.jpg";

export default function DonationsPage() {
  const [animals, setAnimals] = useState([]);
  const [donationPoints, setDonationPoints] = useState(250);

  const shelters = [
    {
      logo: DyrenesLogo,
      name: "Dyrenes Beskyttelse",
      location: "Aarhus",
      website: "https://www.dyrenesbeskyttelse.dk/internat/dyrenes-beskyttelse-aarhus",
    },
    {
      logo: PetHouseLogo,
      name: "Pet House",
      location: "Copenhagen",
      website: "https://www.dyrenesbeskyttelse.dk/internat/dyrenes-beskyttelse-aarhus",
    },
    {
      logo: HumaneSocietyLogo,
      name: "Human Society Schuyler County",
      location: "Aarhus",
      website: "https://www.dyrenesbeskyttelse.dk/internat/dyrenes-beskyttelse-aarhus",
    },
  ];

  const localImages = {
    Cleo: CatInBoxImage,
    Fluffy: GingerCatImage,
  };

  const smallerAnimals = [
    {
      image: WhiteCatImage,
      adjective: "Majestic",
      name: "Snowball",
      shelter: {
        name: "Dyrenes Beskyttelse",
        logo: DyrenesLogo,
        location: "Aarhus",
      },
    },
    {
      image: BlackCatImage,
      adjective: "Mysterious",
      name: "Shadow",
      shelter: {
        name: "Pet House",
        logo: PetHouseLogo,
        location: "Copenhagen",
      },
    },
    {
      image: FunnyCatImage,
      adjective: "Playful",
      name: "Whisker",
      shelter: {
        name: "Human Society Schuyler County",
        logo: HumaneSocietyLogo,
        location: "Aarhus",
      },
    },
    {
      image: OrangeKittenImage,
      adjective: "Adorable",
      name: "Pumpkin",
      shelter: {
        name: "Dyrenes Beskyttelse",
        logo: DyrenesLogo,
        location: "Aarhus",
      },
    },
  ];

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(
          "https://whiskr-2-default-rtdb.firebaseio.com/animals.json"
        );
        const data = await response.json();

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
    <div className="donations-page" style={{ width: "100%" }}>
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
          <AnimalPost key={animal.name} animal={animal} />
        ))}
      </section>

      <section className="shelters-section">
        <div className="shelters-background">
          <div className="video-container">
            <video className="adoption-video" src={AdoptionVideo} autoPlay loop muted />
            <div className="video-overlay-text">
              If you wish to adopt contact us or the shelter
            </div>
          </div>
          <h2 className="shelters-title">Shelters we work with</h2>
          <div className="shelter-list">
            {shelters.map((shelter) => (
              <div className="shelter-item" key={shelter.name}>
                <img src={shelter.logo} alt={shelter.name} className="shelter-logo" />
                <div className="shelter-text">
                  <p className="shelter-name">{shelter.name}</p>
                  <p className="shelter-location">{shelter.location}</p>
                </div>
                <a href={shelter.website} className="visit-website-button" target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cats-helped-section">
  <h2 className="cats-helped-title">Cats you have helped</h2>
  <div className="cats-helped-scroll">
    {smallerAnimals.map((animal) => (
      <SmallerAnimalPost key={animal.name} animal={animal} />
    ))}
  </div>
</section>

    </div>
  );
}
