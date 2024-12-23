import React, { useState, useEffect } from 'react';
import StudentRow from './StudentRow';
import { supabase } from '../supabaseClient';
import './StudentTable.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    cohort: '',
    courses: '',
    dateJoined: new Date().toISOString().split('T')[0],
    lastLogin: new Date().toISOString().slice(0, 16),
    status: true,
  });
  
  const [editStudent, setEditStudent] = useState(null); // or initial editStudent structure if needed
  

  // Fetch students from Supabase
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('students').select('*');
    if (error) {
      console.error('Error fetching students:', error.message);
    } else {
      setStudents(data);
    }
    setLoading(false);
  };

  // Add a new student
  const addStudent = async () => {
    if (!newStudent.name || !newStudent.cohort) {
      alert('Please fill out the Name and Cohort fields.');
      return;
    }
  
    const { data, error } = await supabase.from('students').insert([newStudent]);
  
    // Log the response to check the structure of the data
    console.log('Supabase Response:', { data, error });
  
    if (error) {
      console.error('Error adding student:', error.message);
      alert('Failed to add student. Check the console for details.');
    } else {
      if (Array.isArray(data)) {
        // If data is an array, proceed with adding the new student
        setStudents([...students, data[0]]);
      } else {
        console.error('Expected an array from Supabase, but got:', data);
      }
  
      setNewStudent({
        name: '',
        cohort: '',
        courses: '',
        dateJoined: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().slice(0, 16),
        status: true,
      });
      alert('Student added successfully!');
    }
  };
  
  
  
  // Update an existing student
  const updateStudent = async () => {
    if (!editStudent.name || !editStudent.cohort) {
      alert('Please fill out the Name and Cohort fields.');
      return;
    }

    const { data, error } = await supabase
      .from('students')
      .update(editStudent)
      .eq('id', editStudent.id);
    if (error) {
      console.error('Error updating student:', error.message);
      alert('Failed to update student. Check the console for details.');
    } else {
      setStudents(students.map((student) => (student.id === editStudent.id ? data[0] : student)));
      setEditStudent(null);
      alert('Student updated successfully!');
    }
  };

  // Delete a student
  const deleteStudent = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this student?');
    if (!confirmation) return;

    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) {
      console.error('Error deleting student:', error.message);
      alert('Failed to delete student. Check the console for details.');
    } else {
      setStudents(students.filter((student) => student.id !== id));
      alert('Student deleted successfully!');
    }
  };

  return (
    <div>
      <h1>Student Management</h1>
      {loading && <p>Loading...</p>}

      {/* Add/Edit Student Form */}
      <div>
        <h2>{editStudent ? 'Edit Student' : 'Add Student'}</h2>
        <input
  type="text"
  placeholder="Name"
  value={editStudent ? editStudent.name || '' : newStudent.name || ''}
  onChange={(e) =>
    editStudent
      ? setEditStudent({ ...editStudent, name: e.target.value })
      : setNewStudent({ ...newStudent, name: e.target.value })
  }
/>

<input
  type="text"
  placeholder="Cohort"
  value={editStudent ? editStudent.cohort || '' : newStudent.cohort || ''}
  onChange={(e) =>
    editStudent
      ? setEditStudent({ ...editStudent, cohort: e.target.value })
      : setNewStudent({ ...newStudent, cohort: e.target.value })
  }
/>

<input
  type="text"
  placeholder="Courses (comma-separated)"
  value={editStudent ? editStudent.courses || '' : newStudent.courses || ''}
  onChange={(e) =>
    editStudent
      ? setEditStudent({ ...editStudent, courses: e.target.value })
      : setNewStudent({ ...newStudent, courses: e.target.value })
  }
/>

<input
  type="date"
  placeholder="Date Joined"
  value={editStudent ? editStudent.dateJoined || '' : newStudent.dateJoined || ''}
  onChange={(e) =>
    editStudent
      ? setEditStudent({ ...editStudent, dateJoined: e.target.value })
      : setNewStudent({ ...newStudent, dateJoined: e.target.value })
  }
/>

<input
  type="datetime-local"
  placeholder="Last Login"
  value={editStudent ? editStudent.lastLogin || '' : newStudent.lastLogin || ''}
  onChange={(e) =>
    editStudent
      ? setEditStudent({ ...editStudent, lastLogin: e.target.value })
      : setNewStudent({ ...newStudent, lastLogin: e.target.value })
  }
/>

<select
  value={editStudent ? String(editStudent.status) : String(newStudent.status)}
  onChange={(e) =>
    editStudent
      ? setEditStudent({ ...editStudent, status: e.target.value === 'true' })
      : setNewStudent({ ...newStudent, status: e.target.value === 'true' })
  }
>
  <option value="true">Active</option>
  <option value="false">Inactive</option>
</select>



<button
  className="add-student-button"
  onClick={editStudent ? updateStudent : addStudent}
  disabled={!newStudent.name || !newStudent.cohort}
>
  {editStudent ? 'Update Student' : 'Add Student'}
</button>

        {editStudent && <button onClick={() => setEditStudent(null)}>Cancel</button>}
      </div>

      {/* Student Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Cohort</th>
            <th>Courses</th>
            <th>Date Joined</th>
            <th>Last Login</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onEdit={() => setEditStudent(student)}
              onDelete={() => deleteStudent(student.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
