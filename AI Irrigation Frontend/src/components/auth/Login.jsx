import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";



function LoginForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
 
     try {
       const response = await axios.post(
         `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
         credentials,
         {
           headers: {
             "Content-Type": "application/json",
           },
           mode: "cors",
         }
       );
 
         const data = response.data;
         console.log("Loggedin User Data: ", data);

         localStorage.setItem("token", data.access_token);
         localStorage.setItem("token_type", data.token_type);

 
 
       if (response.status===201 | response.status===200) {
         navigate("/dashboard");
       } else {
         alert("Registration failed");
       }
     } catch (error) {
       console.error("Error during registration:", error);
     }
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Login 
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-green-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
