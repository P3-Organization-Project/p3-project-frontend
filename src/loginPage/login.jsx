import { useState } from 'react'
import './login.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import backgroundImage from './assets/LoginPageBackground.jpg';



function Login() {


  return (
    <>

        <div className="h-screen w-screen overflow-hidden">
                <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-cover bg-center h-screen w-full flex justify-center items-center" >
                    <div className="w-150 h-110 p-5 shadow-lg bg-black rounded-md">
                        <h1 className="text-3x1 block text-center font-semibold"><i className="fa-solid fa-user"></i>Login</h1>
                        <hr className="mt-5"/>
                        <div className="mt-5">
                            <label For="username" className="block text-base mb-2">Username</label>
                            <input type="text" id="username"
                                className="border w-full text-base px-3 py-3 focus:outline-none focus:ring-0 focus:border-gray-600"
                                placeholder="Enter Username..."/>
                        </div>
                        <div className="mt-3">
                            <label For="password" className="block text-base mb-2">Password</label>
                            <input type="password" id="password"
                                className="border w-full text-base px-3 py-3 focus:outline-none focus:ring-0 focus:border-gray-600"
                                placeholder="Enter Password..."/>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <div>
                                <a href="#" className="text-indigo-800 font-semibold">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text indigo-700 font-semibold">Login</button>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}

export default Login
