import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 border-b">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {user && (
          <>
            <span>Welcome, {user.name}!</span>
            <button onClick={logout} className="ml-2 text-red-600">Logout</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<div className="p-4">Home Page</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
