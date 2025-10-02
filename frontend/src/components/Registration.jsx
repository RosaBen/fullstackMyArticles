import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Registration() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(
      username,
      email,
      password,
      passwordConfirmation
    );

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6 col-lg-5'>
        <div className='card shadow-lg border-0'>
          <div className='card-header bg-success text-white text-center'>
            <h2 className='card-title mb-0'>
              <i className='fas fa-user-plus me-2'></i>
              Registration
            </h2>
          </div>
          <div className='card-body p-5'>
            <form onSubmit={handleSubmit} className='needs-validation'>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}
              <div className='mb-4'>
                <label htmlFor='email' className='form-label fw-bold'>
                  Username:
                </label>
                <input
                  id='username'
                  type='text'
                  className='form-control form-control-lg'
                  value={username}
                  placeholder='username'
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus={true}
                  autoComplete='username'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email' className='form-label fw-bold'>
                  Email:
                </label>
                <input
                  id='email'
                  type='email'
                  className='form-control form-control-lg'
                  value={email}
                  placeholder='votre@email.com'
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='email'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='form-label fw-bold'>
                  Password:
                </label>
                <input
                  id='password'
                  type='password'
                  className='form-control form-control-lg'
                  value={password}
                  placeholder='votremot depasse'
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='password-confirmation'
                  className='form-label fw-bold'
                >
                  Confirm Password:
                </label>
                <input
                  id='password-confirmation'
                  type='password'
                  className='form-control form-control-lg'
                  value={passwordConfirmation}
                  placeholder='confirm password'
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete='current-password'
                  required
                />
              </div>
              <div className='d-grid mb-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='btn btn-primary btn-lg'
                >
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
