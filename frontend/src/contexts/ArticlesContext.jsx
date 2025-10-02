import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import { ArticlesContext } from "./ArticlesContextDef";

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getArticles(); 
      setArticles(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = (newArticle) => {
    setArticles(prev => [...prev, newArticle]);
  };

  const updateArticle = (id, updatedArticle) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? updatedArticle : article
    ));
  };

  const deleteArticle = (id) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const value = {
    articles,
    loading,
    error,
    fetchArticles,
    addArticle,
    updateArticle,
    deleteArticle
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};