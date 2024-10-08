import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patients.css'; // Ensure you have styling for this component
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// Example list of countries; replace with a complete list or fetch from an API
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  // Add more countries as needed
];

// Example list of genders; replace with a complete list if needed
const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    patient_Name: '',
    gender: '',
    dob: '',
    address: '',
    contact_number: '',
    optional_number: '',
    email: '',
    country: '',
  });

  useEffect(() => {
    axios.get('https://localhost:7255/api/Patient')
      .then(response => setPatients(response.data))
      .catch(error => console.error("There was an error fetching the patients!", error));
  }, []);

  const handleEditClick = (patient) => {
    setEditPatient(patient);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    axios.delete(`https://localhost:7255/api/Patient/${id}`)
      .then(() => {
        setPatients(patients.filter(patient => patient.id !== id));
      })
      .catch(error => console.error("There was an error deleting the patient!", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    axios.put(`https://localhost:7255/api/Patient/${editPatient.id}`, editPatient)
      .then(() => {
        setPatients(patients.map(patient => patient.id === editPatient.id ? editPatient : patient));
        setShowEditModal(false);
      })
      .catch(error => console.error("There was an error updating the patient!", error));
  };

  const handleAddPatient = () => {
    axios.post('https://localhost:7255/api/Patient', newPatient)
      .then(response => {
        setPatients([...patients, response.data]);
        setShowAddModal(false);
        setNewPatient({
          patient_Name: '',
          gender: '',
          dob: '',
          address: '',
          contact_number: '',
          optional_number: '',
          email: '',
          country: '',
        });
      })
      .catch(error => console.error("There was an error adding the patient!", error));
  };

  return (
    <div className="patients-container">
      <h1>Patients List</h1>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>Add New Patient</Button>
      <table className="patients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Optional Number</th>
            <th>Email</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.patient_Name}</td>
              <td>{patient.gender}</td>
              <td>{new Date(patient.dob).toLocaleDateString()}</td>
              <td>{patient.address}</td>
              <td>{patient.contact_number}</td>
              <td>{patient.optional_number || 'N/A'}</td>
              <td>{patient.email || 'N/A'}</td>
              <td>{patient.country || 'N/A'}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(patient)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(patient.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editPatient && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPatientName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="patient_Name"
                  value={editPatient.patient_Name || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={editPatient.gender || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  {genders.map(gender => (
                    <option key={gender.value} value={gender.value}>
                      {gender.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={editPatient.dob ? new Date(editPatient.dob).toISOString().substr(0, 10) : ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={editPatient.address || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formContactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact number"
                  name="contact_number"
                  value={editPatient.contact_number || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formOptionalNumber">
                <Form.Label>Optional Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter optional number"
                  name="optional_number"
                  value={editPatient.optional_number || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={editPatient.email || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  name="country"
                  value={editPatient.country || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select a country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPatientName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="patient_Name"
                value={newPatient.patient_Name}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={newPatient.gender}
                onChange={handleNewInputChange}
              >
                <option value="">Select gender</option>
                {genders.map(gender => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={newPatient.dob}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={newPatient.address}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contact_number"
                value={newPatient.contact_number}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formOptionalNumber">
              <Form.Label>Optional Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter optional number"
                name="optional_number"
                value={newPatient.optional_number}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newPatient.email}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={newPatient.country}
                onChange={handleNewInputChange}
              >
                <option value="">Select a country</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddPatient}>Add Patient</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientsPage;
