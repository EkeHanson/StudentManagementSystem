import React, { useState, useEffect, useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ParentTab.css';

const ParentTab = ({ data, onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    ward: '',
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteParentId, setDeleteParentId] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(5);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const parentsPerPage = 5;

  // Extract unique wards for filter dropdown
  const uniqueWards = useMemo(() => 
    [...new Set(data.flatMap(parent => parent.wards))].sort(), 
    [data]
  );

  // Apply filters to data
  const filteredParents = useMemo(() => {
    return data.filter(parent => {
      return (
        (filters.name === '' || 
          parent.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.ward === '' || parent.wards.includes(filters.ward))
      );
    });
  }, [data, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredParents.length / parentsPerPage);
  const indexOfLastParent = currentPage * parentsPerPage;
  const indexOfFirstParent = indexOfLastParent - parentsPerPage;
  const currentParents = filteredParents.slice(
    indexOfFirstParent, 
    indexOfLastParent
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
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleDeleteClick = (parentId) => {
    setDeleteParentId(parentId);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteParentId(null);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
  };

  const handleStartDeleteCountdown = () => {
    setIsDeleteConfirmed(true);
    setDeleteTimer(5);
  };

  const handleConfirmDelete = () => {
    if (deleteParentId) {
      onDelete(deleteParentId, 'parents');
    }
    handleCancelDelete();
  };

  return (
    <div className="parent-tab-container">
      {isDeleteConfirmed && (
        <div className="countdown-banner">
          <span>Deleting parent in {deleteTimer} seconds...</span>
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
          aria-label="Search parents by name"
        />
        <select
          name="ward"
          value={filters.ward}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Filter by ward"
        >
          <option value="">All Wards</option>
          {uniqueWards.map((ward) => (
            <option key={ward} value={ward}>{ward}</option>
          ))}
        </select>
      </div>

      <table className="parent-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Ward</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentParents.length > 0 ? (
            currentParents.map((parent) => (
              <tr key={parent.id}>
                <td>{parent.id}</td>
                <td>{parent.name}</td>
                <td>{parent.wards.join(', ')}</td>
                <td>
                  <button 
                    className="action-button edit"
                    onClick={() => onEdit(parent, 'parents')}
                    aria-label={`Edit parent ${parent.name}`}
                  >
                    <EditIcon />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteClick(parent.id)}
                    aria-label={`Delete parent ${parent.name}`}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">No parents match the selected filters.</td>
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
            <p>Deleting parent in {deleteTimer} seconds... Click Cancel to stop.</p>
          ) : (
            <p>Are you sure you want to delete this parent? This action cannot be undone.</p>
          )}
          <div className="delete-modal-actions">
            <button onClick={handleCancelDelete} className="cancel-delete-button">Cancel</button>
            {!isDeleteConfirmed && (
              <button onClick={handleStartDeleteCountdown} className="confirm-delete-button">Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentTab;