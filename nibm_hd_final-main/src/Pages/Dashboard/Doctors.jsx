import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Doctors.css'; // Ensure you have styling for this component
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    speciality: '',  // Updated to match backend field
    contact_number: '',  // Updated to match backend field
    email: '',
  });

  useEffect(() => {
    axios.get('https://localhost:7255/api/Doctor')
      .then(response => setDoctors(response.data))
      .catch(error => console.error("There was an error fetching the doctors!", error));
  }, []);

  const handleEditClick = (doctor) => {
    setEditDoctor(doctor);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    axios.delete(`https://localhost:7255/api/Doctor/${id}`)
      .then(() => {
        setDoctors(doctors.filter(doctor => doctor.id !== id));
      })
      .catch(error => console.error("There was an error deleting the doctor!", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor(prev => ({ ...prev, [name]: value }));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    axios.put(`https://localhost:7255/api/Doctor/${editDoctor.id}`, editDoctor)
      .then(() => {
        setDoctors(doctors.map(doctor => doctor.id === editDoctor.id ? editDoctor : doctor));
        setShowEditModal(false);
      })
      .catch(error => console.error("There was an error updating the doctor!", error));
  };

  const handleAddDoctor = () => {
    axios.post('https://localhost:7255/api/Doctor', newDoctor)
      .then(response => {
        setDoctors([...doctors, response.data]);
        setShowAddModal(false);
        setNewDoctor({
          name: '',
          speciality: '',  // Updated to match backend field
          contact_number: '',  // Updated to match backend field
          email: '',
        });
      })
      .catch(error => console.error("There was an error adding the doctor!", error));
  };

  return (
    <div className="doctors-container">
      <h1>Doctors List</h1>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>Add New Doctor</Button>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>  {/* Updated to match backend field */}
            <th>Contact Number</th>  {/* Updated to match backend field */}
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>  {/* Updated to match backend field */}
              <td>{doctor.contact_number}</td>  {/* Updated to match backend field */}
              <td>{doctor.email}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(doctor)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(doctor.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editDoctor && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Doctor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={editDoctor.name || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formSpecialty">
                <Form.Label>Specialty</Form.Label>  {/* Updated to match backend field */}
                <Form.Control
                  type="text"
                  placeholder="Enter specialty"
                  name="speciality" 
                  value={editDoctor.speciality || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formContactNumber">
                <Form.Label>Contact Number</Form.Label>  {/* Updated to match backend field */}
                <Form.Control
                  type="text"
                  placeholder="Enter contact number"
                  name="contact_number" 
                  value={editDoctor.contact_number || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={editDoctor.email || ''}
                  onChange={handleInputChange}
                />
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
          <Modal.Title>Add New Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newDoctor.name}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSpecialty">
              <Form.Label>Specialty</Form.Label>  {/* Updated to match backend field */}
              <Form.Control
                type="text"
                placeholder="Enter specialty"
                name="speciality" 
                value={newDoctor.speciality}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>  {/* Updated to match backend field */}
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contact_number"  
                value={newDoctor.contact_number}
                onChange={handleNewInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newDoctor.email}
                onChange={handleNewInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddDoctor}>Add Doctor</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorsPage;
