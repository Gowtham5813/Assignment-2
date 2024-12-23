import React from 'react';

const StudentRow = ({ student, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.cohort}</td>
      <td>{student.courses}</td>
      <td>{student.dateJoined}</td>
      <td>{student.lastLogin}</td>
      <td>{student.status ? 'Active' : 'Inactive'}</td>
      <td>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default StudentRow;
