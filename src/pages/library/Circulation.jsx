import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Pagination,
  Box,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Tooltip,
  IconButton,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  Book as BookIcon,
  CalendarToday as DateIcon,
  Add as AddIcon,
  AssignmentReturn as ReturnIcon,
  Autorenew as RenewIcon,
  LibraryAdd as BulkAddIcon,
  Receipt as FineIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components for better UI
const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  textTransform: 'none',
  borderRadius: '8px',
  padding: '6px 12px',
  fontSize: '0.875rem'
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: 
    status === 'issued' ? theme.palette.primary.light :
    status === 'overdue' ? theme.palette.warning.light :
    status === 'returned' ? theme.palette.success.light :
    theme.palette.error.light,
  color: theme.palette.getContrastText(
    status === 'issued' ? theme.palette.primary.light :
    status === 'overdue' ? theme.palette.warning.light :
    status === 'returned' ? theme.palette.success.light :
    theme.palette.error.light
  )
}));

const dummyBooks = [
  { id: 101, title: "Introduction to Algorithms", author: "Cormen", available: true },
  { id: 102, title: "Clean Code", author: "Martin", available: false },
  { id: 103, title: "Design Patterns", author: "Gamma", available: true },
  { id: 104, title: "The Pragmatic Programmer", author: "Hunt", available: true },
  { id: 105, title: "Structure and Interpretation of Computer Programs", author: "Abelson", available: true }
];

const dummyUsers = [
  { id: "STU2045", name: "John Doe", type: "student" },
  { id: "STU2046", name: "Jane Smith", type: "student" },
  { id: "STU2047", name: "Mike Johnson", type: "student" },
  { id: "TCH1002", name: "Prof. Williams", type: "teacher" }
];

