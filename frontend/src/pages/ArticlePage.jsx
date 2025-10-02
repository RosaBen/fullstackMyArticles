import { useArticles } from '../contexts/ArticlesContextDef';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { initializeScripts } from '../services/scripts';

export default function ArticlePage() {
  const { user } = useAuth();
  const isAuthenticated = user ? true : false;
  const { getArticleById, currentArticle, loading, error } = useArticles();
  const { id } = useParams();

  useEffect(() => {
    // initializeScripts();
    if (id) {
      getArticleById(id);
    }
  }, [getArticleById, id]);

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!currentArticle && !loading) {
    return <div>Article non trouvé</div>;
  }

  return (
    <>
      <div className='row'>
        <div className='col-lg-8 offset-lg-2'>
          <div className='card shadow'>
            <div className='card-header bg-primary text-white'>
              <h1 className='card-title mb-0'>
                {currentArticle?.title || 'Title not available'}
              </h1>
              <div className='article-author-header mt-2'>
                <small className='text-light'>
                  <i className='fas fa-user'></i> Par{' '}
                  {currentArticle?.user?.username ||
                    currentArticle?.author ||
                    'Auteur inconnu'}
                </small>
              </div>
            </div>
            <div className='card-body'>
              <div className='article-content'>
                <p>{currentArticle?.content || 'Content not available'}</p>
              </div>
            </div>
            <div className='card-footer bg-light'>
              <div className='d-flex gap-2 flex-wrap'>
                {isAuthenticated ? (
                  <>
                    <Link to='/' className='btn btn-warning'>
                      Edit article
                    </Link>
                    <Link to='/' className='btn btn-secondary'>
                      Back to article
                    </Link>
                    <button className='btn btn-danger'>Delete</button>
                  </>
                ) : (
                  <Link to='/' className='btn btn-secondary'>
                    Back to article
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
