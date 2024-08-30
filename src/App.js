
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import BookList from './components/BookList/BookList';
import BookDiscovery from './components/BookDiscovery/BookDiscovery';
import Matchmaking from './components/Matchmaking/Matchmaking';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <Router>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/discovery" element={<BookDiscovery />} />
      <Route path="/matchmaking" element={<Matchmaking />} />
    </Routes>
    
  </Router>
  
  );
}

export default App;
