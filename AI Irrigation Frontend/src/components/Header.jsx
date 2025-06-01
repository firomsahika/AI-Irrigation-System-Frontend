// components/Header.jsx
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-white fixed w-full shadow-md px-14 py-2 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-green-700">
        🌱 Automated Irrigation Monitor 
      </Link>

      <nav className="flex items-center gap-6">
        {!user ? (
          <>
            <Link
              to="/"
              className="text-gray-700 hover:text-green-700 font-medium"
            >
              Home
            </Link>
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-green-700 font-medium"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="text-gray-700 hover:text-green-700 font-medium"
            >
              Register
            </Link>
          </>
        ) : (
          <Link to="/auth/profile" className="flex flex-col items-center justify-center">
            <FaUserCircle size={30} className="text-2xl text-green-700 hover:text-green-800" />
            <h2 className="text-slate-800 font-medium">{user.username}</h2>
          </Link>
        )}
      </nav>
    </header>
  );
}
