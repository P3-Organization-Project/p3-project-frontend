import { useNavigate } from 'react-router-dom';
import './login.css';
import backgroundImage from './assets/LoginPageBackground.jpg';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center h-screen w-full flex justify-center items-center"
      >
        {/* Login Box style */}
        <div className="w-96 p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl border border-white border-opacity-20">
          <h1 className="text-3xl text-white text-center font-bold mb-6">
            <i className="fa-solid fa-user mr-2"></i> Login
          </h1>
          <hr className="border-gray-400 border-opacity-30 mb-6" />

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-black text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 bg-opacity-20 border border-gray-300 border-opacity-30 rounded-md text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter Username..."
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-black text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-3 pr-12 bg-opacity-20 border border-gray-300 border-opacity-30 rounded-md text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter Password..."
            />
            {/* Eye Toggle Button */}
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-1 top-8.5 text-gray-800 text-xl hover:text-gray-300 transition bg-white bg-opacity-50"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-gray-300 text-sm font-medium hover:text-gray-200">
              Forgot Password?
            </a>
          </div>

          {/* Login button */}
          <button
            onClick={goToDashboard}
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;