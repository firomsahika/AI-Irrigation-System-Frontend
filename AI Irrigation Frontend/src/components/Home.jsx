import { useUser } from "../context/userContext";

// pages/Home.jsx
export default function Home() {
 const {user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
          Welcome to the AI Irrigation System
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Empowering farmers with intelligent irrigation solutions that save
          water, boost crop yield, and improve efficiency.
        </p>
        {!user ? (
          <>
            <div className="flex justify-center gap-4">
              <a
                href="/auth/register"
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Get Started
              </a>
              <a
                href="/auth/login"
                className="px-6 py-3 bg-white border border-green-600 text-green-700 rounded hover:bg-green-50 transition"
              >
                Login
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center gap-4">
              <a
                href="/dashboard"
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Go To Dashboard
              </a>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}
