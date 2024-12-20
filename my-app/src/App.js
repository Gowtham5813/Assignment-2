import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import FilterBar from './components/FilterBar/FilterBar';
import StudentTable from './components/StudentTable/StudentTable';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <FilterBar />
          <StudentTable />
        </div>
      </div>
    </div>
  );
};

export default App;
