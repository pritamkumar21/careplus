import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Prescription.css';

const Prescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [prescription, setPrescription] = useState({
    patientName: '',
    doctorName: '',
    date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    medications: [],
    instructions: '',
    followUpDate: ''
  });

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  });

  // Fetch prescription mock (replace with real API call)
  useEffect(() => {
    const fetchPrescription = async () => {
      const mock = {
        patientName: 'John Doe',
        doctorName: 'Dr. Smith',
        date: '2023-06-15',
        diagnosis: 'Hypertension',
        medications: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
          { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }
        ],
        instructions: 'Take with food. Monitor blood pressure weekly.',
        followUpDate: '2023-07-15'
      };
      setPrescription(mock);
    };

    fetchPrescription();
  }, [id]);

  const handleInputChange = ({ target }) => {
    setPrescription(prev => ({ ...prev, [target.name]: target.value }));
  };

  const handleMedicationChange = ({ target }) => {
    setNewMedication(prev => ({ ...prev, [target.name]: target.value }));
  };

  const addMedication = () => {
    const { name, dosage } = newMedication;
    if (!name.trim() || !dosage.trim()) {
      alert('Medication name and dosage are required.');
      return;
    }

    setPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication]
    }));

    setNewMedication({ name: '', dosage: '', frequency: '', duration: '' });
  };

  const removeMedication = (index) => {
    setPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const savePrescription = () => {
    console.log('Prescription saved:', prescription);
    setIsEditing(false);
    alert('Prescription saved successfully!');
  };

  const printPrescription = () => {
    window.print();
  };

  return (
    <div className="prescription-container">
      {/* Header */}
      <header className="prescription-header">
        <h1>Medical Prescription</h1>
        <div className="prescription-actions">
          {isEditing ? (
            <>
              <button onClick={savePrescription} className="btn-save">Save</button>
              <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
              <button onClick={printPrescription} className="btn-print">Print</button>
            </>
          )}
        </div>
      </header>

      {/* Card Body */}
      <div className="prescription-card">
        {/* Clinic Info */}
        <section className="prescription-header-info">
          <div className="clinic-info">
            <h2>MediBook Clinic</h2>
            <p>123 Health Street, Medical City</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="prescription-meta">
            <p><strong>Date:</strong> {prescription.date}</p>
            <p><strong>Prescription ID:</strong> {id || 'N/A'}</p>
          </div>
        </section>

        {/* Patient & Doctor Info */}
        <section className="patient-details">
          <div>
            <h3>Patient</h3>
            {isEditing ? (
              <input
                type="text"
                name="patientName"
                value={prescription.patientName}
                onChange={handleInputChange}
                placeholder="Patient Name"
              />
            ) : (
              <p><strong>Name:</strong> {prescription.patientName}</p>
            )}
          </div>
          <div>
            <h3>Doctor</h3>
            {isEditing ? (
              <input
                type="text"
                name="doctorName"
                value={prescription.doctorName}
                onChange={handleInputChange}
                placeholder="Doctor Name"
              />
            ) : (
              <p><strong>Name:</strong> {prescription.doctorName}</p>
            )}
          </div>
        </section>

        {/* Diagnosis */}
        <section className="diagnosis-section">
          <h3>Diagnosis</h3>
          {isEditing ? (
            <textarea
              name="diagnosis"
              value={prescription.diagnosis}
              onChange={handleInputChange}
              rows="3"
              placeholder="Diagnosis..."
            />
          ) : (
            <p>{prescription.diagnosis || 'No diagnosis provided'}</p>
          )}
        </section>

        {/* Medications */}
        <section className="medications-section">
          <h3>Medications</h3>
          {prescription.medications.length > 0 ? (
            <table className="medications-table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  {isEditing && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {prescription.medications.map((med, index) => (
                  <tr key={index}>
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.frequency}</td>
                    <td>{med.duration}</td>
                    {isEditing && (
                      <td>
                        <button
                          onClick={() => removeMedication(index)}
                          className="btn-remove"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No medications prescribed</p>
          )}

          {/* Add New Medication */}
          {isEditing && (
            <div className="add-medication">
              <h4>Add Medication</h4>
              <div className="medication-inputs">
                {['name', 'dosage', 'frequency', 'duration'].map(field => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={newMedication[field]}
                    onChange={handleMedicationChange}
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                  />
                ))}
                <button onClick={addMedication} className="btn-add">Add</button>
              </div>
            </div>
          )}
        </section>

        {/* Instructions */}
        <section className="instructions-section">
          <h3>Instructions</h3>
          {isEditing ? (
            <textarea
              name="instructions"
              value={prescription.instructions}
              onChange={handleInputChange}
              rows="4"
              placeholder="Special instructions..."
            />
          ) : (
            <p>{prescription.instructions || 'No special instructions'}</p>
          )}
        </section>

        {/* Follow-up */}
        <section className="followup-section">
          <h3>Follow-Up</h3>
          {isEditing ? (
            <input
              type="date"
              name="followUpDate"
              value={prescription.followUpDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
            />
          ) : (
            <p>
              <strong>Next Visit:</strong> {prescription.followUpDate || 'Not specified'}
            </p>
          )}
        </section>

        {/* Signature */}
        <section className="signature-section">
          {isEditing ? (
            <div>
              <label>Doctor's Signature</label>
              <input type="text" placeholder="Enter full name" />
            </div>
          ) : (
            <div className="signature-display">
              <p>_________________________</p>
              <p>Dr. {prescription.doctorName}</p>
              <p>Licensed Physician</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Prescription;
