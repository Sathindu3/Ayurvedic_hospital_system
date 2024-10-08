import React, { useState } from "react";
import './Channels.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateAppointment = () => {
  const [appointment, setAppointment] = useState({
    appointmentDate: "",
    reason: "",
    phoneNumber: "",
    name: ""
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    // Validate form fields
    if (!appointment.appointmentDate || !appointment.reason || !appointment.phoneNumber || !appointment.name) {
      setError("All fields are required.");
      return;
    }

    axios.post("https://localhost:7255/api/Appointment", appointment)
      .then(response => {
        console.log("Appointment created:", response.data);
        setSuccessMessage("Appointment successfully created!");
        setAppointment({
          appointmentDate: "",
          reason: "",
          phoneNumber: "",
          name: ""
        });
      })
      .catch(error => {
        console.error("There was an error creating the appointment!", error);
        if (error.response) {
          // Log detailed error response
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
          console.log("Error response headers:", error.response.headers);
          
          const { data } = error.response;
          if (data) {
            const { errors } = data;
            if (errors) {
              const errorMessage = Object.keys(errors)
                .map(key => `${key}: ${errors[key].join(", ")}`)
                .join(", ");
              setError(`Error: ${errorMessage}`);
            } else {
              setError("Error: Unexpected error format.");
            }
          } else {
            setError("There was an error creating the appointment. Please try again.");
          }
        } else {
          setError("There was an error creating the appointment. Please try again.");
        }
      });
  };

  return (
    <div className="container-fluid section-channels">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 content-1">
            <h2>Make an Appointment</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="appointmentDate"
                  value={appointment.appointmentDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  type="text"
                  name="reason"
                  value={appointment.reason}
                  onChange={handleChange}
                  placeholder="Reason for Appointment"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={appointment.phoneNumber}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={appointment.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                />
              </Form.Group>
              <Button type="submit">Create Appointment</Button>

              {error && <p style={{ color: 'red' }}>{error}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
