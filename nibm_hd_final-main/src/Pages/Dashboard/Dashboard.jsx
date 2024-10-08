import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js components
import './Dashboard.css';
import Patients from './Patients';
import Doctors from './Doctors';
import Products from './Products';
import Treatments from './Treatments';

// Helper function to process patient data
const processPatientData = (patients) => {
  if (!patients || patients.length === 0) {
    return {
      totalPatientCount: 0,
      countryDistribution: [],
      commonAges: [],
      genderDistribution: [],
      popularTreatments: [],
      popularDoctors: []
    };
  }

  const currentYear = new Date().getFullYear();

  // Patient count
  const totalPatientCount = patients.length;

  // Country distribution
  const countryCount = patients.reduce((acc, patient) => {
    const country = patient.Country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  const countryDistribution = Object.entries(countryCount).sort((a, b) => b[1] - a[1]);

  // Common ages
  const ageCount = patients.reduce((acc, patient) => {
    const age = currentYear - new Date(patient.DOB).getFullYear();
    acc[age] = (acc[age] || 0) + 1;
    return acc;
  }, {});
  const commonAges = Object.entries(ageCount).sort((a, b) => b[1] - a[1]);

  // Gender distribution
  const genderCount = patients.reduce((acc, patient) => {
    const gender = patient.Gender || 'Unknown';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});
  const genderDistribution = Object.entries(genderCount);

  return {
    totalPatientCount,
    countryDistribution,
    commonAges,
    genderDistribution,
    popularTreatments: [],  // Placeholder for popular treatments
    popularDoctors: []  // Placeholder for popular doctors
  };
};

const Dashboard = () => {
  const [currentView, setCurrentView] = useState(null);
  const [patients, setPatients] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalPatientCount: 0,
    countryDistribution: [],
    commonAges: [],
    genderDistribution: [],
    popularTreatments: [],
    popularDoctors: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7255/api/Patient')  // Update with your actual endpoint
      .then(response => {
        if (response.ok) {
          return response.json(); // Directly parse JSON
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      })
      .then(data => {
        console.log('Fetched data:', data);  // Log data to check format
        setPatients(data);
        setDashboardData(processPatientData(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please check the console for details.');
      });
  }, []);

  const renderContent = () => {
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!dashboardData) {
      return <div>Loading data...</div>;
    }

    switch (currentView) {
      case 'Patients':
        return <Patients />;
      case 'Doctors':
        return <Doctors />;
      case 'Products':
        return <Products />;
      case 'Treatments':
        return <Treatments />;
      default:
        return (
          <div>
            <h2>Total Patient Count</h2>
            <p>{dashboardData.totalPatientCount || 0}</p>
            
            <h2>Country Distribution</h2>
            <Pie
              data={{
                labels: dashboardData.countryDistribution?.map(([country]) => country) || [],
                datasets: [{
                  data: dashboardData.countryDistribution?.map(([, count]) => count) || [],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                }],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
            />
            
            <h2>Common Ages</h2>
            <Bar
              data={{
                labels: dashboardData.commonAges?.map(([age]) => age) || [],
                datasets: [{
                  label: 'Number of Patients',
                  data: dashboardData.commonAges?.map(([, count]) => count) || [],
                  backgroundColor: '#36A2EB',
                }],
              }}
              options={{ responsive: true }}
            />
            
            <h2>Gender Distribution</h2>
            <Pie
              data={{
                labels: dashboardData.genderDistribution?.map(([gender]) => gender) || [],
                datasets: [{
                  data: dashboardData.genderDistribution?.map(([, count]) => count) || [],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                }],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
            />
            
            {/* Add more visualizations for popular treatments and doctors */}
          </div>
        );
    }
  };

  return (
    <div>
      <div className="container-fluid section-dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 content-1">
              <div className="sub-1">
                <a href="#" onClick={() => setCurrentView('Patients')}>Patients</a>
              </div>
              <div className="sub-2">
                <a href="#" onClick={() => setCurrentView('Doctors')}>Doctors</a>
              </div>
              <div className="sub-3">
                <a href="#" onClick={() => setCurrentView('Products')}>Products</a>
              </div>
              <div className="sub-4">
                <a href="#" onClick={() => setCurrentView('Treatments')}>Treatments</a>
              </div>
            </div>
            <div className="col-lg-10  content-2">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
