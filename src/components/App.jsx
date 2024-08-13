import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { makeServer } from "../mock";
import Sidebar from './Sidebar';
import Posts from './Posts';
import Details from './Details';
import PostDetails from './PostDetails';

import "./styles.scss";

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories from the API or define them statically
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="app">
      <Sidebar categories={categories} onCategoryChange={setSelectedCategory} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Posts selectedCategory={selectedCategory} />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;