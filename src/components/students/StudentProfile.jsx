// src/components/students/StudentProfile.jsx
import React from 'react';
import { Table,  TableBody,  TableCell, TableHead, TableRow, Button,
  Avatar, ButtonGroup, Tooltip,  useTheme
} from '@mui/material';

import { Visibility as ViewIcon, Badge as BadgeIcon } from '@mui/icons-material';

const StudentProfile = ({ students, onSelectStudent, onGenerateID, selectedForID }) => {
  const theme = useTheme();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            ID
          </TableCell>
          <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Photo
          </TableCell>
          <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Name
          </TableCell>
          <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Class
          </TableCell>
          <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Section
          </TableCell>
          <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.length > 0 ? (
          students.map((student) => (
            <TableRow 
              key={student.id} 
              hover
              sx={{
                backgroundColor: selectedForID?.id === student.id 
                  ? theme.palette.action.selected 
                  : 'inherit',
                '&:hover': {
                  backgroundColor: selectedForID?.id === student.id 
                    ? theme.palette.action.selected 
                    : theme.palette.action.hover
                },
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                {student.id}
              </TableCell>
              <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Avatar 
                  src={student.photo} 
                  alt={student.name}
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: selectedForID?.id === student.id 
                      ? `2px solid ${theme.palette.primary.main}`
                      : 'none'
                  }}
                />
              </TableCell>
              <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                {student.name}
              </TableCell>
              <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                {student.class}
              </TableCell>
              <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                {student.section}
              </TableCell>
              <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                <ButtonGroup 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderColor: selectedForID?.id === student.id 
                      ? theme.palette.primary.main 
                      : theme.palette.grey[400]
                  }}
                >
                  <Tooltip title="View Details" arrow>
                    <Button 
                      onClick={() => onSelectStudent(student)}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.grey[100]
                        }
                      }}
                    >
                      <ViewIcon 
                        fontSize="small" 
                        color={selectedForID?.id === student.id ? "primary" : "inherit"}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Generate ID Card" arrow>
                    <Button 
                      onClick={() => onGenerateID(student)}
                      color={selectedForID?.id === student.id ? "primary" : "inherit"}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.grey[100]
                        }
                      }}
                    >
                      <BadgeIcon 
                        fontSize="small" 
                        color={selectedForID?.id === student.id ? "primary" : "inherit"}
                      />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} align="center">
              <Typography color="textSecondary" sx={{ py: 2 }}>
                No students found matching the current filters
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StudentProfile;