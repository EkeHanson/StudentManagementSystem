import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './FeeTab.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FeeTab = ({ data = [], students = [], onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    studentId: '',
    className: '',
    term: '',
    paymentStatus: '',
    paymentMode: '',
    feeType: '',
    startDate: '',
    endDate: '',
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteFeeId, setDeleteFeeId] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(5);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState('');
  const [auditLogs, setAuditLogs] = useState([
    { action: 'Fee Added', feeId: 'FEE001', user: 'Admin', timestamp: '2025-01-01T10:00:00Z' },
    { action: 'Fee Edited', feeId: 'FEE002', user: 'Admin', timestamp: '2025-01-02T12:30:00Z' },
    { action: 'Delete Initiated', feeId: 'FEE003', user: 'Admin', timestamp: '2025-01-03T14:15:00Z' },
    { action: 'Delete Confirmed', feeId: 'FEE003', user: 'Admin', timestamp: '2025-01-03T14:20:00Z' },
    { action: 'Fee Added', feeId: 'FEE004', user: 'Admin', timestamp: '2025-01-04T09:45:00Z' },
  ]);
  const [showDefaulters, setShowDefaulters] = useState(false);
  const feesPerPage = 5;

  // Use provided data or fallback to dummy data
  const feeData = data.length > 0 ? data : [
    { id: 'FEE001', studentId: 'STU-1001', term: '2024-25 Term 1', type: 'Tuition', amountDue: 25000, amountPaid: 25000, paymentDate: '2025-01-15', paymentMode: 'Online', invoiceNo: 'INV001', dueDate: '2025-01-10', scholarship: 0, refunded: 0, status: 'Paid' },
    { id: 'FEE002', studentId: 'STU-1002', term: '2024-25 Term 1', type: 'Tuition', amountDue: 30000, amountPaid: 15000, paymentDate: '2025-02-01', paymentMode: 'Cash', invoiceNo: 'INV002', dueDate: '2025-01-10', scholarship: 5000, refunded: 0, status: 'Partially Paid' },
    { id: 'FEE003', studentId: 'STU-1003', term: '2024-25 Term 1', type: 'Boarding', amountDue: 15000, amountPaid: 0, paymentDate: '', paymentMode: '', invoiceNo: 'INV003', dueDate: '2025-01-10', scholarship: 0, refunded: 0, status: 'Unpaid' },
    { id: 'FEE004', studentId: 'STU-1004', term: '2024-25 Term 2', type: 'Tuition', amountDue: 20000, amountPaid: 20000, paymentDate: '2025-01-20', paymentMode: 'Bank Transfer', invoiceNo: 'INV004', dueDate: '2025-01-15', scholarship: 2000, refunded: 0, status: 'Paid' },
    { id: 'FEE005', studentId: 'STU-1005', term: '2024-25 Term 2', type: 'PTA', amountDue: 25000, amountPaid: 25000, paymentDate: '2025-02-15', paymentMode: 'POS', invoiceNo: 'INV005', dueDate: '2025-02-10', scholarship: 0, refunded: 0, status: 'Paid' },
    { id: 'FEE006', studentId: 'STU-1006', term: '2024-25 Term 3', type: 'Tuition', amountDue: 24500, amountPaid: 20000, paymentDate: '2025-03-01', paymentMode: 'Online', invoiceNo: 'INV006', dueDate: '2025-02-28', scholarship: 0, refunded: 500, status: 'Partially Paid' },
  ];

  const studentData = students.length > 0 ? students : [
    { id: 'STU-1001', name: 'John Doe', class: 'Grade 5' },
    { id: 'STU-1002', name: 'Emma Smith', class: 'Grade 7' },
    { id: 'STU-1003', name: 'Liam Johnson', class: 'Grade 6' },
    { id: 'STU-1004', name: 'Olivia Brown', class: 'Grade 4' },
    { id: 'STU-1005', name: 'Noah Williams', class: 'Grade 8' },
    { id: 'STU-1006', name: 'Ava Jones', class: 'Grade 3' },
  ];

  // Unique values for filters
  const uniqueClasses = useMemo(() => [...new Set(studentData.map(s => s.class))].sort(), [studentData]);
  const uniqueTerms = useMemo(() => [...new Set(feeData.map(f => f.term))].sort(), [feeData]);
  const uniquePaymentModes = useMemo(() => [...new Set(feeData.map(f => f.paymentMode).filter(m => m))].sort(), [feeData]);
  const uniqueFeeTypes = useMemo(() => [...new Set(feeData.map(f => f.type))].sort(), [feeData]);
  const uniqueStatuses = ['Paid', 'Partially Paid', 'Unpaid'];

  // Map student IDs to names
  const studentMap = useMemo(() => {
    const map = new Map();
    studentData.forEach(s => map.set(s.id, s.name));
    return map;
  }, [studentData]);

  // Filtered data
  const filteredFees = useMemo(() => {
    return feeData.filter(fee => {
      const feeDate = new Date(fee.paymentDate || fee.dueDate);
      const balance = (fee.amountDue || 0) - (fee.amountPaid || 0);
      const status = fee.status === 'Paid' ? 'Paid' : balance > 0 ? 'Partially Paid' : 'Unpaid';
      return (
        (filters.studentId === '' || fee.studentId.toLowerCase().includes(filters.studentId.toLowerCase())) &&
        (filters.className === '' || studentData.find(s => s.id === fee.studentId)?.class === filters.className) &&
        (filters.term === '' || fee.term === filters.term) &&
        (filters.paymentStatus === '' || status === filters.paymentStatus) &&
        (filters.paymentMode === '' || fee.paymentMode === filters.paymentMode) &&
        (filters.feeType === '' || fee.type === filters.feeType) &&
        (filters.startDate === '' || feeDate >= new Date(filters.startDate)) &&
        (filters.endDate === '' || feeDate <= new Date(filters.endDate)) &&
        (!showDefaulters || status !== 'Paid')
      );
    });
  }, [feeData, filters, studentData, showDefaulters]);

  // Pagination
  const totalPages = Math.ceil(filteredFees.length / feesPerPage);
  const indexOfLastFee = currentPage * feesPerPage;
  const indexOfFirstFee = indexOfLastFee - feesPerPage;
  const currentFees = filteredFees.slice(indexOfFirstFee, indexOfLastFee);

  // Summary metrics
  const summary = useMemo(() => {
    const metrics = filteredFees.reduce((acc, fee) => {
      acc.expected += fee.amountDue || 0;
      acc.collected += fee.amountPaid || 0;
      acc.outstanding += (fee.amountDue || 0) - (fee.amountPaid || 0);
      if (fee.paymentDate && new Date(fee.paymentDate) > new Date(fee.dueDate)) {
        acc.latePayments.count += 1;
        acc.latePayments.amount += fee.amountPaid || 0;
      }
      acc.refunds += fee.refunded || 0;
      return acc;
    }, {
      expected: 0,
      collected: 0,
      outstanding: 0,
      latePayments: { count: 0, amount: 0 },
      refunds: 0,
    });
    metrics.collectionRate = metrics.expected > 0 ? (metrics.collected / metrics.expected * 100).toFixed(2) : 0;

    // Top debtors
    const debtors = filteredFees
      .filter(f => (f.amountDue || 0) - (f.amountPaid || 0) > 0)
      .map(f => ({
        studentName: studentMap.get(f.studentId) || f.studentId,
        balance: (f.amountDue || 0) - (f.amountPaid || 0),
      }))
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 3);

    // Top paying classes
    const classPayments = uniqueClasses.reduce((acc, cls) => {
      const classFees = filteredFees.filter(f => studentData.find(s => s.id === f.studentId)?.class === cls);
      const collected = classFees.reduce((sum, f) => sum + (f.amountPaid || 0), 0);
      const expected = classFees.reduce((sum, f) => sum + (f.amountDue || 0), 0);
      acc[cls] = {
        collected,
        rate: expected > 0 ? (collected / expected * 100).toFixed(2) : 0,
      };
      return acc;
    }, {});
    const topClasses = Object.entries(classPayments)
      .sort(([, a], [, b]) => b.rate - a.rate)
      .slice(0, 3)
      .map(([cls, data]) => ({ class: cls, rate: data.rate, collected: data.collected }));

    return { ...metrics, debtors, topClasses };
  }, [filteredFees, studentData, studentMap, uniqueClasses]);

  // Payment trend data for chart
  const trendData = useMemo(() => {
    const paymentsByMonth = filteredFees.reduce((acc, fee) => {
      if (fee.paymentDate) {
        const month = new Date(fee.paymentDate).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + (fee.amountPaid || 0);
      }
      return acc;
    }, {});
    const labels = Object.keys(paymentsByMonth).sort((a, b) => new Date(a) - new Date(b));
    const data = labels.map(label => paymentsByMonth[label]);
    return {
      labels,
      datasets: [{
        label: 'Fees Collected',
        data,
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        tension: 0.4,
      }],
    };
  }, [filteredFees]);

  // Fees due calendar
  const dueDates = useMemo(() => {
    return [...new Set(filteredFees.map(f => f.dueDate))]
      .sort((a, b) => new Date(a) - new Date(b))
      .slice(0, 5);
  }, [filteredFees]);

  // Delete timer
  useEffect(() => {
    if (!openDeleteModal || !isDeleteConfirmed) return;

    if (deleteTimer === 0) {
      handleConfirmDelete();
      return;
    }

    const timer = setInterval(() => {
      setDeleteTimer(prev => prev <= 1 ? 0 : prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [openDeleteModal, isDeleteConfirmed, deleteTimer]);

  // Handlers
  const handlePageChange = pageNumber => setCurrentPage(pageNumber);
  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleDeleteClick = feeId => {
    setDeleteFeeId(feeId);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
    setAuditLogs(prev => [...prev, {
      action: 'Delete Initiated',
      feeId,
      timestamp: new Date().toISOString(),
      user: 'Admin',
    }]);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteFeeId(null);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
  };

  const handleStartDeleteCountdown = () => {
    setIsDeleteConfirmed(true);
    setDeleteTimer(5);
  };

  const handleConfirmDelete = () => {
    if (deleteFeeId) {
      onDelete(deleteFeeId, 'fees');
      setAuditLogs(prev => [...prev, {
        action: 'Delete Confirmed',
        feeId: deleteFeeId,
        timestamp: new Date().toISOString(),
        user: 'Admin',
      }]);
    }
    handleCancelDelete();
  };

  const handleAddFee = (editData = {}) => {
    setFormData(editData);
    setFormError('');
    setOpenAddDialog(true);
  };

  const handleDialogClose = () => {
    setOpenAddDialog(false);
    setFormData({});
    setFormError('');
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amountDue' || name === 'amountPaid' || name === 'scholarship' || name === 'refunded' ? parseFloat(value) || 0 : value
    }));
    setFormError('');
  };

  const handleFormSubmit = () => {
    const requiredFields = ['studentId', 'term', 'type', 'amountDue', 'dueDate'];
    if (requiredFields.some(f => !formData[f])) {
      setFormError('Required fields are missing');
      return;
    }
    if (formData.amountDue < 0 || formData.amountPaid < 0 || formData.scholarship < 0 || formData.refunded < 0) {
      setFormError('Amounts cannot be negative');
      return;
    }
    const feeData = {
      id: formData.id || `FEE${Date.now()}`,
      studentId: formData.studentId,
      term: formData.term,
      type: formData.type,
      amountDue: formData.amountDue,
      amountPaid: formData.amountPaid || 0,
      paymentDate: formData.paymentDate || '',
      paymentMode: formData.paymentMode || '',
      invoiceNo: formData.invoiceNo || `INV${Date.now()}`,
      dueDate: formData.dueDate,
      scholarship: formData.scholarship || 0,
      refunded: formData.refunded || 0,
      status: formData.amountPaid >= formData.amountDue ? 'Paid' : formData.amountPaid > 0 ? 'Partially Paid' : 'Unpaid',
    };
    const action = formData.id ? 'update' : 'add';
    (action === 'add' ? onAdd : onEdit)(feeData, 'fees');
    setAuditLogs(prev => [...prev, {
      action: action === 'add' ? 'Fee Added' : 'Fee Edited',
      feeId: feeData.id,
      timestamp: new Date().toISOString(),
      user: 'Admin',
    }]);
    handleDialogClose();
  };

  const handleExportCSV = () => {
    const headers = [
      'ID', 'Student ID', 'Student Name', 'Class', 'Term', 'Type', 'Amount Due',
      'Amount Paid', 'Balance', 'Payment Date', 'Payment Mode', 'Invoice No',
      'Status', 'Scholarship', 'Due Date', 'Refunded'
    ];
    const rows = filteredFees.map(fee => {
      const balance = (fee.amountDue || 0) - (fee.amountPaid || 0);
      const status = fee.status === 'Paid' ? 'Paid' : balance > 0 ? 'Partially Paid' : 'Unpaid';
      return [
        fee.id,
        fee.studentId,
        studentMap.get(fee.studentId) || fee.studentId,
        studentData.find(s => s.id === fee.studentId)?.class || '',
        fee.term,
        fee.type,
        fee.amountDue || 0,
        fee.amountPaid || 0,
        balance,
        fee.paymentDate || '',
        fee.paymentMode || '',
        fee.invoiceNo || '',
        status,
        fee.scholarship || 0,
        fee.dueDate,
        fee.refunded || 0,
      ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'fees_export.csv');
  };

  return (
    <div className="fee-tab">
      {isDeleteConfirmed && (
        <div className="countdown-banner">
          <span>Deleting fee in {deleteTimer} seconds...</span>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}

      {/* Financial Dashboard */}
      <section className="summary-section">
        <h2>Financial Overview</h2>
        <div className="metrics-grid">
          <div className="metric-card expected">
            <span>Total Expected</span>
            <p>${summary.expected.toLocaleString()}</p>
          </div>
          <div className="metric-card collected">
            <span>Total Collected</span>
            <p>${summary.collected.toLocaleString()}</p>
          </div>
          <div className="metric-card outstanding">
            <span>Outstanding</span>
            <p>${summary.outstanding.toLocaleString()}</p>
          </div>
          <div className="metric-card collection-rate">
            <span>Collection Rate</span>
            <p>{summary.collectionRate}%</p>
          </div>
          <div className="metric-card late-payments">
            <span>Late Payments</span>
            <p>{summary.latePayments.count} (${summary.latePayments.amount.toLocaleString()})</p>
          </div>
          <div className="metric-card refunds">
            <span>Refunds</span>
            <p>${summary.refunds.toLocaleString()}</p>
          </div>
        </div>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Top Debtors</h3>
            <ul>
              {summary.debtors.map((d, i) => (
                <li key={i}>{d.studentName}: ${d.balance.toLocaleString()}</li>
              ))}
            </ul>
          </div>
          <div className="insight-card">
            <h3>Top Paying Classes</h3>
            <ul>
              {summary.topClasses.map((c, i) => (
                <li key={i}>{c.class}: {c.rate}% (${c.collected.toLocaleString()})</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Payment Trends */}
      <section className="chart-section">
        <h2>Payment Trends</h2>
        <div className="chart-wrapper">
          <Line data={trendData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Monthly Fee Collections', font: { size: 18 } },
            },
            scales: {
              y: { beginAtZero: true, title: { display: true, text: 'Amount ($)' } },
              x: { title: { display: true, text: 'Month' } },
            },
          }} />
        </div>
      </section>

      {/* Controls */}
      <section className="controls-section">
        <div className="filters-grid">
          <input
            type="text"
            name="studentId"
            placeholder="Search by Student ID..."
            value={filters.studentId}
            onChange={handleFilterChange}
            aria-label="Search by student ID"
          />
          <select
            name="className"
            value={filters.className}
            onChange={handleFilterChange}
            aria-label="Filter by class"
          >
            <option value="">All Classes</option>
            {uniqueClasses.map(cls => <option key={cls} value={cls}>{cls}</option>)}
          </select>
          <select
            name="term"
            value={filters.term}
            onChange={handleFilterChange}
            aria-label="Filter by term"
          >
            <option value="">All Terms</option>
            {uniqueTerms.map(term => <option key={term} value={term}>{term}</option>)}
          </select>
          <select
            name="paymentStatus"
            value={filters.paymentStatus}
            onChange={handleFilterChange}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            {uniqueStatuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
          <select
            name="paymentMode"
            value={filters.paymentMode}
            onChange={handleFilterChange}
            aria-label="Filter by payment mode"
          >
            <option value="">All Payment Modes</option>
            {uniquePaymentModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
          </select>
          <select
            name="feeType"
            value={filters.feeType}
            onChange={handleFilterChange}
            aria-label="Filter by fee type"
          >
            <option value="">All Fee Types</option>
            {uniqueFeeTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            aria-label="Filter by start date"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            aria-label="Filter by end date"
          />
          <button
            onClick={() => setShowDefaulters(!showDefaulters)}
            aria-label={showDefaulters ? 'Show all fees' : 'Show defaulters only'}
          >
            {showDefaulters ? 'Show All' : 'Show Defaulters'}
          </button>
        </div>
        <div className="action-buttons">
          <button onClick={() => handleAddFee()} aria-label="Add new fee">
            <AddIcon /> Add New
          </button>
          <button onClick={handleExportCSV} aria-label="Export to CSV">
            Export CSV
          </button>
        </div>
      </section>

      {/* Fee Table */}
      <section className="table-section">
        <table className="fee-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Term</th>
              <th>Type</th>
              <th>Due</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Mode</th>
              <th>Invoice</th>
              <th>Scholarship</th>
              <th>Refunded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFees.length > 0 ? (
              currentFees.map(fee => {
                const balance = (fee.amountDue || 0) - (fee.amountPaid || 0);
                const status = fee.status === 'Paid' ? 'Paid' : balance > 0 ? 'Partially Paid' : 'Unpaid';
                return (
                  <tr key={fee.id}>
                    <td>{studentMap.get(fee.studentId) || fee.studentId}</td>
                    <td>{studentData.find(s => s.id === fee.studentId)?.class || ''}</td>
                    <td>{fee.term}</td>
                    <td>{fee.type}</td>
                    <td>${(fee.amountDue || 0).toLocaleString()}</td>
                    <td>${(fee.amountPaid || 0).toLocaleString()}</td>
                    <td>${balance.toLocaleString()}</td>
                    <td>
                      <span className={`status-chip ${status.toLowerCase().replace(' ', '-')}`}>
                        {status}
                      </span>
                    </td>
                    <td>{fee.paymentDate ? new Date(fee.paymentDate).toLocaleDateString() : '-'}</td>
                    <td>{fee.paymentMode || '-'}</td>
                    <td>{fee.invoiceNo || '-'}</td>
                    <td>${(fee.scholarship || 0).toLocaleString()}</td>
                    <td>${(fee.refunded || 0).toLocaleString()}</td>
                    <td>
                      <button
                        className="action-button edit"
                        onClick={() => handleAddFee(fee)}
                        aria-label={`Edit fee ${fee.id}`}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => handleDeleteClick(fee.id)}
                        aria-label={`Delete fee ${fee.id}`}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="14" className="no-data">No fees match the selected filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination */}
      <section className="pagination-section">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => handlePageChange(i + 1)}
            aria-label={`Page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </section>

      {/* Fees Due Calendar */}
      <section className="calendar-section">
        <h2>Upcoming Due Dates</h2>
        <ul>
          {dueDates.map((date, i) => (
            <li key={i}>{new Date(date).toLocaleDateString()}</li>
          ))}
        </ul>
      </section>

      {/* Audit Logs */}
      <section className="audit-section">
        <h2>Audit Logs</h2>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Fee ID</th>
              <th>User</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.slice(0, 5).map((log, i) => (
              <tr key={i}>
                <td>{log.action}</td>
                <td>{log.feeId}</td>
                <td>{log.user}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Delete Modal */}
      <div className={`modal delete-modal ${openDeleteModal ? 'open' : ''}`} aria-hidden={!openDeleteModal}>
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          {isDeleteConfirmed ? (
            <p aria-live="polite">Deleting fee in {deleteTimer} seconds... Click Cancel to stop.</p>
          ) : (
            <p>Are you sure you want to delete this fee? This action cannot be undone.</p>
          )}
          <div className="modal-actions">
            <button onClick={handleCancelDelete}>Cancel</button>
            {!isDeleteConfirmed && (
              <button onClick={handleStartDeleteCountdown}>Delete</button>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <div className={`modal dialog ${openAddDialog ? 'open' : ''}`} aria-hidden={!openAddDialog}>
        <div className="modal-content">
          <h2>{formData.id ? 'Edit Fee' : 'Add New Fee'}</h2>
          <div className="form-grid">
            <select
              name="studentId"
              value={formData.studentId || ''}
              onChange={handleFormChange}
              required
              aria-label="Select student"
            >
              <option value="">Select Student</option>
              {studentData.map(s => <option key={s.id} value={s.id}>{`${s.name} (${s.id})`}</option>)}
            </select>
            <select
              name="term"
              value={formData.term || ''}
              onChange={handleFormChange}
              required
              aria-label="Select term"
            >
              <option value="">Select Term</option>
              {uniqueTerms.map(term => <option key={term} value={term}>{term}</option>)}
            </select>
            <select
              name="type"
              value={formData.type || ''}
              onChange={handleFormChange}
              required
              aria-label="Select fee type"
            >
              <option value="">Select Fee Type</option>
              {uniqueFeeTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <input
              type="number"
              name="amountDue"
              placeholder="Amount Due"
              value={formData.amountDue || ''}
              onChange={handleFormChange}
              required
              aria-label="Amount due"
            />
            <input
              type="number"
              name="amountPaid"
              placeholder="Amount Paid"
              value={formData.amountPaid || ''}
              onChange={handleFormChange}
              aria-label="Amount paid"
            />
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate || ''}
              onChange={handleFormChange}
              aria-label="Payment date"
            />
            <select
              name="paymentMode"
              value={formData.paymentMode || ''}
              onChange={handleFormChange}
              aria-label="Payment mode"
            >
              <option value="">Select Payment Mode</option>
              {uniquePaymentModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
            </select>
            <input
              type="text"
              name="invoiceNo"
              placeholder="Invoice/Receipt Number"
              value={formData.invoiceNo || ''}
              onChange={handleFormChange}
              aria-label="Invoice number"
            />
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate || ''}
              onChange={handleFormChange}
              required
              aria-label="Due date"
            />
            <input
              type="number"
              name="scholarship"
              placeholder="Scholarship/Discount"
              value={formData.scholarship || ''}
              onChange={handleFormChange}
              aria-label="Scholarship amount"
            />
            <input
              type="number"
              name="refunded"
              placeholder="Refunded Amount"
              value={formData.refunded || ''}
              onChange={handleFormChange}
              aria-label="Refunded amount"
            />
            {formError && <span className="error-message">{formError}</span>}
          </div>
          <div className="modal-actions">
            <button onClick={handleDialogClose}>Cancel</button>
            <button onClick={handleFormSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeTab;