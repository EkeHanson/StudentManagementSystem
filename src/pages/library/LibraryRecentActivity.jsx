import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import {
  Book as BookIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

const recentActivities = [
  {
    id: 1,
    action: 'return',
    bookTitle: 'Introduction to Algorithms',
    userName: 'John Doe',
    timestamp: '2023-08-10 14:30',
    status: 'success'
  },
  {
    id: 2,
    action: 'issue',
    bookTitle: 'Clean Code',
    userName: 'Jane Smith',
    timestamp: '2023-08-10 10:15',
    status: 'success'
  },
  {
    id: 3,
    action: 'overdue',
    bookTitle: 'Design Patterns',
    userName: 'Mike Johnson',
    timestamp: '2023-08-09 09:00',
    status: 'warning'
  },
  {
    id: 4,
    action: 'reservation',
    bookTitle: 'The Pragmatic Programmer',
    userName: 'Sarah Brown',
    timestamp: '2023-08-08 16:45',
    status: 'info'
  },
  {
    id: 5,
    action: 'new_book',
    bookTitle: 'Structure and Interpretation of Computer Programs',
    userName: 'System',
    timestamp: '2023-08-08 10:20',
    status: 'info'
  }
];

const getActionIcon = (action) => {
  switch (action) {
    case 'return':
      return <CheckCircleIcon color="success" />;
    case 'issue':
      return <BookIcon color="primary" />;
    case 'overdue':
      return <WarningIcon color="warning" />;
    case 'reservation':
      return <AccessTimeIcon color="info" />;
    case 'new_book':
      return <BookIcon color="secondary" />;
    default:
      return <PersonIcon />;
  }
};

const getActionText = (action) => {
  switch (action) {
    case 'return':
      return 'returned';
    case 'issue':
      return 'issued';
    case 'overdue':
      return 'overdue';
    case 'reservation':
      return 'reserved';
    case 'new_book':
      return 'added to library';
    default:
      return action;
  }
};

const LibraryRecentActivity = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Library Activity
        </Typography>
        <List>
          {recentActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'background.default' }}>
                    {getActionIcon(activity.action)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${activity.userName} ${getActionText(activity.action)} "${activity.bookTitle}"`}
                  secondary={activity.timestamp}
                />
                {activity.status === 'warning' && (
                  <Chip label="Overdue" color="warning" size="small" />
                )}
              </ListItem>
              {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LibraryRecentActivity;