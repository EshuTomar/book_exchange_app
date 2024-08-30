

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      toast.success('Signout successfully')
    } catch (error) {
      console.error('Error logging out:', error);
      
      toast.error('Logout failed')
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Book Exchange</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/discovery">Discovery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">List a Book</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/matchmaking">Matches</Link>
                </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
