import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showJson, setShowJson] = useState(false);
  const [jsonData, setJsonData] = useState('');

  // Fetch records on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/records');
      const data = await response.json();
      setRecords(data);
      setJsonData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const newRecord = await response.json();
        setRecords(prev => [...prev, newRecord]);
        setJsonData(JSON.stringify([...records, newRecord], null, 2));
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/records/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const updatedRecords = records.filter(record => record.id !== id);
        setRecords(updatedRecords);
        setJsonData(JSON.stringify(updatedRecords, null, 2));
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const toggleJsonView = () => {
    setShowJson(!showJson);
  };

  return (
    <div className="app">
      <h1>Record Keeper</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <div className="controls">
        <button onClick={toggleJsonView} className="json-btn">
          {showJson ? 'Hide JSON' : 'Show JSON'}
        </button>
      </div>
      
      {showJson && (
        <div className="json-viewer">
          <h2>Raw JSON Data</h2>
          <pre>{jsonData}</pre>
        </div>
      )}

      <div className="records-list">
        <h2>Records</h2>
        {records.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          <ul>
            {records.map(record => (
              <li key={record.id} className="record-item">
                <div className="record-content">
                  <h3>{record.name}</h3>
                  <p>Email: {record.email}</p>
                  <p>Message: {record.message}</p>
                </div>
                <button 
                  onClick={() => handleDelete(record.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;