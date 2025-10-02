import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const isAuthenticated = user ? true : false;
  let navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className='bg-blue-600 text-white p-4'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            {isAuthenticated === true ? (
              <ul className='navbar-nav me-auto'>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    Accueil
                  </Link>
                </li>
                <li className='nav-item'>
                  <button
                    onClick={handleLogout}
                    className='nav-link btn btn-link text-white'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className='navbar-nav me-auto'>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/registration' className='nav-link'>
                    Registration
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <div className='container mx-auto'>
        <h1 className='text-2xl font-bold'>My Articles</h1>
      </div>
    </header>
  );
}
