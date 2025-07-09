import React from 'react';
import './Dashboard.css';

// You can add custom styles if needed

const Dashboard = ({ appointments }) => {
  const doctorCount = 3; // hardcoded for now
  const patientCount = appointments.length; // one patient per booking

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">MediBook</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Appointments</li>
            <li>Doctors</li>
            <li>Patients</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Dashboard Overview</h1>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <p>Appointments</p>
            <h2>{appointments.length}</h2>
          </div>
          <div className="card">
            <p>Doctors</p>
            <h2>{doctorCount}</h2>
          </div>
          <div className="card">
            <p>Patients</p>
            <h2>{patientCount}</h2>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="appointments">
          <h3>Upcoming Appointments</h3>
          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, index) => (
                  <tr key={index}>
                    <td>{apt.name}</td>
                    <td>{apt.doctor}</td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
