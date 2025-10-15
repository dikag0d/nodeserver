const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Untuk membaca JSON data

// Koneksi ke MongoDB Atlas (ganti dengan connection string yang benar)
mongoose.connect('mongodb+srv://dika:dika@cluster0.smpemur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Schema dan Model untuk Data yang akan disimpan
const DataSchema = new mongoose.Schema({
  rfid_tag: String,  // Tag RFID
  status: String,    // Status (pintu terbuka/tutup)
  timestamp: { type: Date, default: Date.now },  // Timestamp pengiriman
});

const DataModel = mongoose.model('Data', DataSchema);

// Endpoint untuk menerima data dari ESP
app.post('/esp-data', async (req, res) => {
  try {
    const data = new DataModel(req.body);  // Membuat objek data berdasarkan data yang diterima
    await data.save();  // Menyimpan data ke MongoDB
    res.status(201).send({ message: 'Data saved successfully 🚀' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to save data' });
  }
});

// Endpoint untuk mendapatkan data yang sudah disimpan (untuk melihat hasil)
app.get('/data', async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.json(allData);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
});

// Endpoint untuk memastikan server berjalan
app.get('/', (req, res) => {
  res.send('Node.js + MongoDB Server is running 🧠✨');
});

// Jalankan server pada port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
