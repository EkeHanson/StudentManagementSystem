import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem,
  InputLabel, FormControl, Paper, Grid, Snackbar, Alert, DialogContentText,
} from '@mui/material';
import {
  Delete as DeleteIcon, Add as AddIcon, Print as PrintIcon, Save as SaveIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Default parameters for props
const TimetableManagement = ({ subjects = [], classes = [] }) => {
  // Ensure props are arrays and filter out falsy values
  const safeSubjects = Array.isArray(subjects) ? subjects.filter(Boolean) : [];
  const safeClasses = Array.isArray(classes) ? classes.filter(Boolean) : [];

  // Generate daily time slots for a single class
  const generateDailySlots = () => {
    const slots = [];
    let currentHour = 7;
    let currentMinute = 0;
    let periodNumber = 1;

    // Morning devotion (7:00 AM - 7:15 AM)
    slots.push({
      id: 'devotion',
      startHour: 7,
      startMinute: 0,
      endHour: 7,
      endMinute: 15,
      type: 'devotion',
      subject: 'Morning Devotion',
      editable: false,
      fixed: true,
    });

    // Generate 8 class periods (45 minutes each) with breaks
    while (periodNumber <= 8) {
      slots.push({
        id: `period-${periodNumber}`,
        startHour: currentHour,
        startMinute: currentMinute,
        endHour: currentHour,
        endMinute: currentMinute + 45,
        type: 'class',
        subject: '',
        editable: true,
        fixed: false,
      });

      currentMinute += 45;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute %= 60;
      }

      // Add break after every two periods
      if (periodNumber % 2 === 0 && periodNumber < 8) {
        slots.push({
          id: `break-${periodNumber / 2}`,
          startHour: currentHour,
          startMinute: currentMinute,
          endHour: currentHour,
          endMinute: currentMinute + 20,
          type: 'break',
          subject: 'Break',
          editable: false,
          fixed: true,
        });

        currentMinute += 20;
        if (currentMinute >= 60) {
          currentHour += Math.floor(currentMinute / 60);
          currentMinute %= 60;
        }
      }

      periodNumber++;
    }

    return slots;
  };

  // Generate weekly slots for a class
  const generateWeeklySlots = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return days.map((day) => ({
      day,
      slots: generateDailySlots(),
    }));
  };

  // Initialize timetable state: one weekly schedule per class
  const initializeTimetable = () => {
    const timetable = {
      term: 'Term 1',
      year: '2025',
      classSchedules: safeClasses.reduce((acc, cls) => ({
        ...acc,
        [cls]: generateWeeklySlots(),
      }), {}),
    };
    return [timetable];
  };

  const [timetables, setTimetables] = useState(initializeTimetable());
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [currentClass, setCurrentClass] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const terms = ['Term 1', 'Term 2', 'Term 3'];
  const years = ['2023', '2024', '2025'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Get current timetable
  const currentTimetable = timetables.find(
    (t) => t.term === selectedTerm && t.year === selectedYear
  ) || {
    term: selectedTerm,
    year: selectedYear,
    classSchedules: safeClasses.reduce((acc, cls) => ({
      ...acc,
      [cls]: generateWeeklySlots(),
    }), {}),
  };

  // Sync timetable when term/year/classes change
  useEffect(() => {
    if (!timetables.some((t) => t.term === selectedTerm && t.year === selectedYear)) {
      setTimetables((prev) => [
        ...prev,
        {
          term: selectedTerm,
          year: selectedYear,
          classSchedules: safeClasses.reduce((acc, cls) => ({
            ...acc,
            [cls]: generateWeeklySlots(),
          }), {}),
        },
      ]);
    } else {
      // Ensure all classes have weekly schedules
      setTimetables((prev) =>
        prev.map((t) =>
          t.term === selectedTerm && t.year === selectedYear
            ? {
                ...t,
                classSchedules: safeClasses.reduce((acc, cls) => ({
                  ...acc,
                  [cls]: t.classSchedules[cls] || generateWeeklySlots(),
                }), {}),
              }
            : { ...t }
        )
      );
    }
  }, [selectedTerm, selectedYear, safeClasses]);

  const formatTime = (hour, minute) => {
    if (typeof hour !== 'number' || typeof minute !== 'number') return 'Invalid Time';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  // Validate subject uniqueness for a class on a given day
  const validateSubject = (cls, day, slotId, newSubject) => {
    if (!newSubject) return true;
    const daySlots = currentTimetable.classSchedules[cls]?.find(
      (d) => d.day === day
    )?.slots.filter((s) => s.type === 'class' && s.id !== slotId) || [];
    return !daySlots.some((s) => s.subject === newSubject);
  };

  const handleEdit = (slot, cls, day) => {
    if (slot.editable) {
      setCurrentSlot({ ...slot });
      setCurrentClass(cls);
      setCurrentDay(day);
      setOpenDialog(true);
    }
  };

  const handleSave = () => {
    if (!currentSlot || !currentClass || !currentDay) return;
    if (!validateSubject(currentClass, currentDay, currentSlot.id, currentSlot.subject)) {
      setSnackbar({
        open: true,
        message: `Subject '${currentSlot.subject}' is already assigned to ${currentClass} on ${currentDay}.`,
        severity: 'error',
      });
      return;
    }

    setTimetables((prev) =>
      prev.map((t) =>
        t.term === selectedTerm && t.year === selectedYear
          ? {
              ...t,
              classSchedules: {
                ...t.classSchedules,
                [currentClass]: t.classSchedules[currentClass].map((d) =>
                  d.day === currentDay
                    ? {
                        ...d,
                        slots: d.slots.map((s) =>
                          s.id === currentSlot.id ? currentSlot : s
                        ),
                      }
                    : d
                ),
              },
            }
          : t
      )
    );
    setOpenDialog(false);
    setCurrentSlot(null);
    setCurrentClass('');
    setCurrentDay('');
    setSnackbar({ open: true, message: 'Period updated successfully!', severity: 'success' });
  };

  const handleAddPeriod = () => {
    const lastSlot = generateDailySlots().slice(-1)[0];
    if (lastSlot.endHour >= 16) {
      setSnackbar({
        open: true,
        message: 'Cannot add period after 4:00 PM',
        severity: 'error',
      });
      return;
    }

    setTimetables((prev) =>
      prev.map((t) =>
        t.term === selectedTerm && t.year === selectedYear
          ? {
              ...t,
              classSchedules: Object.keys(t.classSchedules).reduce((acc, cls) => {
                const weeklySlots = t.classSchedules[cls];
                return {
                  ...acc,
                  [cls]: weeklySlots.map((d) => {
                    const classSlots = d.slots;
                    const lastClassSlot = classSlots[classSlots.length - 1];
                    let newEndHour = lastClassSlot.endHour;
                    let newEndMinute = lastClassSlot.endMinute + 45;

                    if (newEndMinute >= 60) {
                      newEndHour += Math.floor(newEndMinute / 60);
                      newEndMinute %= 60;
                    }

                    const newPeriod = {
                      id: `period-${classSlots.filter((s) => s.type === 'class').length + 1}`,
                      startHour: lastClassSlot.endHour,
                      startMinute: lastClassSlot.endMinute,
                      endHour: newEndHour,
                      endMinute: newEndMinute,
                      type: 'class',
                      subject: '',
                      editable: true,
                      fixed: false,
                    };

                    return {
                      ...d,
                      slots: [...classSlots, newPeriod],
                    };
                  }),
                };
              }, {}),
            }
          : t
      )
    );
    setSnackbar({ open: true, message: 'Period added successfully!', severity: 'success' });
  };

  const handleDeletePeriod = (slotId) => {
    setTimetables((prev) =>
      prev.map((t) =>
        t.term === selectedTerm && t.year === selectedYear
          ? {
              ...t,
              classSchedules: Object.keys(t.classSchedules).reduce((acc, cls) => ({
                ...acc,
                [cls]: t.classSchedules[cls].map((d) => ({
                  ...d,
                  slots: d.slots.filter((s) => s.id !== slotId),
                })),
              }), {}),
            }
          : t
      )
    );
    setSnackbar({ open: true, message: 'Period deleted successfully!', severity: 'success' });
  };

  const handleDeleteTimetable = () => {
    setTimetables((prev) =>
      prev.filter((t) => !(t.term === selectedTerm && t.year === selectedYear))
    );
    setOpenDeleteDialog(false);
    setSnackbar({ open: true, message: 'Timetable deleted successfully!', severity: 'success' });
  };

  const handleReset = () => {
    setTimetables((prev) =>
      prev.map((t) =>
        t.term === selectedTerm && t.year === selectedYear
          ? {
              ...t,
              classSchedules: safeClasses.reduce((acc, cls) => ({
                ...acc,
                [cls]: generateWeeklySlots(),
              }), {}),
            }
          : t
      )
    );
    setSnackbar({ open: true, message: 'Timetable reset to default!', severity: 'success' });
  };

  const handleSaveTimetable = () => {
    setSnackbar({ open: true, message: 'Timetable saved successfully!', severity: 'success' });
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      const title = `School Timetable - ${selectedTerm} ${selectedYear}`;
      doc.setFontSize(18);
      doc.text(title, 14, 15);

      let currentY = 25;

      // Generate a table for each day
      days.forEach((day, dayIndex) => {
        doc.setFontSize(14);
        doc.text(day, 14, currentY);
        currentY += 10;

        // Create table headers: Time, Period, and Subject per class
        const headers = ['Time', 'Period', ...safeClasses.map((cls) => `${cls} Subject`)];

        // Create table data for the day
        const tableData = generateDailySlots().map((slot) => {
          const row = [
            `${formatTime(slot.startHour, slot.startMinute)} - ${formatTime(slot.endHour, slot.endMinute)}`,
            slot.type === 'devotion' ? 'Devotion' : slot.type === 'break' ? 'Break' : `Period ${slot.id.split('-')[1]}`,
          ];
          safeClasses.forEach((cls) => {
            const daySlots = currentTimetable.classSchedules[cls]?.find(
              (d) => d.day === day
            )?.slots || [];
            const classSlot = daySlots.find((s) => s.id === slot.id) || {};
            row.push(classSlot.subject || '-');
          });
          return row;
        });

        autoTable(doc, {
          head: [headers],
          body: tableData,
          startY: currentY,
          styles: { fontSize: 8, cellPadding: 2, valign: 'middle' },
          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 20 } },
        });

        currentY = doc.lastAutoTable.finalY + 10;

        // Add page break if not the last day
        if (dayIndex < days.length - 1) {
          doc.addPage();
          currentY = 15;
        }
      });

      doc.save(
        `Timetable_${selectedTerm.replace(/\s/g, '')}_${selectedYear}_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error('PDF Generation Error:', error);
      setSnackbar({
        open: true,
        message: 'Failed to generate PDF. Please try again.',
        severity: 'error',
      });
    }
  };

  // Get slots for the selected day
  const getDaySlots = () => generateDailySlots();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Timetable Management
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Term</InputLabel>
              <Select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                label="Term"
              >
                {terms.map((term) => (
                  <MenuItem key={term} value={term}>
                    {term}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Year"
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Day</InputLabel>
              <Select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                label="Day"
              >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddPeriod}
              disabled={
                Object.values(currentTimetable.classSchedules)[0]?.[0]?.slots.slice(-1)[0]?.endHour >= 16
              }
            >
              Add Period
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveTimetable}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<SaveIcon />}
              onClick={handleReset}
            >
              Reset Timetable
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setOpenDeleteDialog(true)}
            >
              Delete Timetable
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </Grid>
        </Grid>
        {(!safeSubjects.length || !safeClasses.length) && (
          <Typography color="error" sx={{ mt: 2 }}>
            Warning: Missing data for subjects or classes. Please ensure all data is provided.
          </Typography>
        )}
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          School Timetable - {selectedTerm} {selectedYear} - {selectedDay}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Period</TableCell>
              {safeClasses.map((cls) => (
                <TableCell key={`${cls}-subject`}>{cls} Subject</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getDaySlots().length ? (
              getDaySlots().map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>
                    {formatTime(slot.startHour, slot.startMinute)} -{' '}
                    {formatTime(slot.endHour, slot.endMinute)}
                  </TableCell>
                  <TableCell>
                    {slot.type === 'devotion' ? 'Devotion' : slot.type === 'break' ? 'Break' : `Period ${slot.id.split('-')[1]}`}
                  </TableCell>
                  {safeClasses.map((cls) => {
                    const daySlots = currentTimetable.classSchedules[cls]?.find(
                      (d) => d.day === selectedDay
                    )?.slots || [];
                    const classSlot = daySlots.find((s) => s.id === slot.id) || {};
                    return (
                      <TableCell
                        key={`${cls}-${slot.id}-subject`}
                        onClick={() => handleEdit(slot, cls, selectedDay)}
                        sx={{ cursor: slot.editable ? 'pointer' : 'default' }}
                      >
                        {classSlot.subject || '-'}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {slot.editable && (
                      <IconButton onClick={() => handleDeletePeriod(slot.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2 + safeClasses.length + 1} align="center">
                  <Typography>No timetable slots available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Period Details</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Class</InputLabel>
            <Select
              value={currentClass || ''}
              onChange={(e) => setCurrentClass(e.target.value)}
              label="Class"
              disabled
            >
              {safeClasses.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Day</InputLabel>
            <Select
              value={currentDay || ''}
              onChange={(e) => setCurrentDay(e.target.value)}
              label="Day"
              disabled
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Period</InputLabel>
            <Select
              value={currentSlot?.id || ''}
              label="Period"
              disabled
            >
              <MenuItem value={currentSlot?.id}>
                {currentSlot?.type === 'class' ? `Period ${currentSlot?.id.split('-')[1]}` : currentSlot?.type}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Subject</InputLabel>
            <Select
              value={currentSlot?.subject || ''}
              onChange={(e) => setCurrentSlot({ ...currentSlot, subject: e.target.value })}
              label="Subject"
            >
              <MenuItem value="">None</MenuItem>
              {safeSubjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!currentSlot || !currentClass || !currentDay}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Timetable Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete Timetable</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the timetable for {selectedTerm} {selectedYear}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteTimetable} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

TimetableManagement.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.arrayOf(PropTypes.string),
};

export default TimetableManagement;