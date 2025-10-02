import { useEffect, useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { ArticlesContext } from './ArticlesContextDef';

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
      console.error('Erreur lors de la récupération des articles :', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [currentArticle, setCurrentArticle] = useState(null);

  const getArticleById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const article = await apiService.getArticleById(id);
      setCurrentArticle(article);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article :", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = async (title, content) => {
    try {
      const response = await apiService.createArticle(title, content);
      if (response.article) {
        setArticles((prev) => [...prev, response.article]);
        return { success: true };
      } else {
        return {
          success: false,
          error: response.errors
            ? response.errors.join(', ')
            : response.message || 'Article creation failed',
        };
      }
    } catch (error) {
      console.error('CreateArticleerror:', error);
      return {
        success: false,
        error: error.message || 'Article creation failed',
      };
    }
  };

  const updateArticle = (id, updatedArticle) => {
    setArticles((prev) =>
      prev.map((article) => (article.id === id ? updatedArticle : article))
    );
  };

  const deleteArticle = (id) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const value = {
    articles,
    currentArticle,
    loading,
    error,
    fetchArticles,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};
