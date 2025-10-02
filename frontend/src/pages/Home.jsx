import { useArticles } from '../contexts/ArticlesContextDef';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeScripts } from '../services/scripts';

export default function Home() {
  const { user } = useAuth();
  const isAuthenticated = user ? true : false;
  const { articles, loading, error } = useArticles();

  useEffect(() => {
    initializeScripts();
  }, [articles]);

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className='display-4'>Articles</h1>
      </div>
      {isAuthenticated === true ? (
        <Link to='/' className='btn btn-primary btn-lg'>
          New Article
        </Link>
      ) : (
        ''
      )}
      <div className='row'>
        <div className='col-12 mb-3'>
          <button id='count-articles' className='btn btn-info' type='button'>
            <i className='fas fa-calculator'></i> Count Articles
          </button>
          <span
            id='article-count'
            className='ms-3 badge bg-secondary fs-6'
          ></span>
        </div>
      </div>

      <div id='articles' className='row'>
        {articles && articles.length > 0 ? (
          articles.map((article, idx) => (
            <div
              className='col-md-6 col-lg-4 mb-4 article-card'
              key={article.id || idx}
            >
              <div className='card h-100 shadow-sm'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    {article.title ? article.title : 'No Title'}
                  </h5>
                  <p className='card-text'>
                    {article.content ? article.content : 'No Content'}
                  </p>
                </div>
                <div className='card-footer bg-transparent'>
                  <div className='d-flex justify-content-between align-items-center mb-2'>
                    {/* <small className="text-muted author-info">
                    <i className="fas fa-user"></i> By {article.user_id}
                  </small> */}
                  </div>
                  <Link to='/' className='btn btn-outline-primary btn-sm'>
                    View Article
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-md-6 col-lg-4 mb-4 article-card'>
            <p className='card h-100 shadow-sm'>Articles are coming soon...</p>
          </div>
        )}
      </div>
    </>
  );
}
