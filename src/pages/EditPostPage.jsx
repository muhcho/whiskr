import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrowIcon from "../assets/Images/backarrow.svg";

export default function EditPostPage() {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState({
    postImage: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postUrl = `https://whiskr-e6309-default-rtdb.firebaseio.com/challenges/${id}.json`;

  // Fetch the existing post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(postUrl);
        if (!response.ok) throw new Error("Failed to fetch post data.");
        const postData = await response.json();
        setPost({
          postImage: postData.postImage || "",
          description: postData.description || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        setError("Failed to fetch post data.");
        setLoading(false);
      }
    }

    fetchPost();
  }, [postUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(postUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        alert("Post updated successfully!");
        navigate(`/post/${id}`); // Redirect back to the post details page
      } else {
        throw new Error("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update the post. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="edit-post-page">
      {/* Back Button */}
      <div className="post-header">
        <img
          src={BackArrowIcon}
          alt="Back"
          className="back-arrow"
          onClick={() => navigate(-1)} // Navigate back to the previous page
        />
        <h2>Edit Your Post</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Post Image URL */}
        <label htmlFor="postImage">Post Image URL</label>
        <input
          type="url"
          id="postImage"
          name="postImage"
          value={post.postImage}
          onChange={handleChange}
          placeholder="Enter new image URL"
        />
        {post.postImage && <img src={post.postImage} alt="Preview" className="image-preview" />}

        {/* Description */}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
          placeholder="Update your description..."
        ></textarea>

        {/* Save Button */}
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </section>
  );
}
