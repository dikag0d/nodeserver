// Import dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Schema & Model
const DataSchema = new mongoose.Schema({
  rfid_tag: String,  // Tag RFID
  status: String,    // Status (pintu terbuka/tutup)
  timestamp: { type: Date, default: Date.now },
});

const DataModel = mongoose.model('Data', DataSchema);

// Endpoint menerima data dari ESP
app.post('/esp-data', async (req, res) => {
  try {
    const data = new DataModel(req.body);
    await data.save();
    res.status(201).send({ message: 'Data saved successfully 🚀' });
  } catch (err) {
    console.error('❌ Error saving data:', err);
    res.status(500).send({ error: 'Failed to save data' });
  }
});

// Endpoint untuk ambil semua data
app.get('/data', async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.json(allData);
  } catch (err) {
    console.error('❌ Error fetching data:', err);
    res.status(500).send({ error: 'Failed to fetch data' });
  }
});

// Endpoint root untuk tes server
app.get('/', (req, res) => {
  res.send('🚀 Node.js + MongoDB Server is running on Render 🧠✨');
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
