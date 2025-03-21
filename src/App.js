import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import './App.css';
import Navbar from './components/Navbar';
import Category from './components/Category';

const App = () => {
    return (

        <Router>
            <div className="hero">
                <Category/>

                <Routes>
                <Route path="/" element={<NewsList />} />
        <Route path="/category/:category" element={<NewsList />} /> 
        <Route path="/news/:id" element={<NewsDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
