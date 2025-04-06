import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import libraryService from '../services/library.service';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [books, setBooks] = useState([]);
  const [digitalResources, setDigitalResources] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    availability: '',
    type: ''
  });

  // Initial data load
  // useEffect(() => {
  //   const loadInitialData = async () => {
  //     try {
  //       setLoading(true);
  //       const [booksData, resourcesData, transactionsData, statsData] = await Promise.all([
  //         libraryService.getAllBooks(),
  //         libraryService.getDigitalResources(),
  //         libraryService.getTransactions(),
  //         libraryService.getStats()
  //       ]);
        
  //       setBooks(booksData.data);
  //       setDigitalResources(resourcesData.data);
  //       setTransactions(transactionsData.data);
  //       setStats(statsData.data);
  //     } catch (error) {
  //       enqueueSnackbar('Failed to load library data', { variant: 'error' });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadInitialData();
  // }, []); // Empty dependency array ensures this runs only once on mount

  // Memoized functions to prevent unnecessary re-renders
  const fetchBooks = useCallback(async () => {
    try {
      const response = await libraryService.getAllBooks();
      setBooks(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchDigitalResources = useCallback(async () => {
    try {
      const response = await libraryService.getDigitalResources();
      setDigitalResources(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchTransactions = useCallback(async (params = {}) => {
    try {
      const response = await libraryService.getTransactions(params);
      setTransactions(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await libraryService.getStats();
      setStats(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const addBook = useCallback(async (bookData) => {
    try {
      setLoading(true);
      const response = await libraryService.addBook(bookData);
      setBooks(prevBooks => [...prevBooks, response.data]);
      enqueueSnackbar('Book added successfully', { variant: 'success' });
      return response.data;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBook = useCallback(async (id, bookData) => {
    try {
      setLoading(true);
      const response = await libraryService.updateBook(id, bookData);
      setBooks(prevBooks => prevBooks.map(book => book.id === id ? response.data : book));
      enqueueSnackbar('Book updated successfully', { variant: 'success' });
      return response.data;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBook = useCallback(async (id) => {
    try {
      setLoading(true);
      await libraryService.deleteBook(id);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      enqueueSnackbar('Book deleted successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const issueBook = useCallback(async (bookId, userId) => {
    try {
      setLoading(true);
      const response = await libraryService.issueBook(bookId, userId);
      await Promise.all([fetchBooks(), fetchTransactions()]);
      enqueueSnackbar('Book issued successfully', { variant: 'success' });
      return response.data;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks, fetchTransactions]);

  const returnBook = useCallback(async (bookId) => {
    try {
      setLoading(true);
      const response = await libraryService.returnBook(bookId);
      await Promise.all([fetchBooks(), fetchTransactions()]);
      enqueueSnackbar('Book returned successfully', { variant: 'success' });
      return response.data;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks, fetchTransactions]);

  const uploadResource = useCallback(async (resourceData) => {
    try {
      setLoading(true);
      const response = await libraryService.uploadResource(resourceData);
      setDigitalResources(prevResources => [...prevResources, response.data]);
      enqueueSnackbar('Resource uploaded successfully', { variant: 'success' });
      return response.data;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized filtered books to prevent unnecessary recalculations
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || book.category === filters.category;
      const matchesAvailability = !filters.availability || 
                                (filters.availability === 'available' ? book.availableCopies > 0 : book.availableCopies <= 0);
      const matchesType = !filters.type || book.type === filters.type;
      
      return matchesSearch && matchesCategory && matchesAvailability && matchesType;
    });
  }, [books, searchTerm, filters]);

  const value = {
    books,
    digitalResources,
    transactions,
    stats,
    loading,
    currentBook,
    searchTerm,
    filters,
    filteredBooks,
    setCurrentBook,
    setSearchTerm,
    setFilters,
    fetchBooks,
    fetchDigitalResources,
    fetchTransactions,
    fetchStats,
    addBook,
    updateBook,
    deleteBook,
    issueBook,
    returnBook,
    uploadResource
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

// Custom hook for using library context
export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};