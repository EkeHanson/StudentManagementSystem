import React, { useState, useMemo, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './Classes.css';

const Classes = ({ data = [], onEdit, onDelete, onAdd }) => {
  const [filter, setFilter] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteClassId, setDeleteClassId] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(5);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [formData, setFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});

  // Filter classes by name
  const filteredClasses = useMemo(() => {
    return data.filter((cls) =>
      cls.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  // Timer logic for deletion countdown
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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAddClick = () => {
    setFormData({});
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setFormData({});
  };

  const handleEditClick = (cls) => {
    setEditFormData(cls);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setEditFormData({});
  };

  const handleFormChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSubmit = () => {
    if (!formData.id || !formData.name) {
      return;
    }
    onAdd(formData, 'classes');
    handleAddModalClose();
  };

  const handleEditSubmit = () => {
    if (!editFormData.id || !editFormData.name) {
      return;
    }
    onEdit(editFormData, 'classes');
    handleEditModalClose();
  };

  const handleDeleteClick = (classId) => {
    setDeleteClassId(classId);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteClassId(null);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
  };

  const handleStartDeleteCountdown = () => {
    setIsDeleteConfirmed(true);
    setDeleteTimer(5);
  };

  const handleConfirmDelete = () => {
    if (deleteClassId) {
      onDelete(deleteClassId, 'classes');
    }
    handleCancelDelete();
  };

  return (
    <div className="classes-container">
      {isDeleteConfirmed && (
        <div className="countdown-banner">
          <span>Deleting class in {deleteTimer} seconds...</span>
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
          placeholder="Search by name..."
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
          aria-label="Search classes by name"
        />
        <button
          className="add-button"
          onClick={handleAddClick}
          aria-label="Add new class"
        >
          <AddIcon /> Add New
        </button>
      </div>

      <table className="classes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => (
              <tr key={cls.id}>
                <td>{cls.id}</td>
                <td>{cls.name}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEditClick(cls)}
                    aria-label={`Edit class ${cls.name}`}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => handleDeleteClick(cls.id)}
                    aria-label={`Delete class ${cls.id}`}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-results">
                No classes match the search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={`dialog ${openAddModal ? 'open' : ''}`}>
        <div className="dialog-content">
          <h2>Add New Class</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="ID (e.g., CLS-001)"
              name="id"
              value={formData.id || ''}
              onChange={(e) => handleFormChange(e, false)}
              required
            />
            <input
              type="text"
              placeholder="Name (e.g., Grade 5)"
              name="name"
              value={formData.name || ''}
              onChange={(e) => handleFormChange(e, false)}
              required
            />
          </div>
          <div className="dialog-actions">
            <button onClick={handleAddModalClose} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleAddSubmit} className="save-button">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className={`dialog ${openEditModal ? 'open' : ''}`}>
        <div className="dialog-content">
          <h2>Edit Class</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="ID (e.g., CLS-001)"
              name="id"
              value={editFormData.id || ''}
              onChange={(e) => handleFormChange(e, true)}
              required
            />
            <input
              type="text"
              placeholder="Name (e.g., Grade 5)"
              name="name"
              value={editFormData.name || ''}
              onChange={(e) => handleFormChange(e, true)}
              required
            />
          </div>
          <div className="dialog-actions">
            <button onClick={handleEditModalClose} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleEditSubmit} className="save-button">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className={`delete-modal ${openDeleteModal ? 'open' : ''}`}>
        <div className="delete-modal-content">
          <h2>Confirm Deletion</h2>
          {isDeleteConfirmed ? (
            <p>Deleting class in {deleteTimer} seconds... Click Cancel to stop.</p>
          ) : (
            <p>Are you sure you want to delete this class? This action cannot be undone.</p>
          )}
          <div className="delete-modal-actions">
            <button onClick={handleCancelDelete} className="cancel-delete-button">
              Cancel
            </button>
            {!isDeleteConfirmed && (
              <button
                onClick={handleStartDeleteCountdown}
                className="confirm-delete-button"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;