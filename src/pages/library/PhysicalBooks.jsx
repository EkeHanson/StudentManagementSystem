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
  IconButton,
  Chip,
  Pagination,
  Box,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Book as BookIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

const dummyBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "9780262033848",
    category: "Computer Science",
    status: "available",
    location: "Shelf A1"
  },
  {
    id: 2,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    category: "Software Engineering",
    status: "checked-out",
    location: "Shelf B2"
  },
  {
    id: 3,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    isbn: "9780201633610",
    category: "Software Engineering",
    status: "available",
    location: "Shelf C3"
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    isbn: "9780201616224",
    category: "Programming",
    status: "reserved",
    location: "Shelf D4"
  },
  {
    id: 5,
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson, Gerald Jay Sussman",
    isbn: "9780262510875",
    category: "Computer Science",
    status: "available",
    location: "Shelf E5"
  },
  {
    id: 6,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    isbn: "9780136042594",
    category: "Artificial Intelligence",
    status: "checked-out",
    location: "Shelf F6"
  },
  {
    id: 7,
    title: "Code Complete",
    author: "Steve McConnell",
    isbn: "9780735619678",
    category: "Software Engineering",
    status: "available",
    location: "Shelf G7"
  },
  {
    id: 8,
    title: "Refactoring: Improving the Design of Existing Code",
    author: "Martin Fowler",
    isbn: "9780201485677",
    category: "Software Engineering",
    status: "available",
    location: "Shelf H8"
  },
  {
    id: 9,
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose, Keith W. Ross",
    isbn: "9780132856201",
    category: "Networking",
    status: "reserved",
    location: "Shelf I9"
  },
  {
    id: 10,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    isbn: "9781118063330",
    category: "Operating Systems",
    status: "available",
    location: "Shelf J10"
  },
  {
    id: 11,
    title: "Modern Operating Systems",
    author: "Andrew S. Tanenbaum",
    isbn: "9780133591620",
    category: "Operating Systems",
    status: "checked-out",
    location: "Shelf K11"
  },
  {
    id: 12,
    title: "Compilers: Principles, Techniques, and Tools",
    author: "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman",
    isbn: "9780321486813",
    category: "Compilers",
    status: "available",
    location: "Shelf L12"
  },
  {
    id: 13,
    title: "Computer Architecture: A Quantitative Approach",
    author: "John L. Hennessy, David A. Patterson",
    isbn: "9780123838728",
    category: "Computer Architecture",
    status: "available",
    location: "Shelf M13"
  },
  {
    id: 14,
    title: "Effective Java",
    author: "Joshua Bloch",
    isbn: "9780134685991",
    category: "Programming",
    status: "checked-out",
    location: "Shelf N14"
  },
  {
    id: 15,
    title: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    isbn: "9780321751041",
    category: "Computer Science",
    status: "available",
    location: "Shelf O15"
  },
  {
    id: 16,
    title: "Algorithms Unlocked",
    author: "Thomas H. Cormen",
    isbn: "9780262518802",
    category: "Computer Science",
    status: "available",
    location: "Shelf P16"
  },
  {
    id: 17,
    title: "Python Crash Course",
    author: "Eric Matthes",
    isbn: "9781593279288",
    category: "Programming",
    status: "checked-out",
    location: "Shelf Q17"
  },
  {
    id: 18,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    isbn: "9781491904244",
    category: "Web Development",
    status: "reserved",
    location: "Shelf R18"
  },
  {
    id: 19,
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
    isbn: "9780262035613",
    category: "Machine Learning",
    status: "available",
    location: "Shelf S19"
  },
  {
    id: 20,
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    isbn: "9780984782857",
    category: "Interview Preparation",
    status: "available",
    location: "Shelf T20"
  }
];


const statusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'checked-out', label: 'Checked Out' },
  { value: 'reserved', label: 'Reserved' }
];

const categoryOptions = [
  'Computer Science',
  'Software Engineering',
  'Programming',
  'Mathematics',
  'Physics',
  'Literature'
];

const PhysicalBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const rowsPerPage = 5;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    status: 'available',
    location: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooks(dummyBooks);
    }, 500);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'available':
        return <Chip icon={<CheckIcon />} label="Available" color="success" size="small" />;
      case 'checked-out':
        return <Chip icon={<CloseIcon />} label="Checked Out" color="error" size="small" />;
      case 'reserved':
        return <Chip icon={<AccessTimeIcon />} label="Reserved" color="warning" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentBook(null);
    setIsEditing(false);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      status: 'available',
      location: ''
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (book) => {
    setCurrentBook(book);
    setIsEditing(true);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      status: book.status,
      location: book.location
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update existing book
      const updatedBooks = books.map(book => 
        book.id === currentBook.id ? { ...book, ...formData } : book
      );
      setBooks(updatedBooks);
    } else {
      // Add new book
      const newBook = {
        id: Math.max(...books.map(b => b.id)) + 1,
        ...formData
      };
      setBooks([...books, newBook]);
    }
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Physical Books Management
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search books by title, author or ISBN"
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
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                  >
                    Add New Book
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>ISBN</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBooks
                      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <BookIcon color="action" sx={{ mr: 1 }} />
                              {book.title}
                            </Box>
                          </TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.isbn}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>{getStatusChip(book.status)}</TableCell>
                          <TableCell>{book.location}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              color="primary"
                              onClick={() => handleOpenEditDialog(book)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              color="error"
                              onClick={() => handleDelete(book.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={Math.ceil(filteredBooks.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Book Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Edit Book' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ISBN"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Category"
                  required
                >
                  {categoryOptions.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  label="Status"
                  required
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            {isEditing ? 'Update' : 'Add'} Book
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PhysicalBooks;