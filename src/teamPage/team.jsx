import React from "react";
import './team.css'
import { useNavigate } from 'react-router-dom'



const Case = () => {



    return (
        <div className="h-screen w-screen overflow-hidden bg-white">
            <div className="Team-page">
                <div className="header-actions">
                    <h1>📁 Team </h1>
                    <button className="team-create-btn"
                            type="submit">+ Create Seller
                    </button>

                </div>

                <table>
                    <thead>
                    <tr>
                        <th>User ID:</th>
                        <th>Name:</th>
                        <th>Email:</th>
                        <th>Assigned Case</th>
                        <th>Status:</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td className="userID">56842364</td>
                        <td className="name">Ole Jensen</td>
                        <td className="email">OJ@overgaard.dk</td>
                        <td><span className="assign-case">5</span></td>
                        <td>Available</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Case;
