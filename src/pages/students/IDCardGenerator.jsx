// src/components/students/IDCardGenerator.jsx
import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme,
  TextField,
  Alert
} from '@mui/material';
import {
  Print as PrintIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import html2canvas from 'html2canvas';

// School information constant
const schoolInfo = {
  name: "Excel International Excellent Schools",
  logo: "https://via.placeholder.com/100?text=EIES",
  address: "123 Education Blvd, Learning City",
  phone: "+1 (234) 567-8900",
  website: "www.excelinternational.edu",
  motto: "Empowering Minds, Shaping Futures"
};

// Default card text constant
const defaultCardText = {
  front: "Official Student Identification",
  back: "This card is property of Excel International Excellent Schools. If found, please return to the school office.",
  validity: "Valid until graduation"
};

// Styled components
const IDCardContainer = styled(Card)(({ theme }) => ({
  width: '340px',
  height: '220px',
  borderRadius: '12px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  margin: '0 auto',
  '&.back': {
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`
  }
}));

const IDCardFront = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80px',
    height: '80px',
    background: theme.palette.primary.main,
    opacity: 0.1,
    borderRadius: '0 0 0 100%'
  }
}));

const IDCardBack = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const SchoolHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& img': {
    marginRight: theme.spacing(1.5),
    width: '40px',
    height: '40px',
    objectFit: 'contain'
  }
}));

// Main component
const IDCardGenerator = ({ student }) => {
  const theme = useTheme();
  const [cardText, setCardText] = useState(defaultCardText);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tempCardText, setTempCardText] = useState(defaultCardText);
  const cardRef = useRef(null);
  
  // Print handler
  const handlePrint = () => {
    if (cardRef.current && student) {
      html2canvas(cardRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = `id-card-${student.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };
  
  // Edit text handlers
  const handleEditText = () => {
    setTempCardText(cardText);
    setEditDialogOpen(true);
  };
  
  const handleSaveText = () => {
    setCardText(tempCardText);
    setEditDialogOpen(false);
  };
  
  const handleTextChange = (field) => (e) => {
    setTempCardText(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header section */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h2">
          {student ? `ID Card for ${student.name}` : 'Student ID Card Generator'}
        </Typography>
        {student && (
          <Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditText}
              sx={{ mr: 2 }}
            >
              Customize Text
            </Button>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print Card
            </Button>
          </Box>
        )}
      </Box>
      
      {/* Card display section */}
      {student ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Front of ID card */}
          <Box sx={{ mb: 4 }}>
            <IDCardContainer ref={cardRef}>
              <IDCardFront>
                <SchoolHeader>
                  <img src={schoolInfo.logo} alt="School Logo" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {schoolInfo.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {cardText.front}
                    </Typography>
                  </Box>
                </SchoolHeader>
                
                <Box sx={{ display: 'flex', flexGrow: 1, mt: 1 }}>
                  <Box sx={{ mr: 2 }}>
                    <Avatar 
                      src={student.photo} 
                      alt={student.name}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        border: `2px solid ${theme.palette.primary.main}` 
                      }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={600}>
                      {student.name}
                    </Typography>
                    <Typography variant="body2">
                      ID: {student.id}
                    </Typography>
                    <Typography variant="body2">
                      Class: {student.class} {student.section}
                    </Typography>
                    <Typography variant="body2">
                      DOB: {new Date(student.dob).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <em>{cardText.validity}</em>
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  right: 8,
                  fontSize: '0.7rem',
                  color: theme.palette.text.secondary
                }}>
                  {schoolInfo.motto}
                </Box>
              </IDCardFront>
            </IDCardContainer>
          </Box>
          
          {/* Back of ID card */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Back of ID Card
            </Typography>
            <IDCardContainer className="back">
              <IDCardBack>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    {schoolInfo.name}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {cardText.back}
                  </Typography>
                </Box>
                
                <Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" component="div">
                    {schoolInfo.address}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {schoolInfo.phone} • {schoolInfo.website}
                  </Typography>
                </Box>
              </IDCardBack>
            </IDCardContainer>
          </Box>
        </Box>
      ) : (
        <Alert severity="info" sx={{ mb: 2 }}>
          Please select a student from the "Student Profiles" tab to generate their ID card
        </Alert>
      )}
      
      {/* Edit dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Customize ID Card Text</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Front Text"
              value={tempCardText.front}
              onChange={handleTextChange('front')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Back Text"
              value={tempCardText.back}
              onChange={handleTextChange('back')}
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Validity Text"
              value={tempCardText.validity}
              onChange={handleTextChange('validity')}
              margin="normal"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditDialogOpen(false)} 
            startIcon={<CloseIcon />}
            color="secondary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveText} 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IDCardGenerator;