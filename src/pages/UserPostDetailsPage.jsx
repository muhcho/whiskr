import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrowIcon from "../assets/Images/backarrow.svg";

export default function UserPostDetailsPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // Store the fetched post
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const postUrl = `https://whiskr-e6309-default-rtdb.firebaseio.com/challenges/${id}.json`;

  // Fetch post data on component mount
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(postUrl);
        if (!response.ok) throw new Error("Failed to fetch post data.");
        const postData = await response.json();
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        setError("Failed to fetch post data. Please try again.");
        setLoading(false);
      }
    }

    fetchPost();
  }, [postUrl]);

  // Navigate to Edit Page
  const handleEditPost = () => {
    navigate(`/edit-post/${id}`); // Adjust this path to match your routing configuration
  };

  // Delete Post
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(postUrl, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete post.");
        alert("Post deleted successfully!");
        navigate("/challenges"); // Redirect to challenges page
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete the post. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="user-post-error-message-unique">{error}</p>;

  return (
    <div className="user-post-details-page-unique">
      {/* Header */}
      <div className="post-header-unique">
        <img
          src={BackArrowIcon}
          alt="Back"
          className="back-arrow-unique"
          onClick={() => navigate("/challenges")}
        />
        <h2 className="user-submission-title-unique">Your Submission</h2>
      </div>

      {/* Post Content */}
      <div className="post-content-unique">
        <div className="post-user-unique">
          <img
            src={post.image || "https://via.placeholder.com/50"}
            alt={`${post.name}'s profile`}
            className="user-avatar-unique"
          />
          <div>
            <h3 className="post-user-name-unique">{post.name}</h3>
            <p className="post-time-unique">{post.postTime}</p>
          </div>
        </div>
        <img src={post.postImage} alt="User submission" className="post-image-unique" />
        <p className="post-description-unique">{post.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-unique">
        <button className="edit-button-unique" onClick={handleEditPost}>
          Edit Post
        </button>
        <button className="delete-button-unique" onClick={handleDeletePost}>
          Delete Post
        </button>
      </div>
    </div>
  );
}
