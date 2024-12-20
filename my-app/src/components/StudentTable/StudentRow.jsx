import React from 'react';

const StudentRow = ({ student }) => {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.cohort}</td>
      <td>{student.courses.join(', ')}</td>
      <td>{student.dateJoined}</td>
      <td>{student.lastLogin}</td>
      <td>
        <span className={`status-dot ${student.status ? 'online' : 'offline'}`}></span>
      </td>
    </tr>
  );
};

export default StudentRow;
