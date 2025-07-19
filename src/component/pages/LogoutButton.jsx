// components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authUser'); // or whatever key you use to store logged-in user
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
    >
      Logout
    </button>
  );
}

export default LogoutButton;