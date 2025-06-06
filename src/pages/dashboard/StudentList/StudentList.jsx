import React, { useState, useMemo, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './StudentList.css';

const StudentList = ({ data, onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    class: '',
    gender: '',
    status: ''
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(5);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [formData, setFormData] = useState({});
  const studentsPerPage = 7;

  // Extract unique classes and genders for dropdowns
  const uniqueClasses = useMemo(() => 
    [...new Set(data.map(student => student.class))].sort(), 
    [data]
  );
  const uniqueGenders = useMemo(() => 
    [...new Set(data.map(student => student.gender))].sort(), 
    [data]
  );

  // Apply filters to data
  const filteredStudents = useMemo(() => {
    return data.filter(student => {
      return (
        (filters.name === '' || 
          student.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.class === '' || student.class === filters.class) &&
        (filters.gender === '' || student.gender === filters.gender) &&
        (filters.status === '' || student.status === filters.status)
      );
    });
  }, [data, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent, 
    indexOfLastStudent
  );

  // Timer logic for the deletion countdown
  useEffect(() => {
    if (!openDeleteModal || !isDeleteConfirmed) return;

    if (deleteTimer === 0) {
      handleConfirmDelete();
      return;
    }

    const timer = setInterval(() => {
      setDeleteTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [openDeleteModal, isDeleteConfirmed, deleteTimer]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleDeleteClick = (studentId) => {
    setDeleteStudentId(studentId);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteStudentId(null);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
  };

  const handleStartDeleteCountdown = () => {
    setIsDeleteConfirmed(true);
    setDeleteTimer(5);
  };

  const handleConfirmDelete = () => {
    if (deleteStudentId) {
      onDelete(deleteStudentId, 'students');
    }
    handleCancelDelete();
  };

  const handleAddClick = () => {
    setFormData({});
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setFormData({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = () => {
    if (!formData.id || !formData.name || !formData.class || !formData.gender || !formData.attendance || !formData.status) {
      return;
    }
    onAdd({ ...formData, status: formData.status || 'Active' }, 'students');
    handleAddModalClose();
  };

  return (
    <div className="student-list-container">
      {isDeleteConfirmed && (
        <div className="countdown-banner">
          <span>Deleting student in {deleteTimer} seconds...</span>
          <button
            onClick={handleCancelDelete}
            className="cancel-countdown-button"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="filter-container">
        <input
          type="text"
          name="name"
          placeholder="Search by name..."
          value={filters.name}
          onChange={handleFilterChange}
          className="filter-input"
          aria-label="Search students by name"
        />
        <select
          name="class"
          value={filters.class}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Filter by class"
        >
          <option value="">All Classes</option>
          {uniqueClasses.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Filter by gender"
        >
          <option value="">All Genders</option>
          {uniqueGenders.map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          className="add-button"
          onClick={handleAddClick}
          aria-label="Add new student"
        >
          <AddIcon /> Add New
        </button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Gender</th>
            <th>Attendance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.gender}</td>
                <td>{student.attendance}</td>
                <td>
                  <span className={`status-chip ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="action-button edit"
                    onClick={() => onEdit(student, 'students')}
                    aria-label={`Edit student ${student.name}`}
                  >
                    <EditIcon />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteClick(student.id)}
                    aria-label={`Delete student ${student.id}`}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-results">No students match the selected filters.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      <div className={`delete-modal ${openDeleteModal ? 'open' : ''}`}>
        <div className="delete-modal-content">
          <h2>Confirm Deletion</h2>
          {isDeleteConfirmed ? (
            <p>Deleting student in {deleteTimer} seconds... Click Cancel to stop.</p>
          ) : (
            <p>Are you sure you want to delete this student? This action cannot be undone.</p>
          )}
          <div className="delete-modal-actions">
            <button onClick={handleCancelDelete} className="cancel-delete-button">Cancel</button>
            {!isDeleteConfirmed && (
              <button onClick={handleStartDeleteCountdown} className="confirm-delete-button">Delete</button>
            )}
          </div>
        </div>
      </div>

      <div className={`dialog ${openAddModal ? 'open' : ''}`}>
        <div className="dialog-content">
          <h2>Add New Student</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="ID"
              name="id"
              value={formData.id || ''}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Class"
              name="class"
              value={formData.class || ''}
              onChange={handleFormChange}
              required
            />
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleFormChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Attendance"
              name="attendance"
              value={formData.attendance || ''}
              onChange={handleFormChange}
              required
            />
            <select
              name="status"
              value={formData.status || ''}
              onChange={handleFormChange}
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="dialog-actions">
            <button onClick={handleAddModalClose} className="cancel-button">Cancel</button>
            <button onClick={handleAddSubmit} className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;