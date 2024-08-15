import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
  // Get the postId from the URL
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    // Fetch post details from the API
    fetch(`/api/posts/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {
          setPostDetails(data.posts.find((post) => post.id === postId));
        } else {
          console.error('Posts data is missing');
        }
      })
      .catch((error) => console.error('Error fetching post details:', error));
  }, [postId]);

  if (!postDetails) {
    return <p>Loading post details...</p>; // Add a loading state
  }

  return (
    <div>
      <ul>
      <li key={postDetails.id}>
        <div className="author">
          <img src={postDetails.author.avatar} alt={postDetails.author.name} className="profile"/>
          <div className="title">
            <p>{postDetails.author.name} {new Date(postDetails.publishDate).toLocaleString()}</p>
            <p>{postDetails.title}</p>
          </div>
        </div>
          <p>{postDetails.summary}</p>
          <div className="categories">
            {postDetails.categories.map((category) => (
              <li key={category.id} className="category">{category.name} </li>
            ))}
        </div>
      </li>
      </ul>
    </div>
  );
}

export default PostDetails;