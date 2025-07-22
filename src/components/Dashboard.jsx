import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ appointments }) => {
  // Sample data - in a real app, these would come from API/state
  const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
    { id: 2, name: "Dr. Johnson", specialty: "Pediatrics" },
    { id: 3, name: "Dr. Lee", specialty: "Dermatology" }
  ];
  
  // Get unique patients from appointments
  const uniquePatients = [...new Set(appointments.map(apt => apt.patientId))];
  
  // Filter upcoming appointments (assuming date is in YYYY-MM-DD format)
  const today = new Date().toISOString().split('T')[0];
  const upcomingAppointments = appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5); // Show only 5 upcoming

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">MediBook</h2>
        <nav>
          <ul>
            <li className="active">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/appointments">Appointments</Link>
            </li>
            <li>
              <Link to="/doctors">Doctors</Link>
            </li>
            <li>
              <Link to="/patients">Patients</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <div className="date-display">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </header>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <div className="card-icon">
              <span role="img" aria-label="Appointments">📅</span>
            </div>
            <div className="card-content">
              <h3>Appointments</h3>
              <p>{appointments.length}</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-icon">
              <span role="img" aria-label="Doctors">👨‍⚕️</span>
            </div>
            <div className="card-content">
              <h3>Doctors</h3>
              <p>{doctors.length}</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-icon">
              <span role="img" aria-label="Patients">👥</span>
            </div>
            <div className="card-content">
              <h3>Patients</h3>
              <p>{uniquePatients.length}</p>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <Link to="/appointments" className="view-all">View All</Link>
          </div>
          
          {upcomingAppointments.length === 0 ? (
            <div className="empty-state">
              <p>No upcoming appointments</p>
              <Link to="/appointments/new" className="btn-primary">
                Book New Appointment
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map((apt, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/patients/${apt.patientId}`} className="patient-link">
                          {apt.name}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/doctors/${apt.doctorId}`} className="doctor-link">
                          {apt.doctor}
                        </Link>
                      </td>
                      <td>{new Date(apt.date).toLocaleDateString()}</td>
                      <td>{apt.time}</td>
                      <td>
                        <span className={`status-badge ${apt.status || 'confirmed'}`}>
                          {apt.status || 'Confirmed'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link 
                            to={`/prescription/${apt.id}`} 
                            className="btn-icon"
                            title="Prescription"
                          >
                            💊
                          </Link>
                          <Link 
                            to={`/appointments/edit/${apt.id}`} 
                            className="btn-icon"
                            title="Edit"
                          >
                            ✏️
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;