import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TimetableManagement = () => {
  // Generate initial time slots without Date objects
  const generateTimeSlots = () => {
    const slots = [];
    let currentHour = 7;
    let currentMinute = 0;
    
    // Add morning devotion (7:00 AM - 7:15 AM)
    slots.push({
      id: 'devotion',
      startHour: 7,
      startMinute: 0,
      endHour: 7,
      endMinute: 15,
      type: 'devotion',
      subject: 'Morning Devotion',
      teacher: '',
      class: 'All',
      editable: false,
      fixed: true
    });

    // Generate class periods (45 minutes each) with breaks
    let periodNumber = 1;
    while (currentHour < 16) { // Until 4:00 PM
      // Class period
      slots.push({
        id: `period-${periodNumber}`,
        startHour: currentHour,
        startMinute: currentMinute,
        endHour: currentHour,
        endMinute: currentMinute + 45,
        type: 'class',
        subject: '',
        teacher: '',
        class: '',
        editable: true,
        fixed: false
      });

      // Update current time
      currentMinute += 45;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }

      // Add break after 2 periods (except after last period)
      if (periodNumber % 2 === 0 && currentHour < 16) {
        // 20 minute break
        slots.push({
          id: `break-${periodNumber/2}`,
          startHour: currentHour,
          startMinute: currentMinute,
          endHour: currentHour,
          endMinute: currentMinute + 20,
          type: 'break',
          subject: 'Break',
          teacher: '',
          class: 'All',
          editable: false,
          fixed: true
        });

        currentMinute += 20;
        if (currentMinute >= 60) {
          currentHour += Math.floor(currentMinute / 60);
          currentMinute = currentMinute % 60;
        }
      }

      periodNumber++;
    }

    return slots;
  };

  const [timeSlots, setTimeSlots] = useState(generateTimeSlots());
  const [savedTimetable, setSavedTimetable] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [classes] = useState([
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ]);
  const [teachers] = useState([
    { id: 'TCH-001', name: 'Jane Smith' },
    { id: 'TCH-002', name: 'John Doe' },
    { id: 'TCH-003', name: 'Emily Johnson' },
  ]);
  const [subjects] = useState([
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Physics', 'Chemistry', 'Biology', 'Art', 'Music', 'PE'
  ]);
  const [selectedClass, setSelectedClass] = useState('');
  const [editTimes, setEditTimes] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');



  const formatTime = (hour, minute) => {
    if (typeof hour !== 'number' || typeof minute !== 'number') {
      return 'Invalid Time';
    }
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };
  
  const handleEdit = (slot) => {
    if (slot.editable) {
      setCurrentSlot({...slot});
      setEditTimes(false);
      setOpenDialog(true);
    }
  };

  const handleSaveTimetable = () => {
    setSavedTimetable([...timeSlots]);
    setSnackbarMessage('Timetable saved successfully!');
    setSnackbarOpen(true);
  };

  const handleSave = () => {
    setTimeSlots(prevSlots => 
      prevSlots.map(slot => 
        slot.id === currentSlot.id ? currentSlot : slot
      )
    );
    setOpenDialog(false);
    setCurrentSlot(null);
  };

  const handleReset = () => {
    setTimeSlots(generateTimeSlots());
    setSnackbarMessage('Timetable reset to default!');
    setSnackbarOpen(true);
  };

  const handleClassChange = (classLevel) => {
    setSelectedClass(classLevel);
  };

  const handleAddPeriod = () => {
    const lastSlot = timeSlots[timeSlots.length - 1];
    let newEndHour = lastSlot.endHour;
    let newEndMinute = lastSlot.endMinute + 45;
    
    if (newEndMinute >= 60) {
      newEndHour += Math.floor(newEndMinute / 60);
      newEndMinute = newEndMinute % 60;
    }
    
    if (newEndHour >= 16) {
      setSnackbarMessage("Cannot add period after 4:00 PM");
      setSnackbarOpen(true);
      return;
    }

    const newPeriod = {
      id: `period-${timeSlots.filter(s => s.type === 'class').length + 1}`,
      startHour: lastSlot.endHour,
      startMinute: lastSlot.endMinute,
      endHour: newEndHour,
      endMinute: newEndMinute,
      type: 'class',
      subject: '',
      teacher: '',
      class: '',
      editable: true,
      fixed: false
    };

    setTimeSlots([...timeSlots, newPeriod]);
  };

  const handleDeletePeriod = (id) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const title = `School Timetable${selectedClass ? ` - ${selectedClass}` : ''}`;
    
    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 15);
    
    // Prepare data for the table
    const tableData = filteredSlots.map(slot => [
      `${formatTime(slot.startHour, slot.startMinute)} - ${formatTime(slot.endHour, slot.endMinute)}`,
      slot.type === 'devotion' ? 'Devotion' : 
        slot.type === 'break' ? 'Break' : 
        `Period ${slot.id.split('-')[1]}`,
      slot.subject,
      slot.teacher,
      slot.class
    ]);

    // Add table
    doc.autoTable({
      head: [['Time', 'Period', 'Subject', 'Teacher', 'Class']],
      body: tableData,
      startY: 25,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: 'middle'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    // Save the PDF
    doc.save(`Timetable${selectedClass ? `_${selectedClass.replace(' ', '')}` : ''}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const filteredSlots = timeSlots.filter(slot => 
    !selectedClass || slot.class === 'All' || slot.class === selectedClass
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Timetable Management
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Class</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                label="Filter by Class"
              >
                <MenuItem value="">All Classes</MenuItem>
                {classes.map(cls => (
                  <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddPeriod}
              disabled={timeSlots[timeSlots.length - 1]?.endHour >= 16}
            >
              Add Period
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveTimetable}
            >
              Save Timetable
            </Button>
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
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          School Timetable {selectedClass && `- ${selectedClass}`}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSlots.map((slot) => (
              <TableRow key={slot.id}>
                <TableCell>
                  {formatTime(slot.startHour, slot.startMinute)} - {formatTime(slot.endHour, slot.endMinute)}
                </TableCell>
                <TableCell>
                  {slot.type === 'devotion' && 'Devotion'}
                  {slot.type === 'break' && 'Break'}
                  {slot.type === 'class' && `Period ${slot.id.split('-')[1]}`}
                </TableCell>
                <TableCell>{slot.subject}</TableCell>
                <TableCell>{slot.teacher}</TableCell>
                <TableCell>{slot.class}</TableCell>
                <TableCell>
                  {slot.editable && (
                    <>
                      <IconButton onClick={() => handleEdit(slot)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeletePeriod(slot.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editTimes ? 'Edit Time Slot' : 'Edit Period Details'}
          <IconButton 
            onClick={() => setEditTimes(!editTimes)}
            sx={{ float: 'right' }}
            color={editTimes ? 'primary' : 'default'}
          >
            <ScheduleIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {editTimes ? (
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Start Hour</InputLabel>
                <Select
                  value={currentSlot?.startHour || 7}
                  onChange={(e) => setCurrentSlot({...currentSlot, startHour: parseInt(e.target.value)})}
                  label="Start Hour"
                >
                  {Array.from({length: 10}, (_, i) => i + 7).map(hour => (
                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Start Minute</InputLabel>
                <Select
                  value={currentSlot?.startMinute || 0}
                  onChange={(e) => setCurrentSlot({...currentSlot, startMinute: parseInt(e.target.value)})}
                  label="Start Minute"
                >
                  {[0, 15, 30, 45].map(minute => (
                    <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>End Hour</InputLabel>
                <Select
                  value={currentSlot?.endHour || 7}
                  onChange={(e) => setCurrentSlot({...currentSlot, endHour: parseInt(e.target.value)})}
                  label="End Hour"
                >
                  {Array.from({length: 10}, (_, i) => i + 7).map(hour => (
                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>End Minute</InputLabel>
                <Select
                  value={currentSlot?.endMinute || 0}
                  onChange={(e) => setCurrentSlot({...currentSlot, endMinute: parseInt(e.target.value)})}
                  label="End Minute"
                >
                  {[0, 15, 30, 45].map(minute => (
                    <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="Time"
                value={`${formatTime(currentSlot?.startHour, currentSlot?.startMinute)} - ${formatTime(currentSlot?.endHour, currentSlot?.endMinute)}`}
                margin="normal"
                disabled
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Subject</InputLabel>
                <Select
                  value={currentSlot?.subject || ''}
                  onChange={(e) => setCurrentSlot({...currentSlot, subject: e.target.value})}
                  label="Subject"
                >
                  {subjects.map(subject => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Teacher</InputLabel>
                <Select
                  value={currentSlot?.teacher || ''}
                  onChange={(e) => setCurrentSlot({...currentSlot, teacher: e.target.value})}
                  label="Teacher"
                >
                  {teachers.map(teacher => (
                    <MenuItem key={teacher.id} value={teacher.name}>{teacher.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Class</InputLabel>
                <Select
                  value={currentSlot?.class || ''}
                  onChange={(e) => setCurrentSlot({...currentSlot, class: e.target.value})}
                  label="Class"
                >
                  {classes.map(cls => (
                    <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TimetableManagement;