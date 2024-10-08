import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Treatments.css'; // Ensure you have styling for this component
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const TreatmentsPage = () => {
  const [treatments, setTreatments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const [newTreatment, setNewTreatment] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('https://localhost:7255/api/Treatment')
      .then(response => setTreatments(response.data))
      .catch(error => console.error("There was an error fetching the treatments!", error));
  }, []);

  const handleEditClick = (treatment) => {
    setCurrentTreatment(treatment);
    setNewTreatment({
      title: treatment.title,
      description: treatment.description,
      price: treatment.price,
      image: null,
    });
    setErrors({});
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    axios.delete(`https://localhost:7255/api/Treatment/${id}`)
      .then(() => {
        setTreatments(treatments.filter(treatment => treatment.id !== id));
      })
      .catch(error => console.error("There was an error deleting the treatment!", error));
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewTreatment((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newTreatment.title) errors.title = 'Title is required.';
    if (!newTreatment.description) errors.description = 'Description is required.';
    if (!newTreatment.price || isNaN(newTreatment.price)) errors.price = 'Price must be a valid number.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = () => {
    if (!validateForm()) return;

    const { id, title, description, price, image } = currentTreatment || newTreatment;

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('Price', price); // Price as number
    if (image) {
      formData.append('Image', image);
    }

    if (currentTreatment) {
      axios.put(`https://localhost:7255/api/Treatment/${currentTreatment.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(() => {
          setTreatments(treatments.map(treatment => treatment.id === currentTreatment.id ? { ...currentTreatment, ...newTreatment } : treatment));
          setShowEditModal(false);
        })
        .catch(error => console.error("There was an error updating the treatment!", error));
    } else {
      axios.post('https://localhost:7255/api/Treatment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          setTreatments([...treatments, response.data]);
          setShowAddModal(false);
          setNewTreatment({
            title: '',
            description: '',
            price: '',
            image: null,
          });
        })
        .catch(error => console.error("There was an error adding the treatment!", error));
    }
  };

  return (
    <div className="treatments-container">
      <h1>Treatments List</h1>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>Add New Treatment</Button>
      <table className="treatments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map(treatment => (
            <tr key={treatment.id}>
              <td>{treatment.id}</td>
              <td>{treatment.title}</td>
              <td>{treatment.description}</td>
              <td>${treatment.price}</td>
              <td>{treatment.image ? <img src={treatment.image} alt={treatment.title} width="100" /> : 'N/A'}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(treatment)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(treatment.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {currentTreatment && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Treatment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter treatment title"
                  name="title"
                  value={newTreatment.title}
                  onChange={handleInputChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter treatment description"
                  name="description"
                  value={newTreatment.description}
                  onChange={handleInputChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Enter treatment price"
                  name="price"
                  value={newTreatment.price}
                  onChange={handleInputChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
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
          <Modal.Title>Add New Treatment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter treatment title"
                name="title"
                value={newTreatment.title}
                onChange={handleInputChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter treatment description"
                name="description"
                value={newTreatment.description}
                onChange={handleInputChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter treatment price"
                name="price"
                value={newTreatment.price}
                onChange={handleInputChange}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Add Treatment</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TreatmentsPage;
