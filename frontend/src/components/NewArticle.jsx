import { Link, useNavigate } from 'react-router-dom';
import { useArticles } from '../contexts/ArticlesContextDef';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
export default function NewArticle() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { addArticle } = useArticles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await addArticle(title, content);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  if (authLoading) {
    return <div>Vérification de l'authentification...</div>;
  }

  return (
    <>
      <div className='row'>
        <div className='col-lg-8 offset-lg-2'>
          <div className='card shadow'>
            <div className='card-header bg-success text-white'>
              <h1 className='card-title mb-0'>
                <i className='fas fa-plus-circle'></i>
                Create a new article
              </h1>
            </div>
            <div className='card-body'>
              {isAuthenticated ? (
                <form onSubmit={handleSubmit} className='row g-3'>
                  {error && (
                    <div className='alert alert-danger' role='alert'>
                      {error}
                    </div>
                  )}
                  <div className='col-12'>
                    <label className='form-label' htmlFor='title'>
                      Title
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      value={title}
                      placeholder='Enter the title of your article'
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus={true}
                      autoComplete='title'
                      required
                    />
                  </div>
                  <div className='col-12'>
                    <label className='form-label' htmlFor='content'>
                      Content
                    </label>
                    <textarea
                      className='form-control'
                      id='content'
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder='Enter the content of your article'
                      rows='5'
                      required
                    ></textarea>
                  </div>
                  <div className='col-12'>
                    <div className='d-flex gap-2'>
                      <button
                        type='submit'
                        disabled={loading}
                        className='btn btn-primary'
                      >
                        Create article
                      </button>
                      <Link to='/' className='btn btn-secondary'>
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              ) : (
                <p className='row g-3'>Veuillez vous connecter</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
