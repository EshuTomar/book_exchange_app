import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './Login.module.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/discovery');
      toast.success('Signin successfully');
    } catch (error) {
      console.error('Error logging in:', error);
      
      toast.error("Login failed. Please check your credentials.")
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/discovery');
      toast.success('Sign in Successfully');
    } catch (error) {
      console.error('Error with Google Sign-In:', error);
      
      toast.error('Google Sign-In failed')
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
          
        
        <button onClick={handleGoogleSignIn} className={styles.googleButton}>
          Sign in with Google
        </button>
        <p className={styles.registerLink}>
          Don't have an account? <span onClick={handleRegisterRedirect} className={styles.registerButton}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
