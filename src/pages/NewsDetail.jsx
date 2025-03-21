import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNews } from "../api/api"; 
import "../css/NewsDetail.css";

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const data = await getNews();
        const selectedNews = data.find((item) => item.id.toString() === id);

        if (selectedNews) {
          setNewsItem(selectedNews);
        } else {
          console.error("Haber bulunamadı!");
        }
      } catch (error) {
        console.error("Haber detaylarını çekerken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return <p className="loading-text">Yükleniyor...</p>;
  }

  if (!newsItem) {
    return <p className="error-text">Haber bulunamadı!</p>;
  }

  return (
    <div style={{ marginLeft: "150px" }} className="news-container">
      <h1 className="news-title">{newsItem.title}</h1>
      <p className="news-date">{new Date(newsItem.published_at).toLocaleDateString()}</p>

      <img src={newsItem.image.startsWith("http") ? newsItem.image : `http://localhost:8000${newsItem.image}`} 
     alt={newsItem.title} className="news-image" />
       

      <p className="news-content">{newsItem.content}</p>
      <Link to="/" className="back-link">
        ← Geri Dön
      </Link>
    </div>
  );
};

export default NewsDetail;