const dummyTransactions = [
  {
    id: 1,
    bookId: 101,
    bookTitle: "Introduction to Algorithms",
    userId: "STU2045",
    userName: "John Doe",
    issueDate: "2023-08-01",
    dueDate: "2023-08-15",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 2,
    bookId: 102,
    bookTitle: "Clean Code",
    userId: "STU2046",
    userName: "Jane Smith",
    issueDate: "2023-07-20",
    dueDate: "2023-08-03",
    returnDate: "",
    status: "overdue",
    fine: 5.50
  },
  {
    id: 3,
    bookId: 103,
    bookTitle: "Design Patterns",
    userId: "STU2047",
    userName: "Mike Johnson",
    issueDate: "2023-08-05",
    dueDate: "2023-08-19",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 4,
    bookId: 104,
    bookTitle: "The Pragmatic Programmer",
    userId: "TCH1002",
    userName: "Prof. Williams",
    issueDate: "2023-07-10",
    dueDate: "2023-09-10",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 5,
    bookId: 105,
    bookTitle: "Structure and Interpretation of Computer Programs",
    userId: "STU2048",
    userName: "Sarah Brown",
    issueDate: "2023-06-15",
    dueDate: "2023-06-29",
    returnDate: "2023-06-28",
    status: "returned",
    fine: 0
  },
  {
    id: 6,
    bookId: 106,
    bookTitle: "Artificial Intelligence: A Modern Approach",
    userId: "STU2049",
    userName: "Kevin Lee",
    issueDate: "2023-08-10",
    dueDate: "2023-08-24",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 7,
    bookId: 107,
    bookTitle: "Code Complete",
    userId: "STU2050",
    userName: "Laura Green",
    issueDate: "2023-07-15",
    dueDate: "2023-07-29",
    returnDate: "",
    status: "overdue",
    fine: 3.00
  },
  {
    id: 8,
    bookId: 108,
    bookTitle: "Refactoring",
    userId: "TCH1003",
    userName: "Dr. Thompson",
    issueDate: "2023-07-01",
    dueDate: "2023-08-01",
    returnDate: "2023-07-30",
    status: "returned",
    fine: 0
  },
  {
    id: 9,
    bookId: 109,
    bookTitle: "Computer Networking: A Top-Down Approach",
    userId: "STU2051",
    userName: "Anna White",
    issueDate: "2023-08-01",
    dueDate: "2023-08-15",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 10,
    bookId: 110,
    bookTitle: "Operating System Concepts",
    userId: "STU2052",
    userName: "David Clark",
    issueDate: "2023-07-25",
    dueDate: "2023-08-08",
    returnDate: "2023-08-09",
    status: "returned",
    fine: 1.00
  },
  {
    id: 11,
    bookId: 111,
    bookTitle: "Modern Operating Systems",
    userId: "STU2053",
    userName: "Emily Davis",
    issueDate: "2023-08-12",
    dueDate: "2023-08-26",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 12,
    bookId: 112,
    bookTitle: "Compilers: Principles, Techniques, and Tools",
    userId: "TCH1004",
    userName: "Dr. Henry",
    issueDate: "2023-06-01",
    dueDate: "2023-08-01",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 13,
    bookId: 113,
    bookTitle: "Computer Architecture",
    userId: "STU2054",
    userName: "Nina Brown",
    issueDate: "2023-07-20",
    dueDate: "2023-08-03",
    returnDate: "2023-08-04",
    status: "returned",
    fine: 1.50
  },
  {
    id: 14,
    bookId: 114,
    bookTitle: "Effective Java",
    userId: "STU2055",
    userName: "Oscar Wright",
    issueDate: "2023-08-03",
    dueDate: "2023-08-17",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 15,
    bookId: 115,
    bookTitle: "The Art of Computer Programming",
    userId: "STU2056",
    userName: "Grace Kim",
    issueDate: "2023-06-30",
    dueDate: "2023-07-14",
    returnDate: "",
    status: "overdue",
    fine: 7.25
  },
  {
    id: 16,
    bookId: 116,
    bookTitle: "Algorithms Unlocked",
    userId: "STU2057",
    userName: "Ian Scott",
    issueDate: "2023-08-07",
    dueDate: "2023-08-21",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 17,
    bookId: 117,
    bookTitle: "Python Crash Course",
    userId: "STU2058",
    userName: "Olivia Adams",
    issueDate: "2023-07-05",
    dueDate: "2023-07-19",
    returnDate: "2023-07-21",
    status: "returned",
    fine: 2.00
  },
  {
    id: 18,
    bookId: 118,
    bookTitle: "You Don't Know JS",
    userId: "TCH1005",
    userName: "Ms. Carter",
    issueDate: "2023-06-10",
    dueDate: "2023-07-10",
    returnDate: "",
    status: "overdue",
    fine: 10.00
  },
  {
    id: 19,
    bookId: 119,
    bookTitle: "Deep Learning",
    userId: "STU2059",
    userName: "Leo Turner",
    issueDate: "2023-08-14",
    dueDate: "2023-08-28",
    returnDate: "",
    status: "issued",
    fine: 0
  },
  {
    id: 20,
    bookId: 120,
    bookTitle: "Cracking the Coding Interview",
    userId: "STU2060",
    userName: "Sophia Wilson",
    issueDate: "2023-07-18",
    dueDate: "2023-08-01",
    returnDate: "2023-08-02",
    status: "returned",
    fine: 0.50
  }
];


