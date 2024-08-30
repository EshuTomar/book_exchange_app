import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import './BookDiscovery.css';
import { toast } from 'react-toastify';


const BookDiscovery = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksSnapshot = await getDocs(collection(firestore, "books"));
        setBooks(booksSnapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleLearnMore = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteDoc(doc(firestore, "books", bookId));
      setBooks(books.filter(book => book.id !== bookId));
      toast.success("Book deleted successfully.");
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error("Error deleting book.");
    }
  };


  return (
    <div className="discovery-container">
      <h2>Discover Books</h2>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.imageUrl} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <button className="discover-button" onClick={() => handleLearnMore(book)}>
                Learn More
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No books found. Try checking back later.</p>
        )}
      </div>

      {selectedBook && (
        <div className="book-details">
          <button className="close-button" onClick={handleCloseDetails}>Close</button>
          <img src={selectedBook.imageUrl} alt={selectedBook.title} className="book-detail-image" />
          <h3>{selectedBook.title}</h3>
          <p>Author: {selectedBook.author}</p>
          <p>Genre: {selectedBook.genre}</p>
          <p>Price($): {selectedBook.price} </p>
          <p>Description: {selectedBook.description}</p>
          <button className="exchange-button">Take This Book</button>
          
        </div>
      )}
    </div>
  );
};

export default BookDiscovery;





//  

//   return (
//     <div className="discovery-container">
//       <h2>Discover Books</h2>
//       <div className="book-list">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book.id} className="book-card">
//               <h3>{book.title}</h3>
//               <p>Author: {book.author}</p>
//               <p>Genre: {book.genre}</p>
//              
//             </div>
//           ))
//         ) : (
//           <p>No books found. Try checking back later.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookDiscovery;
