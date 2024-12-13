import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatImage from "../assets/Images/catyellowcat.jpg";

export default function ChallengesPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch(
          "https://whiskr-e6309-default-rtdb.firebaseio.com/challenges.json"
        );
        const data = await response.json();
        const postsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Sort posts by newest first (optional but good UX)
        setPosts(postsArray.reverse());
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }

    fetchChallenges();
  }, []);

  // Display either the first five posts or all posts
  const visiblePosts = showAll ? posts : posts.slice(0, 5);

  return (
    <div className="challenges-page">
      {/* Header Section */}
      <header className="challenges-header">
        <h1 className="challenges-title">
          Challenges <span className="challenges-week">this week</span>
        </h1>
      </header>

      {/* Challenge Highlight Section */}
      <section className="challenge-highlight" style={{ backgroundColor: "#D7FDFE" }}>
        <div className="challenge-content">
          <h2 className="challenge-type" style={{ color: "#44B6FF" }}>
            GET CREATIVE
          </h2>
          <h3 className="challenge-title">
            Post a picture of <br />
            your cat with a hat on
          </h3>
          <p className="challenge-description">
            Show your cute little friend to us
          </p>

          {/* Image with Overlay Text */}
          <div className="challenge-image-container">
            <img src={CatImage} alt="Cat with Hat" className="challenge-image" />
            <p className="overlay-text">Something like this</p>
          </div>

          {/* Buttons */}
          <div className="challenge-buttons">
            <button
              className="join-challenge-button"
              onClick={() => navigate("/create-challenge")}
            >
              Join Challenge
            </button>
            <button className="remind-me-button">Remind me</button>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="challenges-posts">
        <h2 className="posts-title">Other people's submissions</h2>
        <div className="posts-container">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="challenge-post"
              onClick={() => navigate(`/post/${post.id}`)} // Navigate to the specific post
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate clickability
            >
              {/* User Info */}
              <div className="post-user-info">
                <img src={post.image} alt={`${post.name}'s avatar`} className="user-avatar" />
                <div className="user-details">
                  <p className="user-name">{post.name}</p>
                  <p className="post-time">{post.postTime}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="post-content">
                <img src={post.postImage} alt="Cat post" className="post-image" />
                <p className="post-description">{post.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "See All" Button */}
        {!showAll && posts.length > 5 && (
          <div className="see-all-container">
            <button className="see-all-button" onClick={() => setShowAll(true)}>
              See All
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
