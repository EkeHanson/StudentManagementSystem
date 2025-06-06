import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './AdminDashboard.css';

const EventsTab = ({ data, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [dateError, setDateError] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(5);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const itemsPerPage = 5;

  // Get current date for expiration check
  const today = new Date();

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

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterStatus('');
    setFilterStartDate('');
    setFilterEndDate('');
    setCurrentPage(1);
  };

  // Search and filter logic
  const filteredEvents = data.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType ? event.type === filterType : true;
    
    const isExpired = new Date(event.endDate) < today;
    const matchesStatus = filterStatus 
      ? (filterStatus === 'active' ? !isExpired : isExpired)
      : true;
    
    const eventStartDate = new Date(event.startDate);
    const matchesDate = 
      (!filterStartDate || eventStartDate >= new Date(filterStartDate)) &&
      (!filterEndDate || eventStartDate <= new Date(filterEndDate));
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Event handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterStartDateChange = (e) => {
    setFilterStartDate(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterEndDateChange = (e) => {
    setFilterEndDate(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDescription = (eventId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handleAddEvent = () => {
    setFormData({});
    setDateError('');
    setOpenDialog(true);
  };

  const handleEditEvent = (event) => {
    setFormData(event);
    setDateError('');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({});
    setDateError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'startDate' || name === 'endDate') {
      setDateError('');
    }
  };

  const handleSubmit = () => {
    if (!formData.startDate) {
      setDateError('Start date is required');
      return;
    }
    
    const endDate = formData.endDate || formData.startDate;
    if (new Date(endDate) < new Date(formData.startDate)) {
      setDateError('End date cannot be before start date');
      return;
    }

    const eventData = {
      ...formData,
      id: formData.id || Date.now(),
      type: formData.type || 'event',
      endDate,
    };

    if (!formData.id) {
      onAdd(eventData);
    } else {
      onEdit(eventData, 'events');
    }
    handleDialogClose();
  };

  const handleDeleteClick = (eventId) => {
    setDeleteEventId(eventId);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteEventId(null);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
  };

  const handleStartDeleteCountdown = () => {
    setIsDeleteConfirmed(true);
    setDeleteTimer(5);
  };

  const handleConfirmDelete = () => {
    if (deleteEventId) {
      onDelete(deleteEventId, 'events');
    }
    handleCancelDelete();
  };

  // Get unique event types for filter dropdown
  const eventTypes = [...new Set(data.map(event => event.type))];

  // Truncate description
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="events-tab-container">
      {isDeleteConfirmed && (
        <div className="countdown-banner">
          <span>Deleting event in {deleteTimer} seconds...</span>
          <button
            onClick={handleCancelDelete}
            className="cancel-countdown-button"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="events-controls">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="filter-select"
        >
          <option value="">All Types</option>
          {eventTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
        <div className="date-filter-container">
          <input
            type="date"
            value={filterStartDate}
            onChange={handleFilterStartDateChange}
            className="date-input"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={filterEndDate}
            onChange={handleFilterEndDateChange}
            className="date-input"
            placeholder="End Date"
          />
        </div>
        <button
          onClick={handleResetFilters}
          className="reset-button"
        >
          Reset Filters
        </button>
        <button
          onClick={handleAddEvent}
          className="add-button"
          aria-label="Add new event"
        >
          <AddIcon /> Add New
        </button>
      </div>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEvents.map((event) => {
            const isExpired = new Date(event.endDate) < today;
            return (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>
                  <span className={`chip ${event.type}`}>
                    {event.type}
                  </span>
                </td>
                <td>
                  {event.startDate === event.endDate 
                    ? new Date(event.startDate).toLocaleDateString()
                    : `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`}
                </td>
                <td className="description">
                  {expandedDescriptions[event.id] 
                    ? event.description 
                    : truncateDescription(event.description)}
                  {event.description.length > 100 && (
                    <button 
                      className="toggle-description"
                      onClick={() => toggleDescription(event.id)}
                    >
                      {expandedDescriptions[event.id] ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </td>
                <td>
                  <span className={`status-chip ${isExpired ? 'expired' : 'active'}`}>
                    {isExpired ? 'Expired' : 'Active'}
                  </span>
                </td>
                <td>
                  <button 
                    className="action-button edit"
                    onClick={() => handleEditEvent(event)}
                    aria-label={`Edit event ${event.title}`}
                  >
                    <EditIcon />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteClick(event.id)}
                    aria-label={`Delete event ${event.title}`}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      <div className={`dialog ${openDialog ? 'open' : ''}`}>
        <div className="dialog-content">
          <h2>{formData.id ? 'Edit Event' : 'Add New Event'}</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
            />
            <select
              name="type"
              value={formData.type || 'event'}
              onChange={handleChange}
              required
            >
              <option value="event">Regular Event</option>
              <option value="exam">Exam</option>
              <option value="holiday">Holiday</option>
              <option value="meeting">Meeting</option>
              <option value="other">Other</option>
            </select>
            <div className="date-container">
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ''}
                onChange={handleChange}
                required
                className={dateError ? 'error' : ''}
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate || formData.startDate || ''}
                onChange={handleChange}
                className={dateError ? 'error' : ''}
              />
              {dateError && <span className="error-message">{dateError}</span>}
            </div>
            <textarea
              placeholder="Description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="dialog-actions">
            <button onClick={handleDialogClose} className="cancel-button">Cancel</button>
            <button onClick={handleSubmit} className="save-button">Save</button>
          </div>
        </div>
      </div>

      <div className={`delete-modal ${openDeleteModal ? 'open' : ''}`}>
        <div className="delete-modal-content">
          <h2>Confirm Deletion</h2>
          {isDeleteConfirmed ? (
            <p>Deleting event in {deleteTimer} seconds... Click Cancel to stop.</p>
          ) : (
            <p>Are you sure you want to delete this event? This action cannot be undone.</p>
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

export default EventsTab;