import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Navbar doğru şekilde import edilmiş olmalı
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/categories")
      .then((response) => {
        console.log("Response data:", response.data);
        // response.data.results içindeki verileri kullan
        if (Array.isArray(response.data.results)) {
          setCategories(response.data.results);
        } else {
          console.error("Expected 'results' in response data, but not found.");
        }
      })
      .catch((error) => console.error("Kategori verisi alınırken hata oluştu:", error));
  }, []);
  

  return (
    <div>
      <Navbar categories={categories} /> {/* Navbar'ı doğru şekilde kullanın */}
    </div>
  );
};

export default Category; // Default export yapıldığından emin olun
