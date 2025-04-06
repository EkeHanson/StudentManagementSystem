import React from 'react';
import IssueReturnForm from './IssueReturnForm';

const BookDetailsModal = ({ book, onClose, onIssue }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [showIssueForm, setShowIssueForm] = useState(false);

  const availabilityStatus = book.availableCopies > 0 
    ? <span className="text-green-600">Available ({book.availableCopies} of {book.totalCopies})</span>
    : <span className="text-red-600">Currently unavailable</span>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3 flex justify-center">
              <img 
                src={book.coverImage} 
                alt={`Cover of ${book.title}`} 
                className="w-48 h-64 object-cover rounded shadow"
              />
            </div>
            <div className="w-full md:w-2/3">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p>{book.isbn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Published Year</p>
                  <p>{book.publishedYear}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p>{book.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Availability</p>
                  <p>{availabilityStatus}</p>
                </div>
              </div>

              {book.availableCopies > 0 && (
                <button
                  onClick={() => setShowIssueForm(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Issue This Book
                </button>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('history')}
              >
                Borrowing History
              </button>
            </div>

            <div className="py-4">
              {activeTab === 'details' ? (
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-700">
                    {book.description || 'No description available for this book.'}
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold mb-2">Borrowing History</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">John Smith (Grade 10)</td>
                          <td className="px-6 py-4 whitespace-nowrap">2023-05-15</td>
                          <td className="px-6 py-4 whitespace-nowrap">2023-06-15</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Returned
                            </span>
                          </td>
                        </tr>
                        {/* More history rows... */}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showIssueForm && (
          <IssueReturnForm 
            book={book}
            onClose={() => setShowIssueForm(false)}
            onComplete={() => {
              setShowIssueForm(false);
              onIssue();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookDetailsModal;