import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Fetch records on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/records');
      const data = await response.json();
      // Add showJson property to each record
      const recordsWithJsonFlag = data.map(record => ({
        ...record,
        showJson: false
      }));
      setRecords(recordsWithJsonFlag);
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
        // Add showJson property to new record
        setRecords(prev => [...prev, {...newRecord, showJson: false}]);
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
        setRecords(prev => prev.filter(record => record.id !== id));
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const toggleJsonView = (id) => {
    setRecords(prev => prev.map(record => 
      record.id === id 
        ? {...record, showJson: !record.showJson} 
        : record
    ));
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
                  
                  {record.showJson && (
                    <div className="json-viewer">
                      <pre>{JSON.stringify(record, null, 2)}</pre>
                    </div>
                  )}
                </div>
                <div className="record-actions">
                  <button 
                    onClick={() => toggleJsonView(record.id)}
                    className="json-btn"
                  >
                    {record.showJson ? 'Hide JSON' : 'Show JSON'}
                  </button>
                  <button 
                    onClick={() => handleDelete(record.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;