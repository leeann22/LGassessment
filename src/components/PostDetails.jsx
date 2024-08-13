import React, { useState, useEffect } from 'react';

function PostDetails({ postId }) {
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPostDetails(data);
      })
      .catch((error) => console.error('Error fetching post details:', error));
  }, [postId]);

  if (!postDetails) {
    return <p>Loading post details...</p>;
  }

  return (
    <div>
      <h1>{postDetails.title}</h1>
      <img src={postDetails.author.avatar} alt={postDetails.author.name} className="profile"/>
      <p>{postDetails.author.name}</p>
      <p>{postDetails.summary}</p>
      <ul>
        {postDetails.categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetails;