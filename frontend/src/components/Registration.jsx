import { useAuth } from '../hooks/useAuth';

export default function Registration() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      {/* <span>Welcome, {user.email}</span>
      <button onClick={logout}>
        Logout
      </button> */}
    </div>
  );
}
