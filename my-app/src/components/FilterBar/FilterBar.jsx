import React from 'react';
import './FilterBar.css';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <select>
        <option>AY 2024-25</option>
      </select>
      <select>
        <option>CBSE 9</option>
      </select>
      <button className="add-student-btn">+ Add new Student</button>
    </div>
  );
};

export default FilterBar;
