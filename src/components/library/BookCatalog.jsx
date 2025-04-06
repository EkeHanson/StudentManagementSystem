import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import BookSearch from './BookSearch';
import BookDetailsModal from './BookDetailsModal';
import { libraryService } from '../../services/library.service';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy categories for filtering
  const categories = [
    'Fiction', 'Non-Fiction', 'Science', 'Mathematics', 
    'History', 'Literature', 'Art', 'Technology'
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // In a real app, this would be an API call:
        // const response = await libraryService.getAllBooks();
        
        // Using dummy data instead
        const dummyBooks = [
          {
            id: 1,
            title: 'Introduction to React',
            author: 'Jane Smith',
            isbn: '978-3-16-148410-0',
            category: 'Technology',
            availableCopies: 5,
            totalCopies: 8,
            publishedYear: 2022,
            coverImage: 'https://via.placeholder.com/150x200?text=React+Book'
          },
          {
            id: 2,
            title: 'Advanced JavaScript',
            author: 'John Doe',
            isbn: '978-1-23-456789-7',
            category: 'Technology',
            availableCopies: 3,
            totalCopies: 5,
            publishedYear: 2021,
            coverImage: 'https://via.placeholder.com/150x200?text=JavaScript'
          },
          // More dummy books...
        ];
        
        setBooks(dummyBooks);
        setFilteredBooks(dummyBooks);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load books. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredBooks(books);
      return;
    }
    
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredBooks(filtered);
  };

  const handleCategoryFilter = (category) => {
    if (category === 'All') {
      setFilteredBooks(books);
      return;
    }
    
    const filtered = books.filter(book => book.category === category);
    setFilteredBooks(filtered);
  };

  if (isLoading) return <div className="text-center py-8">Loading books...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Library Catalog</h1>
        <BookSearch onSearch={handleSearch} />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleCategoryFilter('All')}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onViewDetails={() => setSelectedBook(book)}
            />
          ))}
        </div>
      )}

      {selectedBook && (
        <BookDetailsModal 
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onIssue={() => {
            // Handle issue logic
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookCatalog;