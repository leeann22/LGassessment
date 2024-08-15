import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ categories, onCategoryChange }) {
  return (
    <div className="sidebar">
      <ul>
        <Link to="/details"><li>Details</li></Link> // Add a link to the Details page
      </ul>
      <div>
        <label htmlFor="category-select">Filter by Category:</label>
        <select id="category-select" onChange={(e) => onCategoryChange(e.target.value)}> // add an onChange event listener to the select element
          <option value="">All Categories</option>
          <option value="Data Management">Data Management</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Email Marketing">Email Marketing</option>
          <option value="Landing Pages">Landing Pages</option>
          <option value="Marketing Analytics">Marketing Analytics</option>
          <option value="Marketing Automation">Marketing Automation</option>
          <option value="Platform News and Updates">Platform News and Updates</option>
          <option value="Surveys and Forms">Surveys and Forms</option>
          <option value="Tips and Best Practise">Tips and Best Practise</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Sidebar;