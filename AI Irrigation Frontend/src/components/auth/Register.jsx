import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

        const data = response.data;
        console.log("Registered User Data: ", data);

        
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
          Register for AI Irrigation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "first_name", label: "First Name" },
            { name: "last_name", label: "Last Name" },
            { name: "username", label: "Username" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}


export default RegisterForm;
