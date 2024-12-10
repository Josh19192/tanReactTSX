import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ShotRecord {
  id: number;
  child_name: string;
  vaccine_name: string;
  dose_no: number;
  shot_date: string;
}

const ShotRecords: React.FC = () => {
  const [shotRecords, setShotRecords] = useState<ShotRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search query

  useEffect(() => {
    axios.get('http://localhost:3001/shot_recs')
      .then((response) => {
        console.log('Fetched Shot Records:', response.data); // Check fetched data
        setShotRecords(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching shot records:', err);
        setError('Failed to load shot records.');
        setLoading(false);
      });
  }, []);

  // Filter shot records based on search query
  const filteredRecords = shotRecords.filter((record) => 
    record.child_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    record.vaccine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.shot_date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>SHOT RECORDS</h2>

      {/* Search bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Child Name, Vaccine Name, or Shot Date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Child Name</th>
              <th>Vaccine Name</th>
              <th>Dose Number</th>
              <th>Shot Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.child_name}</td>
                <td>{record.vaccine_name}</td>
                <td>{record.dose_no}</td>
                <td>{new Date(record.shot_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShotRecords;
