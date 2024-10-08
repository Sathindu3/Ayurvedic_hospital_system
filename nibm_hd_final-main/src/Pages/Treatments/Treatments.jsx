import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Treatments.css';

const TreatmentsPage = () => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7255/api/Treatment')  // Replace with your API endpoint
      .then(response => setTreatments(response.data))
      .catch(error => console.error("There was an error fetching the treatments!", error));
  }, []);

  const convertToImageSrc = (imageData) => {
    return `data:image/jpeg;base64,${imageData}`;
  };

  return (
    <div className="container-fluid section-treatments">
      <div className="container">
        <div className="row">
          <div className="treatments-container">
            {treatments.map(treatment => (
              <div key={treatment.id} className="treatment-card">
                {treatment.image && (
                  <img src={convertToImageSrc(treatment.image)} alt={treatment.title} />
                )}
                <h2>{treatment.title}</h2>
                <p>{treatment.description}</p>
                <p>Price: ${treatment.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentsPage;