const Circulation = () => {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [showBulkReturn, setShowBulkReturn] = useState(false);
  const rowsPerPage = 5;

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setTransactions(dummyTransactions);
      setBooks(dummyBooks);
      setUsers(dummyUsers);
    }, 500);
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.userId.toLowerCase().includes(searchTerm.toLowerCase())
    .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate)));

  const availableBooks = books.filter(book => book.available);
  const issuedBooks = transactions.filter(t => t.status !== 'returned');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAction = (action, transaction) => {
    setCurrentAction(action);
    setSelectedTransaction(transaction);
    
    if (action === 'renew') {
      // Calculate default renewal date (2 weeks from current due date)
      const defaultDate = new Date(transaction.dueDate);
      defaultDate.setDate(defaultDate.getDate() + 14);
      setNewDueDate(defaultDate.toISOString().split('T')[0]);
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
    setNewDueDate('');
  };

  const handleConfirmAction = () => {
    let updatedTransactions = [...transactions];
    
    if (currentAction === 'return') {
      updatedTransactions = transactions.map(t => {
        if (t.id === selectedTransaction.id) {
          return { 
            ...t, 
            status: 'returned', 
            returnDate: new Date().toISOString().split('T')[0],
            fine: calculateFine(t.dueDate)
          };
        }
        return t;
      });
      
      // Mark book as available
      setBooks(books.map(book => 
        book.id === selectedTransaction.bookId ? { ...book, available: true } : book
      ));
    } 
    else if (currentAction === 'renew') {
      updatedTransactions = transactions.map(t => {
        if (t.id === selectedTransaction.id) {
          return { 
            ...t, 
            dueDate: newDueDate,
            renewals: t.renewals + 1,
            fine: 0 // Reset fine if it was overdue
          };
        }
        return t;
      });
    }
    
    setTransactions(updatedTransactions);
    handleCloseDialog();
  };

  const calculateFine = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    if (today <= due) return 0;
    
    const diffDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    return Math.min(diffDays * 0.5, 20); // $0.50 per day, max $20
  };

  const handleNewIssue = () => {
    setShowIssueForm(true);
    setSelectedBooks([]);
    setSelectedUser('');
  };

  const handleBulkReturn = () => {
    setShowBulkReturn(true);
    setSelectedBooks([]);
  };

  const handleIssueSubmit = () => {
    const newTransactions = selectedBooks.map(bookId => {
      const book = books.find(b => b.id === bookId);
      const user = users.find(u => u.id === selectedUser);
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + (user.type === 'teacher' ? 60 : 14)); // Teachers get longer loans
      
      return {
        id: transactions.length + 1,
        bookId: book.id,
        bookTitle: book.title,
        userId: user.id,
        userName: user.name,
        issueDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        returnDate: "",
        status: "issued",
        fine: 0,
        renewals: 0
      };
    });
    
    setTransactions([...newTransactions, ...transactions]);
    setBooks(books.map(book => 
      selectedBooks.includes(book.id) ? { ...book, available: false } : book
    ));
    setShowIssueForm(false);
  };

  const handleBulkReturnSubmit = () => {
    const updatedTransactions = transactions.map(t => {
      if (selectedBooks.includes(t.bookId) && t.status !== 'returned') {
        return { 
          ...t, 
          status: 'returned', 
          returnDate: new Date().toISOString().split('T')[0],
          fine: calculateFine(t.dueDate)
        };
      }
      return t;
    });
    
    setTransactions(updatedTransactions);
    setBooks(books.map(book => 
      selectedBooks.includes(book.id) ? { ...book, available: true } : book
    ));
    setShowBulkReturn(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Library Circulation
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <CardContent>
              <Typography variant="h6">Total Books</Typography>
              <Typography variant="h4">{books.length}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <BookIcon sx={{ mr: 1 }} />
                <Typography>{availableBooks.length} available</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
            <CardContent>
              <Typography variant="h6">Active Loans</Typography>
              <Typography variant="h4">{issuedBooks.length}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <WarningIcon sx={{ mr: 1 }} />
                <Typography>
                  {issuedBooks.filter(t => t.status === 'overdue').length} overdue
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'info.light', color: 'info.contrastText' }}>
            <CardContent>
              <Typography variant="h6">Pending Fines</Typography>
              <Typography variant="h4">
                ${transactions.reduce((sum, t) => sum + t.fine, 0).toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <FineIcon sx={{ mr: 1 }} />
                <Typography>{transactions.filter(t => t.fine > 0).length} unpaid</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Search and Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search transactions by book, user name or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Tooltip title="Issue new book to a user">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleNewIssue}
                      sx={{ borderRadius: '8px' }}
                    >
                      New Issue
                    </Button>
                  </Tooltip>
                  <Tooltip title="Return multiple books at once">
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<BulkAddIcon />}
                      onClick={handleBulkReturn}
                      sx={{ borderRadius: '8px' }}
                    >
                      Bulk Return
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Transactions Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ bgcolor: 'action.hover' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Book Details</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Borrower</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Issue Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions
                      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((transaction) => (
                        <TableRow 
                          key={transaction.id}
                          sx={{ 
                            '&:hover': { bgcolor: 'action.hover' },
                            ...(transaction.status === 'overdue' && { bgcolor: 'warning.light' })
                          }}
                        >
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <BookIcon color="action" sx={{ mr: 1 }} />
                              <Box>
                                <Typography fontWeight={500}>{transaction.bookTitle}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  ID: {transaction.bookId}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <PersonIcon color="action" sx={{ mr: 1 }} />
                              <Box>
                                <Typography>{transaction.userName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {transaction.userId}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <DateIcon color="action" sx={{ mr: 1 }} />
                              {transaction.issueDate}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <DateIcon 
                                color={transaction.status === 'overdue' ? 'error' : 'action'} 
                                sx={{ mr: 1 }} 
                              />
                              <Box>
                                <Typography color={transaction.status === 'overdue' ? 'error' : 'inherit'}>
                                  {transaction.dueDate}
                                </Typography>
                                {transaction.renewals > 0 && (
                                  <Typography variant="caption" color="text.secondary">
                                    Renewed {transaction.renewals} time(s)
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <StatusChip 
                                icon={transaction.status === 'overdue' ? <WarningIcon /> : <CheckIcon />}
                                label={transaction.status}
                                status={transaction.status}
                              />
                              {transaction.fine > 0 && (
                                <Chip
                                  icon={<FineIcon />}
                                  label={`$${transaction.fine.toFixed(2)}`}
                                  color="error"
                                  size="small"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {transaction.status !== 'returned' && (
                              <Box display="flex">
                                <Tooltip title="Return this book">
                                  <ActionButton
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<ReturnIcon />}
                                    onClick={() => handleAction('return', transaction)}
                                    sx={{ mr: 1 }}
                                  >
                                    Return
                                  </ActionButton>
                                </Tooltip>
                                <Tooltip title="Renew loan period">
                                  <ActionButton
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    startIcon={<RenewIcon />}
                                    onClick={() => handleAction('renew', transaction)}
                                  >
                                    Renew
                                  </ActionButton>
                                </Tooltip>
                              </Box>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </Typography>
                <Pagination
                  count={Math.ceil(filteredTransactions.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          {currentAction === 'return' ? 'Confirm Book Return' : 'Renew Book Loan'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedTransaction && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {selectedTransaction.bookTitle}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Borrower:</Typography>
                <Typography>
                  {selectedTransaction.userName} ({selectedTransaction.userId})
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Current Due Date:</Typography>
                <Typography color={selectedTransaction.status === 'overdue' ? 'error' : 'inherit'}>
                  {selectedTransaction.dueDate}
                  {selectedTransaction.status === 'overdue' && ' (Overdue)'}
                </Typography>
              </Grid>
              
              {currentAction === 'return' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Return Date:</Typography>
                    <Typography>{new Date().toLocaleDateString()}</Typography>
                  </Grid>
                  
                  {calculateFine(selectedTransaction.dueDate) > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Fine Amount:</Typography>
                      <Typography color="error" fontWeight={600}>
                        ${calculateFine(selectedTransaction.dueDate).toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {Math.floor((new Date() - new Date(selectedTransaction.dueDate)) / (1000 * 60 * 60 * 24))} days overdue
                      </Typography>
                    </Grid>
                  )}
                </>
              )}
              
              {currentAction === 'renew' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Select New Due Date:</Typography>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                      <InputLabel>New Due Date</InputLabel>
                      <Select
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        label="New Due Date"
                      >
                        <MenuItem value={new Date(new Date(selectedTransaction.dueDate).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>
                          Extend by 2 weeks
                        </MenuItem>
                        <MenuItem value={new Date(new Date(selectedTransaction.dueDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>
                          Extend by 1 month
                        </MenuItem>
                        <MenuItem value={new Date(new Date(selectedTransaction.dueDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>
                          Extend by 3 months (Teachers only)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Note: This will be renewal #{selectedTransaction.renewals + 1} for this book
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            color="primary" 
            variant="contained"
            startIcon={currentAction === 'return' ? <ReturnIcon /> : <RenewIcon />}
          >
            {currentAction === 'return' ? 'Confirm Return' : 'Confirm Renewal'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Issue Form */}
      <Dialog open={showIssueForm} onClose={() => setShowIssueForm(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          Issue New Books
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select User</InputLabel>
                <Select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  label="Select User"
                >
                  {users.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name} ({user.id}) - {user.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {selectedUser && (
                <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2">User Information:</Typography>
                  <Typography>
                    Currently borrowing: {transactions.filter(t => t.userId === selectedUser && t.status !== 'returned').length} books
                  </Typography>
                  <Typography>
                    Unpaid fines: $
                    {transactions
                      .filter(t => t.userId === selectedUser && t.fine > 0)
                      .reduce((sum, t) => sum + t.fine, 0)
                      .toFixed(2)}
                  </Typography>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Books to Issue</InputLabel>
                <Select
                  multiple
                  value={selectedBooks}
                  onChange={(e) => setSelectedBooks(e.target.value)}
                  label="Select Books to Issue"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(bookId => {
                        const book = books.find(b => b.id === bookId);
                        return <Chip key={bookId} label={book.title} />;
                      })}
                    </Box>
                  )}
                >
                  {availableBooks.map(book => (
                    <MenuItem key={book.id} value={book.id}>
                      {book.title} by {book.author}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {selectedBooks.length > 0 && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Loan Details:</Typography>
                  <Typography>
                    Due date: {
                      selectedUser ? 
                        new Date(
                          new Date().getTime() + 
                          (users.find(u => u.id === selectedUser)?.type === 'teacher' ? 
                            60 * 24 * 60 * 60 * 1000 : 
                            14 * 24 * 60 * 60 * 1000)
                        ).toLocaleDateString() : 
                        'Select user first'
                    }
                  </Typography>
                  <Typography>
                    Max books allowed: {selectedUser && (users.find(u => u.id === selectedUser)?.type === 'teacher' ? 10 : 5)}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowIssueForm(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleIssueSubmit} 
            color="primary" 
            variant="contained"
            disabled={!selectedUser || selectedBooks.length === 0}
            startIcon={<AddIcon />}
          >
            Issue {selectedBooks.length} Book(s)
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Return Form */}
      <Dialog open={showBulkReturn} onClose={() => setShowBulkReturn(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
          Bulk Return Books
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Select Books to Return</InputLabel>
            <Select
              multiple
              value={selectedBooks}
              onChange={(e) => setSelectedBooks(e.target.value)}
              label="Select Books to Return"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(bookId => {
                    const transaction = transactions.find(t => t.bookId === bookId && t.status !== 'returned');
                    return transaction ? (
                      <Chip 
                        key={bookId} 
                        label={`${transaction.bookTitle} (${transaction.userName})`} 
                      />
                    ) : null;
                  })}
                </Box>
              )}
            >
              {issuedBooks.map(transaction => (
                <MenuItem key={transaction.bookId} value={transaction.bookId}>
                  <Box sx={{ width: '100%' }}>
                    <Typography>{transaction.bookTitle}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Borrowed by: {transaction.userName} | Due: {transaction.dueDate}
                      {transaction.status === 'overdue' && ' (Overdue)'}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {selectedBooks.length > 0 && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="subtitle2">Summary:</Typography>
              <Typography>
                Total books to return: {selectedBooks.length}
              </Typography>
              <Typography>
                Total fines: $
                {selectedBooks.reduce((sum, bookId) => {
                  const transaction = transactions.find(t => t.bookId === bookId);
                  return sum + calculateFine(transaction?.dueDate || 0);
                }, 0).toFixed(2)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBulkReturn(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleBulkReturnSubmit} 
            color="secondary" 
            variant="contained"
            disabled={selectedBooks.length === 0}
            startIcon={<ReturnIcon />}
          >
            Return {selectedBooks.length} Book(s)
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Circulation;