
import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import './Matchmaking.css';

const Matchmaking = () => {
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      const userPreferences = ['Book Title 1', 'Book Title 2']; // Replace with dynamic user preferences
      const booksSnapshot = await getDocs(collection(firestore, "books"));
      const matchedBooks = booksSnapshot.docs.filter(doc =>
        userPreferences.includes(doc.data().title)
      );
      setMatches(matchedBooks.map(match => match.data()));
    };

    fetchMatches();
  }, []);

  // Filter matches based on search query
  const filteredMatches = matches.filter(match => 
    match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="matchmaking-container">
      <h2>Book Matchmaking</h2>
      
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search for books, authors, or genres..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      
      <div className="match-list">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div key={index} className="match-card">
              <h3>{match.title}</h3>
              <p>Author: {match.author}</p>
              <p>Genre: {match.genre}</p>
              <button className="request-button">Request Exchange</button>
            </div>
          ))
        ) : (
          <p>No matches found. Try adding more books or adjusting your preferences.</p>
        )}
      </div>
    </div>
  );
};

export default Matchmaking;
