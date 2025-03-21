import React from "react";
import { Routes, Route, Link ,useNavigate} from "react-router-dom";
import "../css/Navbar.css";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaTelegram, FaSpotify, FaSoundcloud, FaRss } from "react-icons/fa";
import NewsList from "../pages/NewsList";

const Navbar = ({ categories = [] }) => {
  const defaultCategories = [];
  const categoryList = categories.length ? categories : defaultCategories;
  const navigate = useNavigate(); // navigate fonksiyonunu alıyoruz

  // Butona tıklandığında yönlendirme işlemi
  const handleRedirect = () => {
    navigate("/"); // '/' yoluna yönlendirir
  };
  return (
    <nav  className="navbar">
      <div className="logo">
      <Link to="/">
          <span className="gazete">NEWS</span> <span className="duvar">abcc.</span>
        </Link>
        
      </div>
      <div className="menu">
        {categoryList.map((category) => (
          <Link key={category.id} to={`/category/${encodeURIComponent(category.name.toLowerCase().replace(/\s+/g, "-"))}`}>
            {category.name}
          </Link>
        ))}
      </div>
      <div className="icons">
        <FaTwitter />
        <FaFacebookF />
        <FaYoutube />
        <FaInstagram />
        <FaTelegram />
        <FaSpotify />
        <FaSoundcloud />
        <FaRss />
      </div>
    </nav>
  );
};

export default Navbar; // Default export yapıldığından emin olun
