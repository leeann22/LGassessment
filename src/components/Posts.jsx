import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function Posts({ selectedCategory }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsVisible, setPostsVisible] = useState(true);
  const postsPerPage = 3;

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

  const filteredPosts = selectedCategory.length > 0
  ? posts.filter(post => post.categories.some(category => selectedCategory.includes(category.name)))
  : posts;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
    const handleClick = (pageNumber) => {
      setCurrentPage(pageNumber);
      // Only toggle posts visibility when changing pages
      if (currentPage !== pageNumber) {
        setPostsVisible(!postsVisible);
      }
    };
  
    return (
      <div>
        <h1>POSTS</h1>
        <ul>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <li key={post.id} className={`post ${postsVisible ? 'visible' : ''}`}>
                <div className="author">
                  <img src={post.author.avatar} alt={post.author.name} className="profile"/>
                  <div className="title">
                    <p>{post.author.name} {new Date(post.publishDate).toLocaleString()}</p>
                    <p>{post.title}</p>
                  </div>
                </div>
                <p>{post.summary}</p>
                <div className="categories">
                  {post.categories.slice(0, 3).map((category) => (
                    <li key={category.id} className="category">{category.name} </li>
                  ))}
                  {post.categories.length > 3 && (
                    <>
                      <Link to={`/posts/${post.id}`} >
                        + {post.categories.length - 3} more
                      </Link>
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>Loading posts...</p>
          )}
        </ul>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

export default Posts;