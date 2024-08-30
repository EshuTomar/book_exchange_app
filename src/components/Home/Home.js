import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to the Book Exchange Platform</h1>
        <p className="home-quote">"A room without books is like a body without a soul." – Cicero</p>
        <Link to="/login">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
      <div className="home-image">
        <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJvb2t8ZW58MHx8fHwxNjg1OTg0MjY3&ixlib=rb-1.2.1&q=80&w=400" alt="Books" />
      </div>
    </div>
  );
};

export default Home;

