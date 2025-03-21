import axios from "axios";

const API_URL = "http://127.0.0.1:8000/"; // Django backend adresin

export const getNews = async () => {
  const response = await axios.get(`${API_URL}/news/`);
  return response.data.results; // ❗ SADECE results dizisini döndürüyoruz
};

export const getNewsDetail = async (id) => {
  const response = await axios.get(`${API_URL}/news/${id}/`);
  return response.data;
};

export const addNews = async (newsData) => {
  const response = await axios.post(`${API_URL}/news/`, newsData);
  return response.data;
};
