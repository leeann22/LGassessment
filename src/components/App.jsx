import React, { useEffect, useState } from "react";
import { makeServer } from "../mock";

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
        } else {
          console.error('Posts data is missing');
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{new Date(post.publishDate).toLocaleString()}</p>
              <img src={post.author.avatar} alt={post.author.name} />
              <p>{post.author.name}</p>
              <p>{post.summary}</p>
              <ul>
                {post.categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
}

export default App;
