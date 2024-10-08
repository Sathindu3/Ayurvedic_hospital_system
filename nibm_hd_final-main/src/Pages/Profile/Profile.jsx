import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './Profile.css';

const AddPatient = () => {
  const [patient, setPatient] = useState({
    patient_Name: '',
    gender: '',
    dob: '',
    address: '',
    contact_number: '',
    optional_number: '',
    email: '',
    country: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate Contact Number
    if (patient.contact_number && (!/^\d+$/.test(patient.contact_number) || patient.contact_number.length > 12)) {
      errors.contact_number = 'Contact number must be numeric and up to 12 digits long.';
    }
    
    // Validate Optional Number
    if (patient.optional_number && (!/^\d+$/.test(patient.optional_number) || patient.optional_number.length > 12)) {
      errors.optional_number = 'Optional number must be numeric and up to 12 digits long.';
    }

    // Validate Email
    if (patient.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(patient.email)) {
      errors.email = 'Invalid email address.';
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await axios.post('https://localhost:7255/api/Patient', patient);
      // Clear form fields
      setPatient({
        patient_Name: '',
        gender: '',
        dob: '',
        address: '',
        contact_number: '',
        optional_number: '',
        email: '',
        country: '',
      });
      setErrors({});
      setSuccessMessage('Patient added successfully!');
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('There was an error adding the patient!', error);
    }
  };

  return (
    <div className="container-fluid section-profile">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 content-1">
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <h2>Add new Patient</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Patient's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="patient_Name"
                  value={patient.patient_Name}
                  onChange={handleChange}
                  placeholder="Patient's Name"
                  isInvalid={!!errors.patient_Name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patient_Name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={patient.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={patient.dob}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={patient.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_number"
                  value={patient.contact_number}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  isInvalid={!!errors.contact_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contact_number}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Optional Number</Form.Label>
                <Form.Control
                  type="text"
                  name="optional_number"
                  value={patient.optional_number}
                  onChange={handleChange}
                  placeholder="Optional Number"
                  isInvalid={!!errors.optional_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.optional_number}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={patient.email}
                  onChange={handleChange}
                  placeholder="Email"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="country"
                  value={patient.country}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                  {/* Add more countries as needed */}
                </Form.Select>
              </Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
