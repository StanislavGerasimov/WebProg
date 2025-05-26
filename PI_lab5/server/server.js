const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Get all records
app.get('/api/records', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }
    res.json(JSON.parse(data));
  });
});

// Add a new record
app.post('/api/records', (req, res) => {
  const newRecord = req.body;
  newRecord.id = Date.now(); // Simple ID generation

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }

    const records = JSON.parse(data);
    records.push(newRecord);

    fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving data' });
      }
      res.status(201).json(newRecord);
    });
  });
});

// Delete a record
app.delete('/api/records/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }

    let records = JSON.parse(data);
    const initialLength = records.length;
    records = records.filter(record => record.id !== id);

    if (records.length === initialLength) {
      return res.status(404).json({ error: 'Record not found' });
    }

    fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving data' });
      }
      res.status(200).json({ message: 'Record deleted successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});