import { useAuth } from '../hooks/useAuth';

export default function Logout() {
  const { logout, user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
