import { useNavigate } from 'react-router-dom'
import './login.css'
import backgroundImage from './assets/LoginPageBackground.jpg'
import { useState } from 'react'

function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => setShowPassword(prev => !prev)

    const navigate = useNavigate()
    const goToDashboard = () => {
        navigate('/dashboard')
    }

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div
                style={{ backgroundImage: `url(${backgroundImage})` }}
                className="bg-cover bg-center h-screen w-full flex justify-center items-center"
            >
                <div className="w-150 h-110 p-5 shadow-lg bg-black rounded-md relative">
                    <h1 className="text-3x1 block text-center font-semibold">
                        <i className="fa-solid fa-user"></i> Login
                    </h1>
                    <hr className="mt-5" />

                    {/* Username */}
                    <div className="mt-5">
                        <label htmlFor="username" className="block text-base mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="border w-full text-base px-3 py-3 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Enter Username..."
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-3 relative">
                        <label htmlFor="password" className="block text-base mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="border w-full text-base px-3 py-3 focus:outline-none focus:ring-0 focus:border-gray-600 pr-10"
                            placeholder="Enter Password..."
                        />

                        {/*Toggle show password */}
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-600 mt-3"
                        >
                            {showPassword ? '👁' : '👁️'}
                        </button>
                            <input/>
                    </div>

                    {/* Forgot password */}
                    <div className="mt-3 flex justify-between items-center">
                        <a href="#" className="text-indigo-800 font-semibold">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login button */}
                    <div className="mt-10">
                        <button
                            onClick={goToDashboard}
                            type="submit"
                            className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
