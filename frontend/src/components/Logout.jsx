import { useAuth } from '../contexts/AuthContext';

export default function Logout() {
  const { logout, user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <span>Welcome, {user.email}</span>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}