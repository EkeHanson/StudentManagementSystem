// Library Service - Handles all API calls for library operations
import api from './api';

// Dummy data for development
const dummyBooks = [
  {
    id: 1,
    title: 'Introduction to React',
    author: 'John Doe',
    isbn: '978-3-16-148410-0',
    publisher: 'Tech Books Inc',
    edition: '1st',
    category: 'Programming',
    availableCopies: 5,
    totalCopies: 7,
    publishedYear: 2022,
    coverImage: 'https://via.placeholder.com/150',
    shelfLocation: 'A12',
    type: 'physical'
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    author: 'Jane Smith',
    isbn: '978-1-23-456789-7',
    publisher: 'Coding House',
    edition: '3rd',
    category: 'Programming',
    availableCopies: 3,
    totalCopies: 5,
    publishedYear: 2021,
    coverImage: 'https://via.placeholder.com/150',
    shelfLocation: 'B05',
    type: 'physical'
  },
  {
    id: 3,
    title: 'Digital Learning Essentials',
    author: 'Alex Johnson',
    isbn: '978-0-12-345678-9',
    publisher: 'Edu Press',
    edition: '2nd',
    category: 'Education',
    availableCopies: 0,
    totalCopies: 2,
    publishedYear: 2023,
    coverImage: 'https://via.placeholder.com/150',
    fileUrl: '/ebooks/digital-learning.pdf',
    type: 'digital'
  }
];

const dummyTransactions = [
  {
    id: 1,
    bookId: 1,
    userId: 101,
    userName: 'Student One',
    issueDate: '2023-05-10',
    dueDate: '2023-05-24',
    returnDate: null,
    status: 'issued'
  },
  {
    id: 2,
    bookId: 2,
    userId: 102,
    userName: 'Student Two',
    issueDate: '2023-05-15',
    dueDate: '2023-05-29',
    returnDate: '2023-05-28',
    status: 'returned'
  }
];

const libraryService = {
  // Book operations
  getAllBooks: async () => {
    try {
      // In production: const response = await api.get('/library/books');
      // return response.data;
      return { data: dummyBooks };
    } catch (error) {
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      // const response = await api.get(`/library/books/${id}`);
      const book = dummyBooks.find(b => b.id === id);
      return { data: book };
    } catch (error) {
      throw error;
    }
  },

  addBook: async (bookData) => {
    try {
      // const response = await api.post('/library/books', bookData);
      const newBook = {
        ...bookData,
        id: Math.max(...dummyBooks.map(b => b.id)) + 1,
        availableCopies: bookData.totalCopies || 1
      };
      dummyBooks.push(newBook);
      return { data: newBook };
    } catch (error) {
      throw error;
    }
  },

  updateBook: async (id, bookData) => {
    try {
      // const response = await api.put(`/library/books/${id}`, bookData);
      const index = dummyBooks.findIndex(b => b.id === id);
      if (index !== -1) {
        dummyBooks[index] = { ...dummyBooks[index], ...bookData };
        return { data: dummyBooks[index] };
      }
      throw new Error('Book not found');
    } catch (error) {
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      // await api.delete(`/library/books/${id}`);
      const index = dummyBooks.findIndex(b => b.id === id);
      if (index !== -1) {
        dummyBooks.splice(index, 1);
        return { data: { success: true } };
      }
      throw new Error('Book not found');
    } catch (error) {
      throw error;
    }
  },

  // Circulation operations
  issueBook: async (bookId, userId) => {
    try {
      // const response = await api.post('/library/transactions/issue', { bookId, userId });
      const book = dummyBooks.find(b => b.id === bookId);
      if (!book) throw new Error('Book not found');
      if (book.availableCopies <= 0) throw new Error('No copies available');
      
      book.availableCopies -= 1;
      
      const newTransaction = {
        id: Math.max(...dummyTransactions.map(t => t.id)) + 1,
        bookId,
        userId,
        userName: 'Student ' + userId, // In real app, would fetch from user service
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        returnDate: null,
        status: 'issued'
      };
      
      dummyTransactions.push(newTransaction);
      return { data: newTransaction };
    } catch (error) {
      throw error;
    }
  },

  returnBook: async (bookId) => {
    try {
      // const response = await api.post('/library/transactions/return', { bookId });
      const transaction = dummyTransactions.find(t => t.bookId === bookId && t.status === 'issued');
      if (!transaction) throw new Error('No active transaction for this book');
      
      const book = dummyBooks.find(b => b.id === bookId);
      if (book) book.availableCopies += 1;
      
      transaction.returnDate = new Date().toISOString().split('T')[0];
      transaction.status = 'returned';
      
      return { data: transaction };
    } catch (error) {
      throw error;
    }
  },

  getTransactions: async (filters = {}) => {
    try {
      // const response = await api.get('/library/transactions', { params: filters });
      let transactions = [...dummyTransactions];
      
      if (filters.userId) {
        transactions = transactions.filter(t => t.userId === filters.userId);
      }
      if (filters.status) {
        transactions = transactions.filter(t => t.status === filters.status);
      }
      if (filters.bookId) {
        transactions = transactions.filter(t => t.bookId === filters.bookId);
      }
      
      return { data: transactions };
    } catch (error) {
      throw error;
    }
  },

  // Digital resources
  getDigitalResources: async () => {
    try {
      // const response = await api.get('/library/digital');
      return { data: dummyBooks.filter(b => b.type === 'digital') };
    } catch (error) {
      throw error;
    }
  },

  uploadResource: async (resourceData) => {
    try {
      // const formData = new FormData();
      // Append file and other data to formData
      // const response = await api.post('/library/digital/upload', formData);
      const newResource = {
        ...resourceData,
        id: Math.max(...dummyBooks.map(b => b.id)) + 1,
        type: 'digital',
        availableCopies: 1,
        totalCopies: 1
      };
      dummyBooks.push(newResource);
      return { data: newResource };
    } catch (error) {
      throw error;
    }
  },

  // Statistics
  getStats: async () => {
    try {
      // const response = await api.get('/library/stats');
      return {
        data: {
          totalBooks: dummyBooks.length,
          availableBooks: dummyBooks.filter(b => b.availableCopies > 0).length,
          issuedBooks: dummyTransactions.filter(t => t.status === 'issued').length,
          overdueBooks: 0, // Would calculate based on dueDate in real app
          digitalResources: dummyBooks.filter(b => b.type === 'digital').length
        }
      };
    } catch (error) {
      throw error;
    }
  }
};

export default libraryService;