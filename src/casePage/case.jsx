import React from "react";
import './Case.css'
import { useNavigate } from 'react-router-dom'



const Caseoverview = () => {
    const navigate = useNavigate()
    const goToOpretcase = () => {
        navigate('/opretCase')
    }

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className="case-page">
                <div className="header-actions">
                    <h1>📁 My Cases</h1>
                    <button className="case-create-btn"
                            onClick={goToOpretcase}
                            type="submit">+ Create Case
                    </button>

                </div>

                <table>
                    <thead>
                    <tr>
                        <th>Case ID:</th>
                        <th>Client:</th>
                        <th>Assigned:</th>
                        <th>Door Type:</th>
                        <th>Date:</th>
                        <th>Status:</th>
                        <th>Price:</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td className="caseID">56842364</td>
                        <td className="client">Ole Jensen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type A</td>
                        <td>08/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>7.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">""</td>
                        <td className="client">""</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type B</td>
                        <td>12/10/25</td>
                        <td><span className="status lead">Lead</span></td>
                        <td>7.500 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">66842362</td>
                        <td className="client">Lars Løkke</td>
                        <td className="assigned">Rosa Nielsen</td>
                        <td className="doortype">Door Type C</td>
                        <td>06/12/25</td>
                        <td><span className="status finish">Finish</span></td>
                        <td>8.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">12345678</td>
                        <td className="client">Anders Hemmingsen</td>
                        <td className="assigned">Stine Petersen</td>
                        <td className="doortype">Door Type D</td>
                        <td>10/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>8.250 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">21345678</td>
                        <td className="client">Jacob Hermann</td>
                        <td className="assigned">Stine Petersen</td>
                        <td className="doortype">Door Type E</td>
                        <td>17/10/25</td>
                        <td><span className="status lead">Lead</span></td>
                        <td>8.500 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">26842365</td>
                        <td className="client">Peter Olsen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type F</td>
                        <td>18/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>6.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">36842361</td>
                        <td className="client">Julie Pedersen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type G</td>
                        <td>19/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>4.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">76842305</td>
                        <td className="client">Ida Sofie Nielsen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type H</td>
                        <td>25/10/25</td>
                        <td><span className="status finish">Finish</span></td>
                        <td>6.500 DKK</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Caseoverview;
