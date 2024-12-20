import React from 'react';
import StudentRow from './StudentRow';
import './StudentTable.css';

const students = [
  {
    name: 'Anshuman Kashyap',
    cohort: 'AY 2024-25',
    courses: ['CBSE 9 Science', 'CBSE 9 Math'],
    dateJoined: '17. Nov. 2024',
    lastLogin: '17. Nov. 2024 4:16 PM',
    status: true,
  },
  // Add more student objects here
];

const StudentTable = () => {
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Cohort</th>
          <th>Courses</th>
          <th>Date Joined</th>
          <th>Last Login</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <StudentRow key={index} student={student} />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
