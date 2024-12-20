import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = ['Dashboard', 'Students', 'Chapter', 'Help', 'Reports', 'Settings'];

  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        {navItems.map((item, index) => (
          <li key={index} className="sidebar-item">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
