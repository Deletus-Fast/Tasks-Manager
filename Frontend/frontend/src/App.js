import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login'; 
import Home from './Home';
import Tasks from './Tasks';
import Footer from './components/Footer';

const App = () => {
    const [user, setUser] = useState([]);
    return (
      <>
        <Router>
            <div>
                {/* Add Navbar component here */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                    <Route path="/Tasks" element={<Tasks/>} />
                    {/* Add other routes here */}
                </Routes>
            </div>
        </Router>
        <Footer/>
      </>
    );
};

export default App;
