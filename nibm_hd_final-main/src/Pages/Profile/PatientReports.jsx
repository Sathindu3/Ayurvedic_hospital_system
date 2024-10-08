// src/components/PatientReports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientReports = ({ patientId }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`/api/Appointment/patient/${patientId}/reports`);
                setReports(response.data);
            } catch (err) {
                setError('Error fetching reports');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [patientId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Patient Reports</h2>
            {reports.length === 0 ? (
                <p>No reports available for this patient.</p>
            ) : (
                <ul>
                    {reports.map(report => (
                        <li key={report.id}>
                            <p><strong>Date:</strong> {report.date}</p>
                            <p><strong>Summary:</strong> {report.summary}</p>
                            {/* Add other report details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientReports;
