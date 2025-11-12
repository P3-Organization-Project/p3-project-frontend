import React from "react";
import './team.css';

const Team = () => {

    return (
        <div className="h-screen w-screen overflow-hidden bg-white">
            <div className="Team-page">
                <div className="header-actions">
                    <h1>📁 Team </h1>
                    <button className="team-create-btn"
                            type="submit">+ Create Seller
                    </button>
                </div>

                {/*  Seller overview section */}
                <div className="team-summary">
                    <div className="summary-item">
                        <div className="summary-icon all">👥</div>
                        <div>
                            <p>Total Employees</p>
                            <h3>8</h3>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="summary-icon active">✅</div>
                        <div>
                            <p>Active</p>
                            <h3>5</h3>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="summary-icon leave">🕓</div>
                        <div>
                            <p>On Leave</p>
                            <h3>2</h3>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="summary-icon inactive">❌</div>
                        <div>
                            <p>Inactive</p>
                            <h3>1</h3>
                        </div>
                    </div>
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

export default Team;
