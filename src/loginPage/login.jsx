import { useNavigate } from 'react-router-dom';
import './login.css';
import backgroundImage from './assets/LoginPageBackground.jpg';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../api/services/authService';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePassword = () => setShowPassword((prev) => !prev);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authService.login({ email, password });

            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user || { email }));
                // Store a default client name for temporary use
                localStorage.setItem('clientName', response.user?.name || 'Default Client');
                navigate('/case');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div
                style={{ backgroundImage: `url(${backgroundImage})` }}
                className="bg-cover bg-center h-screen w-full flex justify-center items-center"
            >
                <div className="w-96 p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl border border-white border-opacity-20">
                    <h1 className="text-3xl text-white text-center font-bold mb-6">
                        <i className="fa-solid fa-user mr-2"></i> Login
                    </h1>
                    <hr className="border-gray-400 border-opacity-30 mb-6" />

                    {error && (
                        <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 rounded text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-opacity-20 border border-gray-300 border-opacity-30 rounded-md text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="Enter Email..."
                                required
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-black text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 bg-opacity-20 border border-gray-300 border-opacity-30 rounded-md text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="Enter Password..."
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="eyetoggle absolute right-1 top-8.5 text-gray-300 text-xl hover:text-gray-300 transition bg-white"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="flex justify-end mb-6">
                            <a href="#" className="!text-yellow-300 text-sm font-medium !hover:text-red-500">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gray-800 text-black font-semibold rounded-md hover:bg-gray-700 transition duration-200 disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
