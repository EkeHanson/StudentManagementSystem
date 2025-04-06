import React, { useState, useEffect } from 'react';
import { 
  Container,
  Box,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Slider,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Close,
  ZoomIn,
  ZoomOut,
  Bookmark,
  MenuBook,
  FormatSize,
  Brightness4,
  Brightness7,
  ChevronLeft,
  ChevronRight,
  Notes,
  Search
} from '@mui/icons-material';

// Dummy book data
const dummyBook = {
  id: 101,
  title: 'Introduction to React',
  author: 'Jane Smith',
  pages: 320,
  currentPage: 1,
  fontSize: 16,
  theme: 'light',
  bookmarks: [15, 45, 120],
  notes: {
    15: 'Important concept about hooks',
    45: 'Review this section later'
  }
};

// Dummy page content
const getPageContent = (pageNum) => {
  return `This is page ${pageNum} of "${dummyBook.title}" by ${dummyBook.author}. 
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
  
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
};

const EBookReader = ({ onClose }) => {
  const [book, setBook] = useState(dummyBook);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= book.pages) {
      setBook({ ...book, currentPage: newPage });
    }
  };

  const handleFontSizeChange = (event, newValue) => {
    setBook({ ...book, fontSize: newValue });
  };

  const toggleTheme = () => {
    setBook({ ...book, theme: book.theme === 'light' ? 'dark' : 'light' });
  };

  const toggleBookmark = () => {
    const isBookmarked = book.bookmarks.includes(book.currentPage);
    const updatedBookmarks = isBookmarked
      ? book.bookmarks.filter(page => page !== book.currentPage)
      : [...book.bookmarks, book.currentPage];
    
    setBook({ ...book, bookmarks: updatedBookmarks });
  };

  const handleNoteSave = () => {
    const updatedNotes = { ...book.notes };
    if (currentNote.trim()) {
      updatedNotes[book.currentPage] = currentNote;
    } else {
      delete updatedNotes[book.currentPage];
    }
    setBook({ ...book, notes: updatedNotes });
    setIsNoteDialogOpen(false);
    setCurrentNote('');
  };

  const handleSearch = () => {
    // Simulate search results
    const results = [];
    for (let i = 1; i <= 10; i++) {
      if (i % 3 === 0) {
        results.push({
          page: i,
          preview: `Found "${searchTerm}" on page ${i}. This is a sample search result...`
        });
      }
    }
    setSearchResults(results);
    setIsSearchDialogOpen(true);
  };

  const jumpToPage = (pageNum) => {
    handlePageChange(pageNum);
    setIsSearchDialogOpen(false);
  };

  return (
    <Box sx={{ 
      height: '100vh',
      backgroundColor: book.theme === 'dark' ? '#121212' : '#f5f5f5',
      color: book.theme === 'dark' ? '#fff' : '#000',
      overflow: 'hidden'
    }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {book.title}
          </Typography>
          <IconButton color="inherit" onClick={() => setIsSearchDialogOpen(true)}>
            <Search />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {book.theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit" onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4, height: 'calc(100% - 64px)' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          p: 3,
          backgroundColor: book.theme === 'dark' ? '#1e1e1e' : '#fff',
          borderRadius: 1,
          boxShadow: 3
        }}>
          <Typography variant="h6" gutterBottom>
            Page {book.currentPage} of {book.pages}
          </Typography>
          
          <Box sx={{ 
            flexGrow: 1,
            overflowY: 'auto',
            mb: 2,
            p: 2,
            border: '1px solid',
            borderColor: book.theme === 'dark' ? '#333' : '#ddd',
            borderRadius: 1,
            fontSize: `${book.fontSize}px`,
            lineHeight: 1.6
          }}>
            {getPageContent(book.currentPage)}
            
            {book.notes[book.currentPage] && (
              <Box sx={{ 
                mt: 3, 
                p: 2, 
                backgroundColor: book.theme === 'dark' ? '#333' : '#f0f0f0',
                borderRadius: 1
              }}>
                <Typography variant="subtitle2">Your Note:</Typography>
                <Typography>{book.notes[book.currentPage]}</Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton 
              onClick={() => handlePageChange(book.currentPage - 1)}
              disabled={book.currentPage === 1}
            >
              <ChevronLeft />
            </IconButton>
            
            <Slider
              value={book.currentPage}
              onChange={(e, newValue) => handlePageChange(newValue)}
              min={1}
              max={book.pages}
              step={1}
              sx={{ width: '60%', mx: 2 }}
            />
            
            <IconButton 
              onClick={() => handlePageChange(book.currentPage + 1)}
              disabled={book.currentPage === book.pages}
            >
              <ChevronRight />
            </IconButton>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <IconButton 
                onClick={toggleBookmark}
                color={book.bookmarks.includes(book.currentPage) ? 'primary' : 'default'}
              >
                <Bookmark />
              </IconButton>
              
              <IconButton onClick={() => {
                setCurrentNote(book.notes[book.currentPage] || '');
                setIsNoteDialogOpen(true);
              }}>
                <Notes />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', width: '200px' }}>
              <ZoomOut />
              <Slider
                value={book.fontSize}
                onChange={handleFontSizeChange}
                min={12}
                max={24}
                step={1}
                sx={{ mx: 2 }}
              />
              <ZoomIn />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Note Dialog */}
      <Dialog open={isNoteDialogOpen} onClose={() => setIsNoteDialogOpen(false)}>
        <DialogTitle>Add Note for Page {book.currentPage}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your note"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNoteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleNoteSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Search Dialog */}
      <Dialog 
        open={isSearchDialogOpen} 
        onClose={() => setIsSearchDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Search in Book</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              variant="contained" 
              onClick={handleSearch}
              sx={{ ml: 2 }}
            >
              Search
            </Button>
          </Box>
          
          {searchResults.length > 0 ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {searchResults.length} results found
              </Typography>
              {searchResults.map((result, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    p: 2, 
                    mb: 1, 
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#e0e0e0'
                    }
                  }}
                  onClick={() => jumpToPage(result.page)}
                >
                  <Typography variant="subtitle2">Page {result.page}</Typography>
                  <Typography variant="body2">{result.preview}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', p: 4 }}>
              {searchTerm ? 'No results found' : 'Enter a search term to begin'}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSearchDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EBookReader;