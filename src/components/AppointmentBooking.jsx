import React, { useState } from "react";

function AppointmentBooking({ setAppointments }) {
  const [formData, setFormData] = useState({
    name: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments((prev) => [...prev, formData]); // Send to Dashboard
    setSubmitted(true);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
          Book an Appointment
        </h2>

        {submitted ? (
          <div style={{ textAlign: "center", color: "#28a745" }}>
            <h3>✅ Appointment Booked!</h3>
            <p>
              <strong>Patient:</strong> {formData.name}
            </p>
            <p>
              <strong>Doctor:</strong> {formData.doctor}
            </p>
            <p>
              <strong>Date:</strong> {formData.date}
            </p>
            <p>
              <strong>Time:</strong> {formData.time}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Select Doctor
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">-- Choose a Doctor --</option>
                <option value="Dr. Ayesha Khan">Dr. Ayesha Khan</option>
                <option value="Dr. Rohan Mehta">Dr. Rohan Mehta</option>
                <option value="Dr. Priya Sharma">Dr. Priya Sharma</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Choose Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Choose Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontSize: "15px",
};

export default AppointmentBooking;
