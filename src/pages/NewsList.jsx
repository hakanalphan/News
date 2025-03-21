import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNews } from "../api/api";
import "../css/NewsList.css";

const NewsList = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        if (Array.isArray(data)) {
          setNews(data); 
        } else {
          console.error("Beklenmeyen veri formatı:", data);
        }
      } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (category) {
      // Kategoriye göre filtreleme
      const filtered = news.filter((item) => {
        const categoryName = item.category?.name?.toLowerCase() || null;
        return categoryName === category.toLowerCase();
      });
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    }
    setCurrentPage(1); 
  }, [category, news]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1 className="news-title">{category ? category.toUpperCase() : "Haberler"}</h1>
      <div style={{marginLeft:"300px"}}  className="news-flex">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div className="news-item" key={item.id}>
              <img src={item.image.startsWith("http") ? item.image : `http://localhost:8000${item.image}`} 
     alt={item.title} className="news-image" />

              <h2 className="news-title">{item.title}</h2>
              <p className="news-date">{new Date(item.published_at).toLocaleDateString()}</p>
              <p className="news-description">{item.content.substring(0, 100)}...</p>
              <Link to={`/news/${item.id}`} className="news-link">More</Link>
            </div>
          ))
        ) : (
          <p>No news available for this category.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredNews.length > itemsPerPage && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Önceki
          </button>
          <span> Sayfa {currentPage} </span>
          <button 
            disabled={indexOfLastItem >= filteredNews.length} 
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Sonraki
          </button>
        </div>
      )}
    </>
  );
};

export default NewsList;
