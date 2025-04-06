import React, { useState, useEffect } from 'react';
import { libraryService } from '../../services/library.service';

const IssueReturnForm = ({ book, onClose, onComplete }) => {
  const [action, setAction] = useState('issue'); // 'issue' or 'return'
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Calculate default due date (14 days from today)
    const today = new Date();
    const due = new Date(today.setDate(today.getDate() + 14));
    setDueDate(due.toISOString().split('T')[0]);

    // Fetch students (in a real app, this would be an API call)
    const dummyStudents = [
      { id: 1, name: 'John Smith', grade: '10A', studentId: 'S1001' },
      { id: 2, name: 'Emily Johnson', grade: '9B', studentId: 'S1002' },
      { id: 3, name: 'Michael Brown', grade: '11C', studentId: 'S1003' },
    ];
    setStudents(dummyStudents);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (action === 'issue') {
        if (!selectedStudent) {
          throw new Error('Please select a student');
        }
        // In a real app: await libraryService.issueBook(book.id, selectedStudent, dueDate);
        console.log(`Issuing book ${book.id} to student ${selectedStudent}, due on ${dueDate}`);
      } else {
        // In a real app: await libraryService.returnBook(book.id);
        console.log(`Returning book ${book.id}`);
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold text-gray-800">
            {action === 'issue' ? 'Issue Book' : 'Return Book'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={book.title}
              readOnly
            />
          </div>

          {action === 'issue' ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student">
                  Student
                </label>
                <select
                  id="student"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  required
                >
                  <option value="">Select a student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} (Grade: {student.grade}, ID: {student.studentId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <p className="text-gray-700">Are you sure you want to return this book?</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                action === 'issue' ? 'Issue Book' : 'Return Book'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueReturnForm;